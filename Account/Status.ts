import { isly } from "isly"

export type Status = {
	mode: Status.Mode
	reason?: Status.Reason
}

export namespace Status {
	export type Mode = typeof Mode.values[number]
	export namespace Mode {
		export const values = ["active", "frozen", "closed"] as const
		export const type = isly.string<Mode>(values)
	}
	export type Reason = typeof Reason.values[number] | (string & Record<never, never>)
	export namespace Reason {
		export const values = ["overdraft", "other"]
		export const type = isly.string()
	}
	export const type = isly.object<Status>({
		mode: Mode.type,
		reason: Reason.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
