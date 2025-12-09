import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface MissingFiat extends Base {
	type: "missing-fiat"
	severity?: "high"
	currency: isoly.Currency
}
export namespace MissingFiat {
	export const type = Base.type.extend<MissingFiat>({
		type: isly.string("missing-fiat"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
}
