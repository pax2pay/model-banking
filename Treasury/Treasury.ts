import * as isoly from "isoly"
import { Balances } from "../Balances"
export { Account } from "./Account"
export { Balance } from "./Balance"
export { Client } from "./Client"
import { Fiat as TreasuryFiat } from "./Fiat"

export type Treasury = Record<isoly.Currency, { eMoney: Balances.Entry; fiat: Fiat }>
export type Fiat = TreasuryFiat
