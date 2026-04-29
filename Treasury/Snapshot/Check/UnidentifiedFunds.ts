import { Base as ResultBase } from "./Base"

export interface UnidentifiedFunds extends ResultBase {
	check: "unidentified funds"
	account: string
	balance: number
}
export namespace UnidentifiedFunds {}
