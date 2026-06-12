import { isly } from "isly"
import { Card } from "../Card"
import { Action } from "./Action"
import { Group } from "./Group"

export interface Creatable {
	action: Action
	name: string
	description?: string
	stacks?: Card.Stack[]
	organizations?: string[]
	group: Group
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		action: Action.type,
		name: isly.string(),
		description: isly.string().optional(),
		organizations: isly.string().array().optional(),
		stacks: Card.Stack.type.array().optional(),
		group: Group.type,
	})
	export function sanitize(creatable: Creatable & Record<string, any>): Creatable {
		return {
			action: creatable.action,
			name: creatable.name,
			description: creatable.description,
			organizations: creatable.organizations,
			stacks: creatable.stacks,
			group: creatable.group,
		}
	}
}
