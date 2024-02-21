import { cryptly } from "cryptly"

export interface PaxGiro {
	type: "paxgiro"
	identifier: cryptly.Identifier
}
export namespace PaxGiro {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export function is(value: PaxGiro | any): value is PaxGiro {
		return typeof value == "object" && cryptly.Identifier.is(value.identifier, 8) && value.type == "paxgiro"
	}
}
