import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Creatable } from "./Creatable"

export interface Succeeded extends Omit<Creatable.Known, "transaction" | "card"> {
	status: "succeeded"
	card: Rail.Address.Card
	transaction: string
	created: isoly.DateTime
}
export namespace Succeeded {
	export const type = Creatable.Known.type.omit<"transaction" | "card">(["card", "transaction"]).extend<Succeeded>({
		status: isly.string<"succeeded">("succeeded"),
		card: Rail.Address.Card.type,
		transaction: isly.string(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
}
