import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Change } from "./Change"

export interface Creatable {
	account: cryptly.Identifier
	currency: isoly.Currency
	change: Change
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		account: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		change: Change.type,
	})
	export const is = type.is
}
