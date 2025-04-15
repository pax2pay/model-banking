import { isly } from "isly"
import { Rail } from "../../Rail"
import { Base } from "./Base"

export interface Authorization extends Base {
	type: "authorization"
	account: Pick<Rail.Address.Card, "id" | "type">
	counterpart: Rail.Address.Card.Counterpart
	reference: { reference: string }
	approvalCode?: string
}
export namespace Authorization {
	export const type = Base.type.extend<Authorization>({
		type: isly.string("authorization"),
		account: Rail.Address.Card.type.pick(["id", "type"]),
		counterpart: Rail.Address.Card.Counterpart.type,
		reference: isly.object<{ reference: string }>({ reference: isly.string() }),
		approvalCode: isly.string().optional(),
	})
}
