import { isoly } from "isoly"
import { isly } from "isly"

export interface Note extends Note.Creatable {
	author: string
	created: isoly.DateTime
}

export namespace Note {
	export function fromCreatable(note: Creatable, author: string): Note {
		return { ...note, created: isoly.DateTime.now(), author: author }
	}
	export interface Creatable {
		text?: string
		action?: "approve" | "reject"
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			text: isly.string().optional(),
			action: isly.string(["approve", "reject"]).optional(),
		})
		export const is = type.is
	}
	export const type = isly.object<Note>({
		author: isly.string(),
		created: isly.string(),
		text: isly.string().optional(),
		action: isly.string(["approve", "reject"]).optional(),
	})
	export const is = type.is
}
