export interface Base {
	type: "funding"
	source: Base.Source
}
export namespace Base {
	export namespace Source {
		export const values = ["paxgiro"] as const
	}
	export type Source = typeof Source.values[number]
}
