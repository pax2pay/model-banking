import { isoly } from "isoly"
import { isly } from "isly"

export type Counterbalance2 = {
	minted: Partial<Record<Counterbalance2.Source, number>>
	burned: Partial<Record<Counterbalance2.Sink, number>>
}
export namespace Counterbalance2 {
	export type Source = string
	export const Source = isly.string()
	export type Sink = string
	export const Sink = isly.string()
	export const type = isly.object<Counterbalance2>({
		minted: isly.record<Counterbalance2["minted"]>(Source, isly.number()),
		burned: isly.record<Counterbalance2["burned"]>(Sink, isly.number()),
	})
	export type Link = Source | Sink
	export const Link = isly.string()
	export function add(currency: isoly.Currency, addendee: Counterbalance2, addend: Counterbalance2): Counterbalance2 {
		const result: Counterbalance2 = { minted: { ...addend.minted }, burned: { ...addend.burned } }
		for (const [source, value] of Object.entries(addendee["minted"]) as [Source, number][]) {
			result["minted"][source] = isoly.Currency.add(currency, value ?? 0, addend["minted"][source] ?? 0)
		}
		for (const [sink, value] of Object.entries(addendee["burned"]) as [Sink, number][]) {
			result["burned"][sink] = isoly.Currency.add(currency, value ?? 0, addend["burned"][sink] ?? 0)
		}
		return result
	}
}
