import { isly } from "isly"

export interface Coinage {
	type: "coinage"
	link: string
	amount: number
}

export namespace Coinage {
	export const type = isly.object<Coinage>({
		type: isly.string("coinage"),
		link: isly.string(),
		amount: isly.number(),
	})
}
