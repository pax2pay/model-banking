import * as cryptly from "cryptly"
import * as selectively from "selectively"
import { Creatable as OrganizationCreatable } from "./Creatable"
import { Rules as OrganizationRules } from "./Rules"

export interface Organization extends OrganizationCreatable {
	readonly id: cryptly.Identifier
	calls: string[]
	functions: Record<string, selectively.Definition>
}

export namespace Organization {
	export function is(value: Organization | any): value is Organization {
		return value && OrganizationCreatable.is({ ...value }) && typeof value.id == "string"
	}
	export function fromCreatable(organization: Creatable): Organization {
		return { ...organization, id: cryptly.Identifier.generate(8), calls: [], functions: {} }
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}

	// dummy function, remove later
	export function activate(organization: Organization): boolean {
		const result: boolean[] = []
		for (const call in organization.calls) {
			const parsed = selectively.parse(call)
			const resolved = selectively.resolve(organization.functions, parsed)
			result.push(resolved.is(resolved, {}))
		}
		return !result.includes(false)
	}

	export type Creatable = OrganizationCreatable
	export const Creatable = OrganizationCreatable
	export type Rules = OrganizationRules
	export const Rules = OrganizationRules
}
