import { isly } from "isly"

export interface Total {
	collected?: {
		fee: {
			amount: {
				other: number
			}
			transaction: string
		}
		net: {
			amount: number
			transaction: string
		}
	}
	outcome?: {
		fee: {
			other: number
		}
		net: number
	}
	expected: {
		fee: {
			other: number
		}
		net: number
	}
	settled?: {
		amount: number
		transactions: string[]
	}
}
export namespace Total {
	export const type = isly.object<Total>({
		collected: isly
			.object<Required<Total>["collected"]>({
				fee: isly.object<Required<Total>["collected"]["fee"]>({
					amount: isly.object<Required<Total>["collected"]["fee"]["amount"]>({ other: isly.number() }),
					transaction: isly.string(),
				}),
				net: isly.object<Required<Total>["collected"]["net"]>({ amount: isly.number(), transaction: isly.string() }),
			})
			.optional(),
		outcome: isly
			.object<Required<Total>["outcome"]>({
				fee: isly.object<Required<Total>["outcome"]["fee"]>({ other: isly.number() }),
				net: isly.number(),
			})
			.optional(),
		expected: isly.object<Total["expected"]>({
			fee: isly.object<Total["expected"]["fee"]>({ other: isly.number() }),
			net: isly.number(),
		}),
		settled: isly
			.object<Required<Total>["settled"]>({ amount: isly.number(), transactions: isly.string().array() })
			.optional(),
	})
	// export function initiate(partial?: Partial<Total>): Total {
	// 	return { amount: partial?.amount ?? {}, fee: partial?.fee ?? { other: {} } }
	// }
	// export function add(addendee: Total, addend: Total): Total {
	// 	return { amount: Amounts.add(addendee.amount, addend.amount), fee: Fee.add(addendee.fee, addend.fee) }
	// }
	// export function compare(expected: Total, outcome: Total): boolean {
	// 	return Amounts.compare(expected.amount, outcome.amount) && Amounts.compare(expected.fee.other, outcome.fee.other)
	// }
	// export function from(collect: Transaction.Collect, collected: Total = initiate()): Total {
	// 	let result: Total = collected
	// 	for (const [currency, counterbalance] of Object.entries(collect.counterbalances)) {
	// 		for (const [entry, amount] of Object.entries(counterbalance))
	// 			if (entry.startsWith("fee"))
	// 				result = add(result, initiate({ fee: { other: { [currency]: amount } } }))
	// 			else if (entry.startsWith("settle"))
	// 				result = add(result, initiate({ amount: { [currency]: amount } }))
	// 	}
	// 	return result
	// }
}
