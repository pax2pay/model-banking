import { isly } from "isly"

export interface Summary {
	expected?: number
	count: number
	failed?: { count: number }
}

export namespace Summary {
	export const type = isly.object<Summary>({
		expected: isly.number().optional(),
		count: isly.number(),
		failed: isly.object<{ count: number }>({ count: isly.number() }).optional(),
	})
}
