import { isly } from "isly"
import { GB } from "./GB"
import { Default } from "./General"
import { SE } from "./SE"

export type Address = GB | SE | Default

export namespace Address {
	export const type = isly.union<Address, GB, Default>(GB.type, Default.type)
	export const is = type.is
	export const flaw = type.flaw
}