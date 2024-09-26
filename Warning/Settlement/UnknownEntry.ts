import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Unknown } from "../../Settlement/Entry/Unknown"
import { Identifier } from "../../Settlement/Identifier"
import { Base } from "../Base"

export interface UnknownEntry extends Base {
	type: "unknown-entry"
	resource: Identifier
	authorization?: Authorization["id"]
}

export namespace UnknownEntry {
	export const type = Base.type.extend<UnknownEntry>({
		type: isly.string("unknown-entry"),
		resource: Identifier.type,
		authorization: isly.fromIs("Authorization.id", cryptly.Identifier.is).optional(),
	})
	export function create(entry: Unknown, resource: Identifier): UnknownEntry {
		return {
			type: "unknown-entry",
			resource,
			authorization: entry.authorization?.id,
			date: isoly.Date.now(),
		}
	}
}
