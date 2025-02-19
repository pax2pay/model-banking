import { http } from "cloudly-http"
import { Tpl } from "./Tpl"

export class Processor {
	readonly tpl: Tpl
	constructor(private readonly client: http.Client) {
		this.tpl = new Tpl(this.client)
	}
}
