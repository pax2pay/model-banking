import { authly } from "authly"
import { Transaction } from "../Transaction"

export namespace Verifier {
	export async function Verify(event: string | undefined, publicKey: string): Promise<authly.Payload | undefined> {
		const verifier = authly.Verifier.create(authly.Algorithm.RS256(publicKey))
		const result = verifier ? await verifier.verify(event) : undefined
		return result ? Transaction.get(result) : result
		//TODO: Expand to work with other types for other hook-events
	}
}
