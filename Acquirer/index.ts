import { isoly } from "isoly"
import { isly } from "isly"

export interface Acquirer {
	id: string
	number: string
	country?: isoly.CountryCode.Alpha2
	retrievalReferenceNumber?: string
	systemTraceAuditNumber?: string
}
export namespace Acquirer {
	export const type = isly.object<Acquirer>({
		id: isly.string(),
		number: isly.string(),
		country: isly.fromIs("Acquirer.country", isoly.CountryCode.Alpha2.is).optional(),
		retrievalReferenceNumber: isly.string().optional(),
		systemTraceAuditNumber: isly.string().optional(),
	})
}
