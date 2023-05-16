import { Supplier } from "../Supplier"

export interface Reference {
	supplier?: Supplier
	reference?: string
	returnId?: string
	endToEndId?: string
}
