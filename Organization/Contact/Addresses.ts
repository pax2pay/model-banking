import { isly } from "isly"
import { zod } from "../../zod"
import { Address } from "./Address"

export interface Addresses {
	primary: Address
	billing?: Address
	delivery?: Address
	visit?: Address
}
export namespace Addresses {
	export const type = isly.object<Addresses>({
		primary: Address.type,
		billing: Address.type.optional(),
		delivery: Address.type.optional(),
		visit: Address.type.optional(),
	})
	export const typeZod = zod.object({
		primary: Address.typeZod,
		billing: Address.typeZod.optional(),
		delivery: Address.typeZod.optional(),
		visit: Address.typeZod.optional(),
	})
}
