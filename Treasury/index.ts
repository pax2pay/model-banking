import { isoly } from "isoly"
import { Account as TreasuryAccount } from "./Account"
import { Balance as TreasuryBalance } from "./Balance"
import { Snapshot as TreasurySnapshot } from "./Snapshot"
import { Transaction as TreasuryTransaction } from "./Transaction"

export namespace Treasury {
	export function key(hour?: isoly.DateTime): isoly.DateTime {
		const now = isoly.DateTime.now()
		const latest = isoly.DateTime.getMinute(now) > 15 ? now : isoly.DateTime.previousHour(now)
		return isoly.DateTime.truncate(
			isoly.DateTime.invert(hour && isoly.DateTime.epoch(latest) > isoly.DateTime.epoch(hour) ? hour : latest),
			"hours"
		)
	}
	export import Transaction = TreasuryTransaction
	export import Snapshot = TreasurySnapshot
	export import Account = TreasuryAccount
	export type Balance = TreasuryBalance
	export const Balance = TreasuryBalance
}
