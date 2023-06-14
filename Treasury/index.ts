import { Account as TreasuryAccount } from "./Account"
import { Balance as TreasuryBalance } from "./Balance"
import { Fiat as TreasuryFiat } from "./Fiat"
export { Treasury } from "./Treasury"

export namespace Treasury {
	export type Account = TreasuryAccount
	export type Balance = TreasuryBalance
	export type Fiat = TreasuryFiat
	export const Balance = TreasuryBalance
	export namespace Account {
		export type Creatable = TreasuryAccount.Creatable
		export const Creatable = TreasuryAccount.Creatable
		export type Storable = TreasuryAccount.Storable
		export const Storable = TreasuryAccount.Storable
		export type Fetchable = TreasuryAccount.Fetchable
		export const Fetchable = TreasuryAccount.Fetchable
		export const is = TreasuryAccount.is
	}
}
