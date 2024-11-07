import { gracely } from "gracely"
import { isly } from "isly"
import { Transaction } from "../Transaction"

export type Status = "approved" | Status.Failed

export namespace Status {
	export const failures = [...Transaction.Status.reasons, "card not found", "account not found", "other"] as const
	export type Failed = typeof failures[number]
	export namespace Failed {
		export function from(error: gracely.Error | Transaction.Status.Reason): Failed {
			let result: Status
			if (gracely.Error.is(error))
				if (error.error?.includes("Card with id"))
					result = "card not found"
				else if (error.error?.includes("Failed to reach account"))
					result = "account not found"
				else
					result = "other"
			else
				result = error
			return result
		}
	}
	export const type = isly.union(isly.string("approved"), isly.string<Failed>(failures))
}
