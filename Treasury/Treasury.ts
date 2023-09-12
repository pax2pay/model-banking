import { isoly } from "isoly"
import { Balances } from "../Balances"
import { Fiat } from "./Fiat"

export type Treasury = Partial<Record<isoly.Currency, { emoney: Partial<Record<Balances.Entry, number>>; fiat: Fiat }>>
