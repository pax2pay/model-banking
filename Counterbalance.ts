import { isoly } from "isoly"
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
	export function add(currency: isoly.Currency, addendee: Counterbalance, addend: Counterbalance): Counterbalance {
		const result: Counterbalance = { minted: { ...addend.minted }, burned: { ...addend.burned } }
		for (const [source, value] of Object.entries(addendee["minted"]) as [Source, number][]) {
			result["minted"][source] = isoly.Currency.add(currency, value ?? 0, addend["minted"][source] ?? 0)
		}
		for (const [sink, value] of Object.entries(addendee["burned"]) as [Sink, number][]) {
			result["burned"][sink] = isoly.Currency.add(currency, value ?? 0, addend["burned"][sink] ?? 0)
		}
		return result
	}
}
