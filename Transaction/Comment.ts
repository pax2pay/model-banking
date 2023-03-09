export interface Comment {
	body: string
	author: string
	approve?: boolean
}

export namespace Comment {
	export function is(value: Comment | any): value is Comment {
		return true
	}
}
