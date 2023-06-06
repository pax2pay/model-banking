import { isly } from "isly"
import { Cancel } from "./Cancel"
import { Change } from "./Change"
import { Create } from "./Create"

export type Operation = Cancel | Change | Create

export namespace Operation {
	export const type = isly.union(Cancel.type, Change.type, Create.type)
	export const is = type.is
}
