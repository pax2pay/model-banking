import { authly } from "authly"
import { Payload } from "./Payload"

export class Signer {
	constructor(private readonly key?: { public?: string; private?: string }) {}

	/** Duration in seconds */
	async sign(data: Payload.Creatable, duration: number | "infinite" = 60 * 60 * 12): Promise<string | undefined> {
		let result: string | undefined
		if (duration === "infinite") {
			const signer = Signer.create({ key: this.key })
			result = await signer?.sign({ id: authly.Identifier.generate(16), ...data })
		} else {
			const signer = Signer.create({ key: this.key, duration })
			result = await signer?.sign({ ...data })
		}
		return result
	}

	static open(key?: { public?: string; private?: string }): Signer {
		return new this(key)
	}
}
export namespace Signer {
	export function create<T extends authly.Payload>(options: {
		key?: { public?: string; private?: string }
		duration?: number
	}): authly.Issuer<T> | undefined {
		const signer = authly.Issuer.create(
			Payload.configuration.iss,
			authly.Algorithm.RS256(options.key?.public, options.key?.private)
		)
		if (signer) {
			signer.duration = options.duration
			signer.audience = Payload.configuration.aud
		}
		return signer
	}
}
