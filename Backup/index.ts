import { Realm } from "../Realm"
import { Account as AccountBackup } from "./Account"
import { Base as BaseBackup } from "./Base"
import { Card as CardBackup } from "./Card"
import { Operation as OperationBackup } from "./Operation"
import { Organization as OrganizationBackup } from "./Organization"
import { Rule as RuleBackup } from "./Rule"
import { Transaction as TransactionBackup } from "./Transaction"
import { User as UserBackup } from "./User"

export type Backup = Backup.Partial & Backup.Identifier
export namespace Backup {
	export type Identifier = { realm: Realm; version: string; source: string }
	export type Partial =
		| TransactionBackup
		| OperationBackup
		| OrganizationBackup
		| RuleBackup
		| AccountBackup
		| CardBackup
		| UserBackup
	export import Base = BaseBackup
	export import Transaction = TransactionBackup
	export import Account = AccountBackup
	export import Organization = OrganizationBackup
	export import Rule = RuleBackup
	export import Operation = OperationBackup
	export import User = UserBackup
	export import Card = CardBackup
}
