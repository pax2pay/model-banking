import { isly } from "isly"
import { typedly } from "typedly"
import { Realm } from "../Realm"

export type Permission = Partial<Record<Realm, Permission.Privilege>>
export namespace Permission {
	/** read < write < developer < admin */
	export type Privilege = Partial<Record<Privilege.Collection, Privilege.Level>>
	export namespace Privilege {
		export function check(constraint: Privilege, privilege: Privilege): boolean {
			return typedly.Object.entries(constraint).every(
				([collection, level]) =>
					Privilege.Level.get(privilege[collection]) >= Privilege.Level.get(level) ||
					Privilege.Level.get(privilege["*"]) >= Privilege.Level.get(level)
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
			}
		}
		export type Collection = typeof Collection.values[number]
		export namespace Collection {
			export const values = [
				"account",
				"card",
				"log",
				"operation",
				"organization",
				"rule", // realm rules
				"settlement",
				"transaction",
				"treasury",
				"*",
			] as const
			export const type = isly.string(values)
		}
	}
	export const type = isly.record<Permission>(
		Realm.type,
		isly.record<Privilege>(Privilege.Collection.type, Privilege.Level.type)
	)
}
