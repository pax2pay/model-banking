import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../zod"

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
	export const typeZod: zod.ZodType<Acquirer> = zod.object({
		id: zod.string(),
		number: zod.string(),
		country: zod.enum(isoly.CountryCode.Alpha2.values).optional(),
		retrievalReferenceNumber: zod.string().optional(),
		systemTraceAuditNumber: zod.string().optional(),
	})
}
