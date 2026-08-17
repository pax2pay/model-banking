import { isly } from "isly"
import { Card } from "../../../Card"
import { zod } from "../../../zod"

export type Preset = Partial<Record<Card.Preset, number>> & {
	default: number
}

export namespace Preset {
	const recordType = isly.record<Preset>(isly.string(Card.Preset.names), isly.number())
	const defaultType = isly.object<{ default: number }>({ default: isly.number() })
	function is(value: unknown): value is Preset {
		return defaultType.is(value) && recordType.is((({ default: _, ...rest }) => rest)(value))
	}
	export const type = isly.fromIs("Preset", is)
	export const typeZod = zod
		.partialRecord(zod.enum([...Card.Preset.names, "default"]), zod.number())
		.and(zod.object({ default: zod.number() }))
}
