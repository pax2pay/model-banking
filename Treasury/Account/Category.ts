export type Category = typeof Category.type[number]
export namespace Category {
	export const type = ["safeguarded", "unsafe", "other", "external"] as const
}
