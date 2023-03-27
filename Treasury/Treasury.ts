import * as isoly from "isoly"
import { Balances } from "../Balances"
import { Fiat } from "./Fiat"

export type Treasury = Record<isoly.Currency, { eMoney: Balances; fiat: Fiat }>
