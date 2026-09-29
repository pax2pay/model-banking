import { isly } from "isly"
import { zod } from "../../../zod"
import { Default } from "./Default"
import { GB } from "./GB"
import { SE } from "./SE"

export type Address = GB | SE | Default

export namespace Address {
	export const type = isly.union(GB.type, SE.type, Default.type)
	export const typeZod: zod.ZodType<Address> = zod.union([GB.typeZod, SE.typeZod, Default.typeZod])
}
