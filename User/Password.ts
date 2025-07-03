import { cryptly } from "cryptly"
import { isoly } from "isoly"

export interface Password {
	hash: cryptly.Password.Hash
	changed: isoly.DateTime
}
export namespace Password {
	export async function create(password: string, pepper: string): Promise<Password> {
		return { hash: await hash(password, pepper), changed: isoly.DateTime.now() }
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
