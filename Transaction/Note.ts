import * as isoly from "isoly"
export interface Note extends Note.Creatable {
	author: string
	created: isoly.DateTime
}

export namespace Note {
	export function fromCreatable(note: Creatable, author: string): Note {
		return { ...note, created: isoly.DateTime.now(), author: author }
	}
	export namespace Creatable {
		export function is(value: Creatable | any): value is Note {
			return true
		}
	}
	export interface Creatable {
		text?: string
		action?: "approve" | "reject"
	}
}
