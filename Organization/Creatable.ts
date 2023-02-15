export interface Creatable {
	name: string
	realm: "test" | "uk" | "eu"
	rule: { incoming: string; outgoing: string }
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			(value.realm == "test" || value.realm == "uk" || value.realm == "eu") &&
			value.rule &&
			typeof value.rule == "object" &&
			typeof value.rule.incoming == "string" &&
			typeof value.rule.outgoing == "string"
		)
	}
}
