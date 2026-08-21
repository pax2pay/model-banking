import { isly } from "isly"
import { Supplier } from "../Supplier"
import { zod } from "../zod"

export interface Reference {
	supplier?: Supplier
	reference?: string // Suppliers id for the transaction
	returnId?: string
	endToEndId?: string
	instruction?: string // SWIFT instruction id, TransactionReference on Banking circle hook
	network?: string
}

export namespace Reference {
	export const type = isly.object<Reference>({
		supplier: Supplier.type.optional(),
		reference: isly.string().optional(),
		returnId: isly.string().optional(),
		endToEndId: isly.string().optional(),
		instruction: isly.string().optional(),
		network: isly.string().optional(),
	})
	export const typeZod = zod.object({
		supplier: Supplier.typeZod.optional(),
		reference: zod.string().optional(),
		returnId: zod.string().optional(),
		endToEndId: zod.string().optional(),
		instruction: zod.string().optional(),
		network: zod.string().optional(),
	})
}
