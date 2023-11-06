import { Amounts } from "../../Amounts"
import type { Account } from "./index"

export interface Buffer extends Account {
	type: "buffer"
	balance: Amounts
	minimum: Amounts
}
