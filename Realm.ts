import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Supplier as modelSupplier } from "./Supplier"

export type Realm = typeof Realm.realms[number]

export namespace Realm {
	export const realms = ["test", "uk", "uguk", "eea"] as const
	export const type = isly.string<Realm>(realms)
	export const type2 = isly2
		.string<Realm>("value", ...realms)
		.rename("Realm")
		.describe("Financial jurisdiction.")
	export function toString(): string {
		return realms.toString().replaceAll(",", ", ") + "."
	}
	export const currency: Record<Realm, isoly.Currency> = { test: "EUR", uk: "GBP", uguk: "GBP", eea: "EUR" }
	export const suppliers: Record<Realm, modelSupplier[]> = {
		test: ["paxgiro", "bankingcircle", "paxgiroCredit"],
		uk: ["clearbank", "bankingcircle"],
		uguk: ["bankingcircle"],
		eea: [],
	}
	export interface Suppliers extends Record<Realm, modelSupplier[]> {
		test: ["paxgiro", "bankingcircle", "paxgiroCredit"]
		uk: ["clearbank", "bankingcircle"]
		uguk: ["bankingcircle"]
		eea: []
	}
	export type Supplier<P extends keyof Suppliers> = Pick<Suppliers, P>[P][number]
	export namespace Supplier {
		export function is(realm: Realm, supplier: modelSupplier | any): supplier is Supplier<Realm> {
			return suppliers[realm].includes(supplier)
		}
	}
}
