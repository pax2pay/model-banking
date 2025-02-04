import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
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
}
