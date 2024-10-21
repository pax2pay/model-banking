import { isly } from "isly"

export type Status = {
	mode: "active" | "frozen" | "closed"
	reason?: "overdraft" | "other" | string
}

export namespace Status {
	export type Mode = typeof Mode.values[number]
	export namespace Mode {
		export const values = ["active", "frozen", "closed"] as const
	}
	export namespace Reason {
		export const values = ["overdraft", "other"]
	}
	export const type = isly.object<Status>({
		mode: isly.string<Mode>(Mode.values),
		reason: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
