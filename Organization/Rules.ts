import * as selectively from "selectively"

export interface Rules {
	calls: string[]
	functions: Record<string, selectively.Definition>
}

export namespace Rules {
	export function is(value: Rules): value is Rules {
		//const functionCalls = value.calls
		//	.map(c => selectively.parse(c))
		//	.map(r => r.class == "FunctionCall")
		//	.includes(false)
		//const functions = Object.entries(value.functions)
		//	.map(
		//		functions =>
		//			typeof functions[0] == "string" &&
		//			typeof functions[1] == "object" &&
		//			Object.entries(functions[1])
		//				.map(definitions => typeof definitions[0] == "string")
		//				.includes(false)
		//	)
		//	.includes(false)
		return (
			value &&
			typeof value == "object" &&
			value.calls &&
			typeof value.calls == "object" &&
			Array.isArray(value.calls) &&
			!value.calls
				.map(c => selectively.parse(c))
				.map(r => r.class == "FunctionCall")
				.includes(false) &&
			value.functions &&
			typeof value.functions == "object" &&
			!Object.entries(value.functions)
				.map(
					functions =>
						typeof functions[0] == "string" &&
						typeof functions[1] == "object" &&
						Object.entries(functions[1])
							.map(definitions => typeof definitions[0] == "string")
							.includes(false)
				)
				.includes(false)
		)
	}

	// dummy function, remove later
	export function activate(rules: Rules): boolean {
		const result: boolean[] = []
		for (const call in rules.calls) {
			const parsed = selectively.parse(call)
			const resolved = selectively.resolve(rules.functions, parsed)
			result.push(resolved.is(resolved, {}))
		}
		return !result.includes(false)
	}
}
