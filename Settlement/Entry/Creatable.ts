import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Merchant } from "../../Merchant"
import { Exchange } from "../../Transaction/Exchange"
import { zod } from "../../zod"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export type Creatable = Creatable.Known | Creatable.Unknown
export namespace Creatable {
	export interface Base {
		card: string
		transaction?: string
		transactionReference?: string
		account: string
		approvalCode: string
		merchant: Merchant
		acquirer: Acquirer
		reference: string
		batch: Batch
		fee: Fee
		amount: Amount
		settlement: SettlementIdentifier
		exchange?: Exchange
	}
	export namespace Base {
		export const type = isly.object<Base>({
			card: isly.string(),
			transaction: isly.string().optional(),
			transactionReference: isly.string().optional(),
			account: isly.string(),
			approvalCode: isly.string(),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
			reference: isly.string(),
			batch: Batch.type,
			fee: Fee.type,
			amount: Amount.type,
			settlement: SettlementIdentifier.type,
			exchange: Exchange.type.optional(),
		})
		export const typeZod = zod.object({
			card: zod.string(),
			transaction: zod.string().optional(),
			transactionReference: zod.string().optional(),
			account: zod.string(),
			approvalCode: zod.string(),
			merchant: Merchant.typeZod,
			acquirer: Acquirer.typeZod,
			reference: zod.string(),
			batch: Batch.typeZod,
			fee: Fee.typeZod,
			amount: Amount.typeZod,
			settlement: SettlementIdentifier.typeZod,
			exchange: Exchange.typeZod.optional(),
		})
	}
	export interface Capture extends Base {
		type: "capture"
	}
	export namespace Capture {
		export const type = Base.type.extend<Capture>({ type: isly.string("capture") })
		export const typeZod: zod.ZodType<Capture> = Base.typeZod.extend({ type: zod.literal("capture") })
	}
	export interface Refund extends Base {
		type: "refund"
	}
	export namespace Refund {
		export const type = Base.type.extend<Refund>({ type: isly.string("refund") })
		export const typeZod: zod.ZodType<Refund> = Base.typeZod.extend({ type: zod.literal("refund") })
	}
	export type Known = Capture | Refund

	export namespace Known {
		export const type = isly.union(Capture.type, Refund.type)
		export const typeZod: zod.ZodType<Known> = zod.union([Capture.typeZod, Refund.typeZod])
	}
	export interface Unknown extends Partial<Base> {
		type: "unknown"
		data: Record<string, unknown>
	}
	export namespace Unknown {
		export const type = isly.object<Unknown>({
			...(Object.fromEntries(
				Object.entries(Base.type.getProperties()).map(([k, v]) => [k, v.optional()])
			) as isly.object.Properties<Partial<Base>>), // TODO: Add "Partial" to isly
			type: isly.string("unknown"),
			data: isly.record<Record<string, unknown>>(isly.string(), isly.any()),
		})
		export const typeZod: zod.ZodType<Unknown> = Base.typeZod.partial().extend({
			type: zod.literal("unknown"),
			data: zod.record(zod.string(), zod.any()),
		})
	}
	export const type = isly.union(Known.type, Unknown.type)
	export const typeZod: zod.ZodType<Creatable> = zod.union([Known.typeZod, Unknown.typeZod])
}
