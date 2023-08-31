import { authly } from "authly"
import { isly } from "isly"
import { pax2pay } from ".."
// import { pax2pay } from ".."

export namespace Verifier {
	export async function Verify(event: string | undefined, publicKey: string): Promise<authly.Payload | undefined> {
		const verifier = authly.Verifier.create(authly.Algorithm.RS256(publicKey))
		const result = verifier ? await verifier.verify(event) : undefined

		return result
	}
}

// function: this will take in a jwt
// returns the json otherwise undefined

// create key pair, verifier takes (or uses?) publicKey

// verify it with the private one?
// cryptly key pair - authly lies (?)
