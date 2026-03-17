import { isly } from "isly"
import { Supplier } from "../Supplier"

export interface Reference {
	supplier?: Supplier
	reference?: string // Suppliers id for the transaction
	returnId?: string
	endToEndId?: string
	instruction?: string // SWIFT instruction id, TransactionReference on Banking circle hook
}

export namespace Reference {
	export const type = isly.object<Reference>({
		supplier: Supplier.type.optional(),
		reference: isly.string().optional(),
		returnId: isly.string().optional(),
		endToEndId: isly.string().optional(),
		instruction: isly.string().optional(),
	})
}
