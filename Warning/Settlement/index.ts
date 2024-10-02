import { isly } from "isly"
import { MissingFile as MissingFileWarning } from "./MissingFile"
import { NegativeAmount as NegativeAmountWarning } from "./NegativeAmount"
import { UnknownEntry as UnknownEntryWarning } from "./UnknownEntry"

export type Settlement = NegativeAmountWarning | MissingFileWarning | UnknownEntryWarning

export namespace Settlement {
	export import NegativeAmount = NegativeAmountWarning
	export import MissingFile = MissingFileWarning
	export import UnknownEntry = UnknownEntryWarning
	export const type = isly.union<Settlement, NegativeAmount, MissingFile, UnknownEntry>(
		NegativeAmount.type,
		MissingFile.type,
		UnknownEntry.type
	)
}
