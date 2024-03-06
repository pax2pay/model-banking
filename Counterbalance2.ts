import { isoly } from "isoly"
import { isly } from "isly"
import { Supplier } from "./Supplier"

export type Counterbalance2 = {
	minted: Partial<Record<Counterbalance2.Source, number>>
	burned: Partial<Record<Counterbalance2.Sink, number>>
}
export namespace Counterbalance2 {
	export const sources = [...Supplier.names, "internal"] as const
	export type Source = `${typeof sources[number]}-${string}` // string: fiat account identifier
	export const Source = isly.fromIs<Source>("Source", (value: any | Source) => {
		const result = !value ? false : typeof value == "string" && value.split("-")
		return result && result.length == 2 && sources.includes(result[0] as any) && typeof result[1] == "string"
	})
	export const sinks = [...Supplier.names, "internal"] as const
	export type Sink = `${typeof sinks[number]}-${string}` // string: fiat account identifier
	export const Sink = isly.fromIs<Sink>("Sink", (value: any | Sink) => {
		const result = !value ? false : typeof value == "string" && value.split("-")
		return result && result.length == 2 && sinks.includes(result[0] as any) && typeof result[1] == "string"
	})
	export const type = isly.object<Counterbalance2>({
		minted: isly.record<Counterbalance2["minted"]>(Source, isly.number()),
		burned: isly.record<Counterbalance2["burned"]>(Sink, isly.number()),
	})
	export type Link = Source | Sink
	export const Link = isly.union<Link, Source, Sink>(Source, Sink)
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
