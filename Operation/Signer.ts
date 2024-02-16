import { cryptly } from "cryptly"
import type { Operation } from "./index"

export class Signer {
	private readonly signer = cryptly.Signer.create("RSA", "SHA-256", this.keys.public, this.keys.private)

	private constructor(private readonly keys: { public?: string; private?: string }) {}
	async sign(operation: Operation & { previous: string }): Promise<string> {
		return this.signer.sign(JSON.stringify(operation))
	}
	async verify(operation: Operation): Promise<boolean> {
		return this.signer.verify(JSON.stringify({ ...operation, signature: undefined }), operation.signature ?? "")
	}

	static open(keys: { public?: string; private?: string }): Signer {
		return new Signer(keys)
	}
}
