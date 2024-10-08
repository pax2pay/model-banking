import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../../Settlement/Identifier"
import { Totals } from "../../Settlement/Totals"
import { Base } from "../Base"

export interface MissingFile extends Base {
	type: "missing-file"
	resource: Identifier
	cycle?: string
	totals?: Totals
}

export namespace MissingFile {
	export const type = Base.type.extend<MissingFile>({
		type: isly.string("missing-file"),
		resource: Identifier.type,
		cycle: isly.string().optional(),
		totals: Totals.type.optional(),
	})
	export function create(id: string, cycle: string, date: isoly.Date): MissingFile {
		return {
			type: "missing-file",
			resource: id,
			cycle,
			date,
		}
	}
}
