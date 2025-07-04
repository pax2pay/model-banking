import { isly } from "isly"
import { isly as isly2 } from "isly2"
import type { Transaction } from "../../Transaction"

export type Merchant = typeof Merchant.values[number]
export namespace Merchant {
	export const values = [
		"united airlines",
		"american air",
		"british airways",
		"air france",
		"lufthansa",
		"qantas",
		"alitalia",
		"saudi air",
		"sas",
		"air india",
		"air algerie",
		"emirates",
		"air malta",
		"etihad air",
		"tap",
		"avianca",
		"gulf air",
		"aer lingus",
		"turkish air",
		"royal air maroc",
		"tunis air",
		"austrian air",
		"flydubai",
		"cebu air",
		"thai airways",
		"china airlines",
		"malaysia airlines",
		"iberia",
		"qatar air",
		"ana air",
		"jet blue",
		"middle east airlines",
		"lot polish airlines",
		"norwegian air",
		"air arabia",
		"easyjet",
		"ryanair",
		"air china",
		"ethiopian airlines",
		"wizz air",
	] as const
	export const type = isly.string<Merchant>(values)
	export const type2 = isly2.string<Merchant>("value", ...values)
	export type Checker = (merchant: Merchant, transaction: Transaction.Creatable.CardTransaction) => boolean
	export type Attribute = { mccs: string[]; checkers?: Checker[] }
	export const attributes: Record<Merchant, Attribute> = {
		"united airlines": { mccs: ["3000"] },
		"american air": { mccs: ["3001"] },
		"british airways": { mccs: ["3005"] },
		"air france": { mccs: ["3007"] },
		lufthansa: { mccs: ["3008"] },
		qantas: { mccs: ["3012"] },
		alitalia: { mccs: ["3013"] },
		"saudi air": { mccs: ["3014"] },
		sas: { mccs: ["3016"] },
		"air india": { mccs: ["3020"] },
		"air algerie": { mccs: ["3021"] },
		emirates: { mccs: ["3026"] },
		"air malta": { mccs: ["3028"] },
		"etihad air": { mccs: ["3034"] },
		tap: { mccs: ["3035"] },
		avianca: { mccs: ["3039"] },
		"gulf air": { mccs: ["3040"] },
		"aer lingus": { mccs: ["3043"] },
		"turkish air": { mccs: ["3047"] },
		"royal air maroc": { mccs: ["3048"] },
		"tunis air": { mccs: ["3049"] },
		"austrian air": { mccs: ["3051"] },
		flydubai: { mccs: ["3070"] },
		"cebu air": { mccs: ["3072"] },
		"thai airways": { mccs: ["3077"] },
		"china airlines": { mccs: ["3078"] },
		"malaysia airlines": { mccs: ["3100"] },
		iberia: { mccs: ["3102"] },
		"qatar air": { mccs: ["3136"] },
		"ana air": { mccs: ["3161"] },
		"jet blue": { mccs: ["3174"] },
		"middle east airlines": { mccs: ["3175"] },
		"lot polish airlines": { mccs: ["3182"] },
		"norwegian air": { mccs: ["3211"] },
		"air arabia": { mccs: ["3236"] },
		easyjet: { mccs: ["3245"] },
		ryanair: { mccs: ["3246"] },
		"air china": { mccs: ["3261"] },
		"ethiopian airlines": { mccs: ["3294"] },
		"wizz air": { mccs: ["3301"] },
	}
	export function check(merchant: Merchant, transaction: Transaction.Creatable.CardTransaction): boolean {
		const attribute = Merchant.attributes[merchant]
		return (
			attribute.mccs.some(mcc => transaction.counterpart.merchant.category == mcc) ||
			(attribute.checkers ?? []).some(checker => checker(merchant, transaction))
		)
	}
}
