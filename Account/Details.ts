import { isly } from "isly"
import { Rail } from "../Rail"
import { Supplier } from "../Supplier"

export interface Details {
	supplier: Supplier
	reference?: string
	addresses: Rail.Address[]
}
export namespace Details {
	export const type = isly.object<Details>({
		supplier: Supplier.type,
		reference: isly.string().optional(),
		addresses: Rail.Address.type.array(),
	})
}
