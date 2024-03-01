import { isoly } from "isoly"
import { isly } from "isly"
import { Supplier } from "./Supplier"

export type Counterbalance2 = {
	minted: Partial<Record<Counterbalance2.Source, number>>
	burned: Partial<Record<Counterbalance2.Sink, number>>
}
export namespace Counterbalance2 {
	export type Source = `${Supplier | "internal"}|${isoly.DateTime}`
	export const Source = isly.string<Source>()
	export type Sink = `${Supplier | "internal"}|${isoly.DateTime}`
	export const Sink = isly.string<Sink>()
	export const type = isly.object<Counterbalance2>({
		minted: isly.record<Counterbalance2["minted"]>(Source, isly.number()),
		burned: isly.record<Counterbalance2["burned"]>(Sink, isly.number()),
	})
	export type Link = Source | Sink
	export const Link = isly.union<Link, Source, Sink>(Source, Sink)
	export function add(currency: isoly.Currency, addendee: Counterbalance2, addend: Counterbalance2): Counterbalance2 {
		const result: Counterbalance2 = { minted: {}, burned: {} }
		for (const [source, value] of Object.entries(addendee["minted"]) as [Source, number][]) {
			result["burned"][source] = isoly.Currency.add(currency, value ?? 0, addend["burned"][source] ?? 0)
		}
		for (const [sink, value] of Object.entries(addendee["burned"]) as [Sink, number][]) {
			result["burned"][sink] = isoly.Currency.add(currency, value ?? 0, addend["burned"][sink] ?? 0)
		}
		return result
	}
}
