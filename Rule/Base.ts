import { isly } from "isly"
import { Preset } from "../Card/Preset"

export interface Base {
	code: string
	name: string
	description: string
	type: Base.Kind
	category: Base.Category
	condition: string
	flags: string[]
	groups?: string[]
	presets?: Preset[]
}
export namespace Base {
	export type Kind = typeof Kind.values[number]
	export namespace Kind {
		export const values = ["authorization", "outbound", "inbound", "capture", "refund"] as const
		export const type = isly.string<Kind>(values)
		export function is(kind: Kind, rule: Base, groups: string[] | undefined, preset: Preset | undefined): boolean {
			const applyRuleForGroup =
				!rule.groups || rule.groups.some(ruleGroup => groups?.some(organizationGroup => organizationGroup == ruleGroup))
			const applyRuleForPreset = !rule.presets || rule.presets.some(rulePreset => preset == rulePreset)
			return kind == rule.type && applyRuleForGroup && applyRuleForPreset
		}
	}
	export type Category = typeof Category.values[number]
	export namespace Category {
		export const values = ["fincrime", "product", "customer"] as const
		export const type = isly.string<Category>(values)
	}
	export const type = isly.object<Base>({
		code: isly.string(/^[a-z0-9\-_]+$/),
		name: isly.string(),
		description: isly.string(),
		type: Kind.type,
		category: Category.type,
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
		presets: Preset.type.array().optional(),
	})
}
