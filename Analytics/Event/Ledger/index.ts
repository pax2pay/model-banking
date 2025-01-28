import { Account as AccountEvent } from "./Account"
import { Base as EventBase } from "./Base"
import { Card as CardEvent } from "./Card"
import { Operation as OperationEvent } from "./Operation"
import { Organization as OrganizationEvent } from "./Organization"
import { Rule as RuleEvent } from "./Rule"
import { Transaction as TransactionEvent } from "./Transaction"
import { User as UserEvent } from "./User"

export namespace Ledger {
	export type Base<T> = EventBase<T>
	export import Transaction = TransactionEvent
	export import Account = AccountEvent
	export import Organization = OrganizationEvent
	export import Rule = RuleEvent
	export import Operation = OperationEvent
	export import User = UserEvent
	export import Card = CardEvent
}
