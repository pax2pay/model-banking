import { isly } from "isly"
import { Status } from "./Status"

export interface Change<T extends Change.Operand = Change.Operand> {
	type: T
	amount: number
	status: Status
	result?: number
	category?: Change.Category
}

export namespace Change {
	export const operand = ["add", "subtract"] as const
	export type Operand = (typeof operand)[number]
	export const type = isly.object<Change>({
		type: isly.string(["add", "subtract"]),
		amount: isly.number(),
		status: Status.type,
		result: isly.number().optional(),
		category: Category.type.optional(),
	})
	export namespace Add {
		export const type = Change.type.extend<Change<"add">>({
			type: isly.string("add"),
		})
	}
	export namespace Subtract {
		export const type = Change.type.extend<Change<"subtract">>({
			type: isly.string("subtract"),
		})
	}
	export type Category = (typeof category)[number]
	export const category = [
		"relevantFundsReceived", // Deposits
		"amountsCreditedToClients", // Money send to customer from us
		"paymentsExecutedForClients", // Money send to merchants
		"emoneyRedeemed", // Money withdrawn by customers
		"moneyDueAndPayableToTheFirm", // Money to p2p (fees)
	]
	export namespace Category {
		export const type = isly.string<Category>(category)
	}
}
