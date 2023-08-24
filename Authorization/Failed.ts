import { gracely } from "gracely"
import { isly } from "isly"
import { Transaction } from "../Transaction"
import { Base } from "./Base"
import { Creatable } from "./Creatable"

export interface Failed extends Base {
	status: { code: string; reason: string | string[] }
	error?: gracely.Error
}

export namespace Failed {
	export const type = Base.type.extend<Failed>({
		status: isly.object({ code: isly.string(), reason: isly.union(isly.string(), isly.string().array()) }),
		error: isly.fromIs("error", gracely.Error.is).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(authorization: Creatable, error: gracely.Error): Failed {
		return { ...Base.fromCreatable(authorization), ...statusFrom(error), error }
	}
	export function statusFrom(transaction: gracely.Error): Pick<Failed, "status"> {
		let result: Pick<Failed, "status">
		if (transaction.error?.includes("Card with id"))
			result = { status: { code: "14", reason: "Invalid card number" } }
		else if (transaction.error?.includes("must correspond to card limit")) {
			result = { status: { code: "13", reason: "Invalid amount" } }
		} else if (transaction.error?.includes("Failed to reach account")) {
			result = { status: { code: "78", reason: "Invalid/nonexistent account specified (general)" } }
		} else if (gracely.client.InvalidContent.is(transaction) && transaction.content.description.includes("rules")) {
			const reasons: string[] = transaction.content.details?.notes.reduce(
				(a: string[], c: Transaction.Note) => [...a, `${c.created} ${c.author}: ${c.text ?? ""}`],
				[]
			)
			result = {
				status: {
					code: "62", //Restricted card: "This means that the card that you processed is restricted to where it can be used.
					//The restricted card is only allowed to be used for certain types of businesses or purchases."
					reason: ["Restricted card.", ...reasons],
				},
			}
		} else
			result = { status: { code: "05", reason: "Do not honor" } } //default
		return result
	}
}
