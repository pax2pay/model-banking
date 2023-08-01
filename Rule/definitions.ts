import { selectively } from "selectively"

export const definitions: Record<string, selectively.Definition> = {
	exceedsAmount: { arguments: ["max"], definition: "amount>max" },
	isInternal: { arguments: [], definition: "counterpart.type:internal" },
	alwaysTrue: { arguments: [], definition: "amount:0|!amount:0" },
}
