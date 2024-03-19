import { isly } from "isly"

export interface Destinations {
	settlement: {
		account: string
		transaction: string
	}
	fee: {
		account: string
		transaction: string
	}
}
export namespace Destinations {
	export const type = isly.object<Destinations>({
		settlement: isly.object<Destinations["settlement"]>({
			account: isly.string(),
			transaction: isly.string(),
		}),
		fee: isly.object<Destinations["fee"]>({
			account: isly.string(),
			transaction: isly.string(),
		}),
	})
}
