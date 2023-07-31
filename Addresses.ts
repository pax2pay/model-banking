import { isly } from "isly"
import { Address } from "./Address"

export interface Addresses {
	primary?: Address
	billing?: Address
	delivery?: Address
	visit?: Address
}
export namespace Addresses {
	export const type = isly.object<Addresses>({
		primary: Address.type,
		billing: Address.type,
		delivery: Address.type,
		visit: Address.type,
	})
}
