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
	transaction?: string
}

export namespace UnknownEntry {
	export const type = Base.type.extend<UnknownEntry>({
		type: isly.string("unknown-entry"),
		resource: Identifier.type,
		authorization: isly.fromIs("Authorization.id", cryptly.Identifier.is).optional(),
		transaction: isly.string().optional(),
	})
	export function create(entry: Unknown, resource: Identifier): UnknownEntry {
		return {
			type: "unknown-entry",
			resource,
			transaction:
				typeof entry.transaction == "string"
					? entry.transaction
					: entry.transaction
					? entry.transaction.id
					: entry.authorization?.id,
			date: isoly.Date.now(),
		}
	}
}
