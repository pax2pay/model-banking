import type { Changes } from "./index"

export function capture(
	settlement: string | undefined, // FIXME: remove | undefined when we're sure we send the id
	amounts: { net: number; fee: number; charge?: number }
): Changes {
	return {
		[`${settlement}-net`]: { type: "add" as const, amount: amounts.net, status: "pending" as const },
		[`${settlement}-fee`]: { type: "add" as const, amount: amounts.fee, status: "pending" as const },
		...(amounts.charge && {
			[`${settlement}-charge`]: { type: "add" as const, amount: amounts.charge, status: "pending" as const },
		}),
	}
}
