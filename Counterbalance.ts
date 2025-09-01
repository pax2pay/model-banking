import { isly } from "isly"

export type Counterbalance = {
	minted: Partial<Record<Counterbalance.Source, number>>
	burned: Partial<Record<Counterbalance.Sink, number>>
	internal?: Partial<Record<string, number>>
}
export namespace Counterbalance {
	export type Source = string
	export const Source = isly.string()
	export type Sink = string
	export const Sink = isly.string()
	export const type = isly.object<Counterbalance>({
		minted: isly.record<Counterbalance["minted"]>(Source, isly.number()),
		burned: isly.record<Counterbalance["burned"]>(Sink, isly.number()),
		internal: isly.record<Required<Counterbalance>["internal"]>(isly.string(), isly.number()).optional(),
	})
	export type Link = Source | Sink
	export const Link = isly.string()
}
