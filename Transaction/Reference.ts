import { isly } from "isly"
import { Supplier } from "../Supplier"

export interface Reference {
	supplier?: Supplier
	reference?: string
	returnId?: string
	endToEndId?: string
}

export namespace Reference {
	export const type = isly.object<Reference>({
		supplier: Supplier.type.optional(),
		reference: isly.string().optional(),
		returnId: isly.string().optional(),
		endToEndId: isly.string().optional(),
	})
}
