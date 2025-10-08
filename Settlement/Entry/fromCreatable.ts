import { gracely } from "gracely"
import { isoly } from "isoly"
import { Transaction } from "../../Transaction"
import type { Entry } from "."
import { Creatable } from "./Creatable"

export function fromCreatable(
	creatable: Creatable,
	transaction: Transaction.CardTransaction | gracely.Error | string
): Entry {
	let result: Entry
	const reasons: string[] = []
	const created = isoly.DateTime.now()
	if (creatable.type == "unknown")
		reasons.push("Unknown entry type.")
	if (gracely.Error.is(transaction))
		reasons.push(`gracely error: ${JSON.stringify(transaction)}`)
	else if (typeof transaction == "string")
		reasons.push(transaction || "No reason provided.")
	else if (transaction.status != "finalized" && transaction.status != "processing")
		reasons.push(`Transaction ${transaction.id} on account ${transaction.accountId} unable to be finalized.`)
	if (reasons.length > 0)
		result = { status: "failed", reason: reasons.join("\n"), ...creatable, created }
	else {
		const cardTransaction = transaction as Transaction.CardTransaction
		result = {
			status: "succeeded",
			...(creatable as Creatable.Known),
			created,
			card: cardTransaction.account,
			transaction: { id: cardTransaction.id, posted: cardTransaction.posted, description: cardTransaction.description },
		}
	}
	return result
}
