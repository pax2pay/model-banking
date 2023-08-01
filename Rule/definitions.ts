import { selectively } from "selectively"

export const definitions: Record<string, selectively.Definition> = {
	isInternal: { arguments: [], definition: "transaction.counterpart.type:internal" },
	alwaysTrue: { arguments: [], definition: "a:0|!a:0" },
}
