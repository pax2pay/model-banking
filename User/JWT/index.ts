import { authly } from "authly"
import { Realm } from "../../Realm"
import { Payload as JWTPayload } from "./Payload"
import { Signer as JWTSigner } from "./Signer"

export class JWT {
	#verifier?: authly.Verifier<JWT.Payload>
	private get verifier(): authly.Verifier<JWT.Payload> | undefined {
		if (!this.#verifier && this.key?.public) {
			const algorithm = authly.Algorithm.RS256(this.key.public)
			this.#verifier = algorithm ? authly.Verifier.create(algorithm) : undefined
		}
		return this.#verifier
	}
	#signer?: JWTSigner
	private get signer(): JWTSigner | undefined {
		return this.key?.private ? (this.#signer ??= JWTSigner.open(this.key)) : undefined
	}
	get sign() {
		return this.signer?.sign
	}
	private constructor(
		private readonly key?: { public?: string; private?: string },
		readonly whitelist?: JWT.Whitelist
	) {}

	async verify(token: string): Promise<JWT.Payload | undefined> {
		const verified = await this.verifier?.verify(token, JWT.Payload.configuration.aud)
		delete verified?.token
		return JWT.Payload.type.is(verified) &&
			verified?.iss == JWT.Payload.configuration.iss &&
			(verified.exp || (verified.id && this.whitelist?.[verified.realm]?.some(e => e.id === verified.id)))
			? verified
			: undefined
	}
	async unpack(token: string): Promise<JWT.Payload | undefined> {
		const unpacked = await JWT.unpack(token)
		delete unpacked?.token
		return unpacked
	}

	static open(key?: { public?: string; private?: string }, whitelist?: JWT.Whitelist): JWT {
		return new this(key, whitelist)
	}
}
export namespace JWT {
	export import Signer = JWTSigner
	export type Whitelist = Partial<Record<Realm, Payload.LongTerm[]>>
	export async function unpack(token: string): Promise<JWT.Payload | undefined> {
		const algorithm = authly.Algorithm.RS256(undefined)
		const verifier = algorithm ? authly.Verifier.create<JWT.Payload>(algorithm) : undefined
		return verifier?.unpack(token)
	}
	export interface Creatable {
		sub: string
		permission: string
		realm: Realm
	}
	export import Payload = JWTPayload
}
