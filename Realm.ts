import { isoly } from "isoly"
import { isly } from "isly"
import { Supplier as modelSupplier } from "./Supplier"

export type Realm = typeof Realm.realms[number]

export namespace Realm {
	export const realms = ["test", "testUK", "uk", "eea", "upcheck"] as const
	export const type: isly.Type<Realm> = isly.string(realms)
	export function toString(): string {
		return realms.toString().replaceAll(",", ", ") + "."
	}
	export const currency: Record<Realm, isoly.Currency> = {
		test: "EUR",
		upcheck: "EUR",
		testUK: "GBP",
		uk: "GBP",
		eea: "EUR",
	}
	export const suppliers: Record<Realm, modelSupplier[]> = {
		test: ["paxgiro", "paxgiroCredit"],
		testUK: ["clearbank"],
		uk: ["clearbank"],
		eea: [],
		upcheck: ["paxgiro"],
	}
	export interface Suppliers extends Record<Realm, modelSupplier[]> {
		test: ["paxgiro", "paxgiroCredit"]
		testUK: ["clearbank"]
		uk: ["clearbank"]
		eea: []
		upcheck: ["paxgiro"]
	}
	export type Supplier<P extends keyof Suppliers> = Pick<Suppliers, P>[P][number]
	export namespace Supplier {
		export function is(realm: Realm, supplier: modelSupplier | any): supplier is Supplier<Realm> {
			return suppliers[realm].includes(supplier)
		}
	}
}
