import { isly } from "isly2"

export interface Merchant {
	name: string
	unambiguousMcc?: string
	mccs?: Readonly<string[]>
	startsWith?: Readonly<string[]>
	contains?: Readonly<string[]>
}
export namespace Merchant {
	export const type = isly.object<Merchant>({
		name: isly.string(),
		unambiguousMcc: isly.string().optional(),
		mccs: isly.string().array().optional(),
		startsWith: isly.string().array().optional(),
		contains: isly.string().array().optional(),
	})
	export function parse(value: Record<string, any>): Merchant | undefined {
		const result = {
			name: value.name?.toLowerCase(),
			unambiguousMcc: value.unambiguousMcc && value.unambiguousMcc.toString(),
			mccs: value.mccs && (Array.isArray(value.mccs) ? value.mccs.map(v => v.toString()) : [value.mccs.toString()]),
			startsWith: value.startsWith && (Array.isArray(value.startsWith) ? value.startsWith : [value.startsWith]),
			contains: value.contains && (Array.isArray(value.contains) ? value.contains : [value.contains]),
		}
		return type.prune(result)
	}
}
