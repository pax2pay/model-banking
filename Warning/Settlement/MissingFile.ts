import { isoly } from "isoly"
import { isly } from "isly"
import { Stack } from "../../Card/Stack"
import { Batch } from "../../Settlement/Batch"
import { Identifier } from "../../Settlement/Identifier"
import { Totals } from "../../Settlement/Totals"
import { Base } from "../Base"

export interface MissingFile extends Base {
	type: "missing-file"
	resource: Identifier
	totals?: Totals
}

export namespace MissingFile {
	export const type = Base.type.extend<MissingFile>({
		type: isly.string("missing-file"),
		resource: Identifier.type,
		totals: Totals.type.optional(),
	})
	export function create(date: isoly.Date, order: number, stack: Stack): MissingFile {
		return {
			type: "missing-file",
			resource: Identifier.create(date, stack, order),
			date: isoly.Date.now(),
		}
	}
}
