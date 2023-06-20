import { isly } from "isly"
import { Supplier as modelSupplier } from "../Supplier"

export type Realm = typeof Realm.realms[number]

export namespace Realm {
	export const realms = ["test", "testUK", "uk", "eu"] as const
	export const type: isly.Type<Realm> = isly.union(
		isly.string("test"),
		isly.string("testUK"),
		isly.string("uk"),
		isly.string("eu")
	)
	export const is = type.is
	export function toString(): string {
		return realms.toString().replaceAll(",", ", ") + "."
	}
	export const suppliers: Record<Realm, modelSupplier[]> = {
		test: ["paxgiro"],
		testUK: ["clearbank"],
		uk: ["clearbank"],
		eu: [],
	}
	export interface Suppliers extends Record<Realm, modelSupplier[]> {
		test: ["paxgiro"]
		testUK: ["clearbank"]
		uk: ["clearbank"]
		eu: []
	}
	export type Supplier<P extends keyof Suppliers> = Pick<Suppliers, P>[P][number]
	export namespace Supplier {
		export function is(realm: Realm, supplier: modelSupplier | any): supplier is Supplier<Realm> {
			return suppliers[realm].includes(supplier)
		}
	}
}
