import { Base } from "./Base"

export interface Overdraft extends Base {
	check: "overdraft"
	overdrafts: { account: string; balance: number }[]
}
export namespace Overdraft {}
