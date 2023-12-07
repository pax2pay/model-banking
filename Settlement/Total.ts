import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "../Amounts"
import { Counterbalances } from "../CounterBalances"
import { Fee } from "./Fee"

export type Total = {
	amount: Amounts
	fee: Fee
}

export namespace Total {
	export function initiate(partial?: Partial<Total>): Total {
		return { amount: partial?.amount ?? {}, fee: partial?.fee ?? { other: {} } }
	}
	export function add(addendee: Total, addend: Total): Total {
		return { amount: Amounts.add(addendee.amount, addend.amount), fee: Fee.add(addendee.fee, addend.fee) }
	}
	export function fromCounterbalances(counterbalances: Counterbalances): Total {
		const amounts: Amounts = {}
		const fee: Fee = { other: {} }
		for (const [currency, counterbalance] of Object.entries(counterbalances) as [
			isoly.Currency,
			Counterbalances.Counterbalance
		][]) {
			for (const [entry, value] of Object.entries(counterbalance)) {
				entry.startsWith("settle") &&
					(amounts[currency] = isoly.Currency.add(currency, amounts[currency] ?? 0, value ?? 0))
				entry.startsWith("fee") &&
					(fee.other[currency] = isoly.Currency.add(currency, fee.other[currency] ?? 0, value ?? 0))
			}
		}
		return { amount: amounts, fee }
	}
	export function fromCounterbalances2(counterbalances: Counterbalances): Total {
		return (Object.entries(counterbalances) as [isoly.Currency, Counterbalances.Counterbalance][]).reduce<Total>(
			(result, [currency, counterbalance]) =>
				Total.add(
					result,
					Object.entries(counterbalance).reduce<Total>(
						(r, [entry, value]) =>
							Total.add(r, {
								amount: { [currency]: entry.startsWith("settle") && (value ?? 0) },
								fee: { other: { [currency]: entry.startsWith("fee") && (value ?? 0) } },
							}),
						Total.initiate()
					)
				),
			Total.initiate()
		)
	}
	export const type = isly.object<Total>({ amount: Amounts.type, fee: Fee.type })
	export const is = type.is
	export const flaw = type.flaw
}
