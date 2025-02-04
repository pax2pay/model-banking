import { isoly } from "isoly"
import { isly } from "isly"
import { Creatable } from "./Creatable"

export type Failed = Creatable & {
	status: "failed"
	reason: string
	created: isoly.DateTime
}
export namespace Failed {
	export const type = isly.intersection<
		Failed,
		Creatable,
		{
			status: "failed"
			reason: string
			created: isoly.DateTime
		}
	>(
		Creatable.type,
		isly.object({
			status: isly.string<"failed">("failed"),
			reason: isly.string(),
			created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		})
	)
}
