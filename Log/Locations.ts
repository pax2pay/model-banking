import { isly } from "isly"

export interface Locations {
	"cf-connecting-ip": string
	"cf-ipcountry": string
	datacenter: string
	country: string
}
export namespace Locations {
	export const type = isly.object<Locations>({
		"cf-connecting-ip": isly.string(),
		"cf-ipcountry": isly.string(),
		datacenter: isly.string(),
		country: isly.string(),
	})
}
