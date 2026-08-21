import { zod } from "../../zod"
import { Base } from "./Base"

export interface Outgoing extends Base {
	type: "outgoing"
}
export namespace Outgoing {
	export const typeZod = Base.typeZod.extend({ type: zod.literal("outgoing") })
}
