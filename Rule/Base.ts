import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
		export const values = ["authorization", "outbound", "inbound"] as const
		export const type = isly.string<Kind>(values)
		export const type2 = isly2
			.string<Kind>("value", ...values)
			.rename("Kind")
			.describe("The type of the rule.")
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
		export const type2 = isly2
			.string<Category>("value", ...values)
			.rename("Category")
			.describe("The category of the rule.")
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
	export const type2 = isly2.object<Base>({
		code: isly2
			.string("value", /^[a-z0-9\-_]+$/)
			.rename("Code")
			.describe("The unique identifier of the rule."),
		name: isly2.string().rename("Name").describe("The name of the rule."),
		description: isly2.string().rename("Description").describe("The description of the rule."),
		type: Kind.type2,
		category: Category.type2,
		condition: isly2
			.string()
			.rename("Condition")
			.describe("The condition to evaluate, determines if the action is applied or not."),
		flags: isly2.string().array().rename("Flags").describe("The flags to set when the rule is applied."),
		groups: isly2.string().array().optional().rename("Groups").describe("The groups the rule applies to."),
		presets: Preset.type2.array().optional().rename("Presets").describe("The presets the rule applies to."),
	})
}
