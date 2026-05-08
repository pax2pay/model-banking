import { Base as ResultBase } from "./Base"

export interface UnallocatedFunds extends ResultBase {
	check: "unidentified funds"
	balance: number
}
export namespace UnallocatedFunds {}
