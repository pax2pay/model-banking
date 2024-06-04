import { isly } from "isly"

export interface PaxgiroCredit {
	type: "paxgiro-credit"
	reference: string
	justInTime?: boolean
}
export namespace PaxgiroCredit {
	export const type = isly.object<PaxgiroCredit>({
		type: isly.string("paxgiro-credit"),
		reference: isly.string(),
		justInTime: isly.boolean().optional(),
	})
}
