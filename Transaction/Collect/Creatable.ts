import { cryptly } from "cryptly"
import { isly } from "isly"
import { Counterbalances } from "../../CounterBalances"

export interface Creatable {
	source: Counterbalances.Counterbalance.Entry.Settlement
	target: cryptly.Identifier
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		source: isly.string(),
		target: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is),
	})
}
