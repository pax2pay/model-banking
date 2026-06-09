import { isly } from "isly"
import { Policy } from "./Policy"

export interface Base {
	id: string
	policy: Policy
	description: string
}

export namespace Base {
	export const type = isly.object<Base>({
		id: isly.string(),
		policy: Policy.type,
		description: isly.string(),
	})
}
