import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface DeltaFiat extends Base {
	type: "delta-fiat"
	severity?: "high"
	currency: isoly.Currency
}
export namespace DeltaFiat {
	export const type = Base.type.extend<DeltaFiat>({
		type: isly.string("delta-fiat"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
}
