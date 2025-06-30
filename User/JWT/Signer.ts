import { authly } from "authly"
import { Claims } from "./Claims"

export class Signer {
	constructor(private readonly key?: string) {}

	/** Duration in seconds */
	async sign(data: Claims.Creatable, duration: number | "never" = 60 * 60 * 12): Promise<string | undefined> {
		let result: string | undefined
		if (duration === "never") {
			const signer = Signer.create({ key: this.key })
			result = await signer?.sign({ id: authly.Identifier.generate(16), ...data })
		} else {
			const signer = Signer.create({ key: this.key, duration })
			result = await signer?.sign({ ...data })
		}
		return result
	}

	static open(key?: string): Signer {
		return new this(key)
	}
}
export namespace Signer {
	export function create<T extends authly.Payload>(options: {
		key?: string
		duration?: number
	}): authly.Issuer<T> | undefined {
		const signer = authly.Issuer.create(Claims.configuration.iss, authly.Algorithm.RS256(undefined, options.key))
		if (signer) {
			signer.duration = options.duration
			signer.audience = Claims.configuration.aud
		}
		return signer
	}
}
