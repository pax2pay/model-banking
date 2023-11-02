export type Category = typeof Category.type[number]
export namespace Category {
	export const type = ["safeguarded", "unsafe", "buffer", "other", "external"] as const
}
