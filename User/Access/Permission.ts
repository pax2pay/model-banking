import { isly } from "isly"
import { typedly } from "typedly"

export type Permission = Partial<Record<Permission.Collection, Permission.Level>>
export namespace Permission {
	export type Realm = Record<Permission.Collection.Realm, Permission.Level>
	export type Global = Record<Permission.Collection.Global, Permission.Level>
	export function check(constraint: Permission, privilege: Permission): boolean {
		return typedly.Object.entries(constraint).every(
			([collection, level]) =>
				Permission.Level.get(privilege[collection]) >= Permission.Level.get(level) ||
				(collection != "user" && Permission.Level.get(privilege["*"]) >= Permission.Level.get(level))
		)
	}
	export type Level = typeof Level.values[number]
	export namespace Level {
		export const values = ["read", "write", "developer", "admin"] as const
		export const type = isly.string(values)
		export function get(level: Level | undefined): number {
			return level ? value[level] : 0
		}
		export const value: Record<Level, number> = {
			read: 1,
			write: 2,
			developer: 3,
			admin: 4,
		} as const
	}
	export type Collection = typeof Collection.values[number]
	export namespace Collection {
		export type Realm = typeof Realm.values[number]
		export namespace Realm {
			export const values = [
				"*",
				"account",
				"card",
				"log",
				"operation",
				"organization",
				"rule", // realm rules
				"settlement",
				"transaction",
				"treasury",
			] as const
		}
		export type Global = typeof Global.values[number]
		export namespace Global {
			export const values = ["user"] as const
		}
		export const values = [...Realm.values, ...Global.values] as const
		export const type = isly.string(values)
	}
	export const type = isly.record<Permission>(Collection.type, Level.type)
}
