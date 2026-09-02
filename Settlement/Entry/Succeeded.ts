import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { zod } from "../../zod"
import { Creatable } from "./Creatable"

export interface Succeeded extends Omit<Creatable.Known, "transaction" | "card"> {
	status: "succeeded"
	card: Rail.Address.Card
	transaction: { id: string; posted: isoly.DateTime; description: string }
	created: isoly.DateTime
}
export namespace Succeeded {
	export const type = Creatable.Base.type
		.omit<"transaction" | "card">(["card", "transaction"])
		.extend<Succeeded & { type: "capture" | "refund" }>({
			type: isly.string(["capture", "refund"]),
			status: isly.string<"succeeded">("succeeded"),
			card: Rail.Address.Card.type,
			transaction: isly.object({
				id: isly.string(),
				posted: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
				description: isly.string(),
			}),
			created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		})
	export const typeZod = Creatable.Base.typeZod.omit({ card: true, transaction: true }).extend({
		type: zod.enum(["capture", "refund"]),
		status: zod.literal("succeeded"),
		card: Rail.Address.Card.typeZod,
		transaction: zod.object({
			id: zod.string(),
			posted: zod.string().refine(isoly.DateTime.is),
			description: zod.string(),
		}),
		created: zod.string().refine(isoly.DateTime.is),
	})
}
