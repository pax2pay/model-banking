import * as isoly from "isoly"
import { Balances } from "../Balances"
import { Fiat } from "./Fiat"

export type Treasury = Partial<Record<isoly.Currency, { eMoney: Partial<Record<Balances.Entry, number>>; fiat: Fiat }>>
