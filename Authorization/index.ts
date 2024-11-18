import { cryptly } from "cryptly"
import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Amount } from "../Amount"
import { Identifier } from "../Identifier"
import { Merchant } from "../Merchant"
import { Transaction } from "../Transaction"
import { Creatable as AuthorizationCreatable } from "./Creatable"
import { Exchange as AuthorizationExchange } from "./Exchange"
import { Status as AuthorizationStatus } from "./Status"

export interface Authorization {
	id: cryptly.Identifier
	created: isoly.DateTime
	status: Authorization.Status
	reference: string
	approvalCode?: string
	amount: Amount
	exchange?: AuthorizationExchange
	card: {
		id: string
		token?: string
		iin?: string
		last4?: string
	}
	transaction?: {
		id: string
		posted: isoly.DateTime
		description: string
	}
	account?: string
	merchant: Merchant
	acquirer: Acquirer
	description: string
}
export namespace Authorization {
	export import Creatable = AuthorizationCreatable
	export import Exchange = AuthorizationExchange
	export import Status = AuthorizationStatus
	export const type = isly.object<Authorization>({
		id: isly.fromIs("Authorization.id", cryptly.Identifier.is),
		status: Status.type,
		transaction: isly
			.object<Required<Authorization>["transaction"]>({
				id: isly.string(),
				posted: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
				description: isly.string(),
			})
			.optional(),
		exchange: AuthorizationExchange.type.optional(),
		card: isly.object<Authorization["card"]>({
			id: isly.string(),
			token: isly.string().optional(),
			iin: isly.string().optional(),
			last4: isly.string().optional(),
		}),
		created: isly.fromIs("Authorization.created", isoly.DateTime.is),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		account: isly.string().optional(),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		approvalCode: isly.string().optional(),
		description: isly.string(),
	})
	export function fromCreatable(
		creatable: Creatable,
		transaction: Transaction.CardTransaction | gracely.Error
	): Authorization {
		const partial: Pick<
			Authorization,
			"created" | "amount" | "merchant" | "acquirer" | "reference" | "description" | "exchange"
		> = {
			created: isoly.DateTime.now(),
			amount: creatable.amount,
			merchant: creatable.merchant,
			acquirer: creatable.acquirer,
			reference: creatable.reference,
			description: creatable.description,
			exchange: creatable.exchange,
		}
		let result: Authorization
		if (gracely.Error.is(transaction))
			result = {
				id: Identifier.generate(),
				status: Status.Failed.from(transaction),
				...partial,
				card: { id: creatable.card },
			}
		else if (!Transaction.Status.Success.is(transaction.status))
			result = {
				id: transaction.id,
				status: Status.Failed.from(transaction.status[1]),
				...partial,
				card: { iin: transaction.account.iin, last4: transaction.account.last4, id: creatable.card },
			}
		else
			result = {
				id: transaction.id,
				status: "approved",
				...partial,
				card: { iin: transaction.account.iin, last4: transaction.account.last4, id: creatable.card },
				account: transaction.accountId,
				transaction: { id: transaction.id, posted: transaction.posted, description: transaction.description },
			}
		return result
	}
}
