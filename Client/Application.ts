import { gracely } from "gracely"
import { isoly } from "isoly"
import { userwidgets } from "@userwidgets/model"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"

export interface EntityTags {
	application: Record<string, isoly.DateTime | undefined>
	organization: Record<string, isoly.DateTime | undefined>
	user: Record<string, isoly.DateTime | undefined>
}

export class Application extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags) {
		super(client)
	}
	async create(application: userwidgets.Application.Creatable): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.post<userwidgets.Application>("/widgets/application", application)
		!gracely.Error.is(result) && (this.entityTags.application[result.id] = isoly.DateTime.now())
		return result
	}
	async fetch(): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.get<userwidgets.Application>(`/widgets/application`)
		!gracely.Error.is(result) && (this.entityTags.application[result.id] = isoly.DateTime.now())
		return result
	}
}
