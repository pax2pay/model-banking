import { isoly } from "isoly"
import { Identifier as Pax2PayIdentifier } from "../Identifier"

export type Identifier = Pax2PayIdentifier
export namespace Identifier {
	export const type = Pax2PayIdentifier.type
	export function generate(): string {
		//This function will stop working 4199-11-24T01:22:57.664Z
		//Then we need to replace "zzy" instead
		return Pax2PayIdentifier.generate(isoly.DateTime.now(), 16, "reversed").replace("zzz", "tr_")
	}
}
