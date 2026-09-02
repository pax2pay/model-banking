import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
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
	export const typeZod = zod.intersection(
		Creatable.typeZod,
		zod.object({
			status: zod.literal("failed"),
			reason: zod.string(),
			created: zod.string().refine(isoly.DateTime.is),
		})
	)
}
