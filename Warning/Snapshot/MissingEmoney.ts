import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface MissingEmoney extends Base {
	type: "missing-emoney"
	severity?: "high"
	currency: isoly.Currency
}
export namespace MissingEmoney {
	export const type = Base.type.extend<MissingEmoney>({
		type: isly.string("missing-emoney"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
}
