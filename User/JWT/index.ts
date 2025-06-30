import { authly } from "authly"
import { Realm } from "Realm"
import { Claims as JWTClaims } from "./Claims"
import { Signer as JWTSigner } from "./Signer"

export class JWT {
	#verifier?: authly.Verifier<JWT.Claims>
	private get verifier(): authly.Verifier<JWT.Claims> | undefined {
		if (!this.#verifier && this.key?.public) {
			const algorithm = authly.Algorithm.RS256(this.key.public)
			this.#verifier = algorithm ? authly.Verifier.create(algorithm) : undefined
		}
		return this.#verifier
	}
	#signer?: JWTSigner
	private get signer(): JWTSigner | undefined {
		return this.key?.private ? (this.#signer ??= JWTSigner.open(this.key.private)) : undefined
	}
	sign = this.signer?.sign
	private constructor(private readonly key?: { public?: string; private?: string }) {}

	async verify(token: string): Promise<JWT.Claims | undefined> {
		const verified = await this.verifier?.verify(token, JWT.Claims.configuration.aud)
		return verified &&
			verified?.iss == JWT.Claims.configuration.iss &&
			(verified.exp || (verified.id && JWT.whitelist[verified.realm]?.some(e => e.id === verified.id)))
			? verified
			: undefined
	}
	async unpack(token: string): Promise<JWT.Claims | undefined> {
		return JWT.unpack(token)
	}
	static open(key?: { public?: string; private?: string }): JWT {
		return new this(key)
	}
}
export namespace JWT {
	export import Signer = JWTSigner
	export async function unpack(token: string): Promise<JWT.Claims | undefined> {
		const algorithm = authly.Algorithm.RS256(undefined)
		const verifier = algorithm ? authly.Verifier.create<JWT.Claims>(algorithm) : undefined
		return verifier?.unpack(token)
	}
	export interface Creatable {
		sub: string
		permission: string
		realm: Realm
	}
	export import Claims = JWTClaims
	export const whitelist: Partial<Record<Realm, Claims.LongTerm[]>> = {
		test: [
			{
				aud: "https://banking.pax2pay.app",
				iat: 1751272490,
				id: "OL68eAb3YmWAG-gO",
				iss: "pax2pay",
				permission: "",
				realm: "test",
				sub: "Test",
			},
		],
	}
}
