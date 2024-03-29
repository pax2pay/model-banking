import { gracely } from "gracely"
import { isly } from "isly"
import { Transaction } from "../Transaction"

export type Status = "approved" | Status.Failed

export namespace Status {
	export interface Failed {
		code: string
		reason: string | string[]
		error?: gracely.Error | Transaction.Note[]
	}
	export namespace Failed {
		export function from(error: gracely.Error | Transaction.Note[]): Failed {
			let result: Status
			if (gracely.Error.is(error)) {
				if (error.error?.includes("Card with id"))
					result = { code: "14", reason: "Invalid card number" }
				else if (error.error?.includes("must correspond to card limit")) {
					result = { code: "13", reason: "Invalid amount" }
				} else if (error.error?.includes("Failed to reach account")) {
					result = { code: "78", reason: "Invalid/nonexistent account specified (general)" }
				} else
					result = { code: "05", reason: "Do not honor" }
			} //default
			else {
				const reasons: string[] = error.reduce(
					(a: string[], c: Transaction.Note) => [...a, `${c.created} ${c.author}: ${c.text ?? ""}`],
					[]
				)
				result = {
					code: "62", //Restricted card: "This means that the card that you processed is restricted to where it can be used.
					//The restricted card is only allowed to be used for certain types of businesses or purchases."
					reason: ["Restricted card.", ...reasons],
				}
			}
			return { ...result, error }
		}
	}
	export const type = isly.union(
		isly.string("approved"),
		isly.object<Status.Failed>({
			code: isly.string(),
			reason: isly.union(isly.string(), isly.string().array()),
			error: isly.union(Transaction.Note.type.array(), isly.fromIs("gracely.Error", gracely.Error.is)).optional(),
		})
	)
	export const is = type.is
	export const flaw = type.flaw
}
