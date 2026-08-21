import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../zod"

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
		rule?: {
			action: "reject"
			code: string
			name: string
			type: "authorization"
			category: "fincrime"
			condition: ""
			description: string
			flags: ["category", "merchant"]
		}
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			text: isly.string().optional(),
			action: isly.string(["approve", "reject"]).optional(),
			flags: isly.string().array().optional(),
			rule: isly.any().optional(),
		})
		export const typeZod = zod.object({
			text: zod.string().optional(),
			action: zod.enum(["approve", "reject"]).optional(),
			flags: zod.array(zod.string()).optional(),
			rule: zod.any().optional(),
		})
	}
	export const type = Creatable.type.extend<Note>({
		author: isly.string(),
		created: isly.string(),
	})
	export const typeZod = Creatable.typeZod.extend({
		author: zod.string(),
		created: zod.string().refine(isoly.DateTime.is),
	})
}
