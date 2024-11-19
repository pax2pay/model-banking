import { isly } from "isly"

export interface Summary {
	count: number
	failed?: {
		count: number
	}
}

export namespace Summary {
	export const type = isly.object<Summary>({
		count: isly.number(),
		failed: isly
			.object<{ count: number }>({
				count: isly.number(),
			})
			.optional(),
	})
}
