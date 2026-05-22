import { Card } from "../../Card"
import { Transaction } from "../../Transaction"
import { Base } from "./Base"

export interface MCC extends Base {
	stack: Card.Stack[]
	mccs: MCC.Value[]
	ranges: MCC.Range[]
}
export namespace MCC {
	export type Value = `${number}${number}${number}${number}`
	export interface Range {
		from: Value
		to: Value
	}
	export function evaluate(mcc: MCC[], transaction: Transaction): boolean | undefined {
		let result: boolean | undefined = undefined
		const { allow, block } = mcc.reduce<{ allow: MCC[]; block: MCC[] }>(
			(r, m) => (m.type == "allow" ? { ...r, allow: [...r.allow, m] } : { ...r, block: [...r.block, m] }),
			{ allow: [], block: [] }
		)
		if (block.some(m => m.stack.some(s => s.evaluate(transaction)))) {
			result = false
		}
		if (result == undefined && allow.some(m => m.stack.some(s => s.evaluate(transaction)))) {
			result = true
		}
		return result
	}
}
