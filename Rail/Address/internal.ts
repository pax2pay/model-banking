import { cryptly } from "cryptly"
import { isly } from "isly"
import { Operation } from "../../Operation"
import { Realm } from "../../Realm"
import { zod } from "../../zod"

export interface Internal {
	type: "internal"
	name?: string
	identifier: cryptly.Identifier
	organization?: string
}
export namespace Internal {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export const type = isly.object<Internal>({
		type: isly.string("internal"),
		name: isly.string().optional(),
		identifier: isly.union(isly.fromIs("Identifier", cryptly.Identifier.is), Operation.Changes.Entry.type),
		organization: isly.string().optional(),
	})
	export const typeZod = zod.object({
		type: zod.literal("internal"),
		name: zod.string().optional(),
		identifier: zod.string(),
		organization: zod.string().optional(),
	})

	export function toLink(internal: Internal, realm: Realm): string {
		return `${realm}-internal-${internal.identifier}`
	}
}
