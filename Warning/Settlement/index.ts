import { isly } from "isly"
import { zod } from "../../zod"
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
	export const typeZod: zod.ZodType<Settlement> = zod.union([
		NegativeAmount.typeZod,
		MissingFile.typeZod,
		UnknownEntry.typeZod,
	])
}
