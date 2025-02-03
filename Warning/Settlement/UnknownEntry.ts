import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Entry } from "../../Settlement/Entry"
import { Identifier } from "../../Settlement/Identifier"
import { Transaction } from "../../Transaction"
import { Base } from "../Base"

export interface UnknownEntry extends Base {
	type: "unknown-entry"
	resource: Identifier
	authorization?: Authorization["id"]
	transaction?: Transaction["id"]
}

export namespace UnknownEntry {
	export const type = Base.type.extend<UnknownEntry>({
		type: isly.string("unknown-entry"),
		resource: Identifier.type,
		authorization: isly.fromIs("Authorization.id", cryptly.Identifier.is).optional(),
		transaction: isly.string().optional(),
	})
	export function create(entry: Extract<Entry.Failed, { type: "unknown" }>, resource: Identifier): UnknownEntry {
		return {
			type: "unknown-entry",
			resource,
			transaction: entry.transaction,
			date: isoly.Date.now(),
		}
	}
}
