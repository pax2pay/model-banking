import { isoly } from "isoly"
import { isly } from "isly"
import { Rule } from "../Rule"

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
		flags?: string[]
		rule?: { [K in keyof Rule]: Rule[K] } // Solves a whack typing issue in the test
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			text: isly.string().optional(),
			action: isly.string(["approve", "reject"]).optional(),
			flags: isly.string().array().optional(),
			rule: Rule.type.optional(),
		})
		export const is = type.is
	}
	export const type = Creatable.type.extend<Note>({
		author: isly.string(),
		created: isly.string(),
	})
	export const is = type.is
}
