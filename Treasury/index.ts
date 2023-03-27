import { Account as TreasuryAccount } from "./Account"
import { Balance as TreasuryBalance } from "./Balance"
import { Client as TreasuryClient } from "./Client"
import { Fiat as TreasuryFiat } from "./Fiat"
import { Treasury as TreasuryType } from "./Treasury"

export namespace Treasury {
	export type Account = TreasuryAccount
	export type Balance = TreasuryBalance
	export type Fiat = TreasuryFiat
	export type Treasury = TreasuryType
	export type Client = TreasuryClient
	export const Account = TreasuryAccount
	export const Balance = TreasuryBalance
	export const Client = TreasuryClient
}
