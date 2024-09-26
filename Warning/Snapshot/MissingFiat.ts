import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface MissingFiat extends Base {
	type: "missing fiat"
	date: isoly.Date
	currency: isoly.Currency
}
export namespace StaleFiat {
	export const type = Base.type.extend<MissingFiat>({
		type: isly.string("missing fiat"),
		date: isly.string(),
		currency: isly.string()
	})
}
