import { cryptly } from "cryptly"
import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"

export interface Password {
	hash: cryptly.Password.Hash
	changed: isoly.DateTime
}
export namespace Password {
	export interface Creatable {
		current?: string
		new: string
		repeat: string
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			current: isly.string().optional(),
			new: isly.string(),
			repeat: isly.string(),
		})
	}
	export async function create(creatable: Creatable, pepper: string | undefined): Promise<Password | gracely.Error> {
		let result: Awaited<ReturnType<typeof create>>
		if (creatable.new !== creatable.repeat)
			result = gracely.client.forbidden("The new password and the repeated password do not match.")
		else if (creatable.new.length < 8)
			result = gracely.client.forbidden("The new password must be at least 8 characters long.")
		else if (!pepper)
			result = gracely.server.backendFailure("The password cannot be created without a pepper.")
		else
			result = { hash: await hash(creatable.new, pepper), changed: isoly.DateTime.now() }
		return result
	}
	export function salt(): string {
		return cryptly.Base64.encode(cryptly.RandomValue.generate(new Uint8Array(64)).toString())
	}
	export async function hash(password: string, pepper: string): Promise<cryptly.Password.Hash> {
		return cryptly.Password.hash(signer(pepper), password, salt())
	}
	export async function verify(password: string, hash: cryptly.Password.Hash, pepper: string): Promise<boolean> {
		return cryptly.Password.verify(signer(pepper), hash, password)
	}
	function signer(pepper: string): { sign: (data: string) => Promise<string> } {
		return cryptly.Signer.create("HMAC", "SHA-512", pepper)
	}
}
