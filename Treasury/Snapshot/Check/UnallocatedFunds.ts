import { Base as ResultBase } from "./Base"

export interface UnallocatedFunds extends ResultBase {
	check: "unallocated funds"
	balance: number
}
export namespace UnallocatedFunds {}
