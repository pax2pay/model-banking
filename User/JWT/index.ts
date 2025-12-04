import { authly } from "authly"
import { storage } from "cloudly-storage"
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
		private readonly store?: storage.KeyValueStore<JWT.Payload.LongTerm>
	) {}

	async verify(token: string): Promise<JWT.Payload | undefined> {
		const verified = await this.verifier?.verify(token, JWT.Payload.configuration.aud)
		delete verified?.token
		return JWT.Payload.type.is(verified) &&
			verified.iss == JWT.Payload.configuration.iss &&
			("exp" in verified || (await this.store?.get(verified.id).then(s => s?.value)))
			? verified
			: undefined
	}
	async unpack(token: string): Promise<JWT.Payload | undefined> {
		const unpacked = await JWT.unpack(token)
		delete unpacked?.token
		return unpacked
	}

	static open(key?: { private?: string; public?: string }, store?: storage.KeyValueStore<JWT.Payload.LongTerm>): JWT {
		return new this({ private: key?.private, public: key?.public ?? JWT.key }, store)
	}
}
export namespace JWT {
	export import Signer = JWTSigner
	export async function unpack(token: string): Promise<JWT.Payload | undefined> {
		const algorithm = authly.Algorithm.RS256(undefined)
		const verifier = algorithm ? authly.Verifier.create<JWT.Payload>(algorithm) : undefined
		return verifier?.unpack(token)
	}
	export import Payload = JWTPayload
	export const key =
		"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2W8CD2kpfS4QIRV2/rgm4NVvsvJsYNMHtnIl9ADvO3A81hAmRKvOAPVoXICe6+EuZ47jGjGL7f48GEoQuITfBPv/MosCDj1YhJ56ILDynCSd8FlxDrhv8pl5IquST7tcL6Hc6m+vuvoTLrFQ5QqNxv0a5eDd/YTrWv7SUuRfBEhYd/wMysGynN3QauHqy5ceBCt1nv1MJLGlSzczMRK7wjy1zi2g9NCHZBOoo1HXOpi727Xh+YXHc9EP2TN0oOXyxykv45nkGIDI0Qek3/pfkavClBffc1sEqA+rUx7YqRN9KGYxwLMLug+NOOh3ptqjfobXbR5fx/sUWhvcjUMTE1JreTrWYbGmVnjd/SeYSClfmGhdTBUfqnZbaABv0ruTXva18qRhP4y143vHMk/k8HzbuROTKAzrtEeLIjgwUgDcnE+JwDqcb8tKSGV6i++TiTldlSBCRTT4dK2hpHJje80b2abqtrbCkxbJlT98UsAAoiq2eW1X6lYmCfiGCJPkfswibQ2tPAKKNe/2xuHPsjx4FuXGmV0dbzmCwSIQoApXqOvKzoNFi6AaKIjxfNmiEigLwKpNrw08H0lVZbq/9MMxI3TzMTZjY9QmBKVLSGy3Z6IJqZpyK22lv7whJcllG0Qw8tv8+7wmC8SR3+4jpuxuFGZ+69CW+otx+CPMJjcCAwEAAQ=="
}
