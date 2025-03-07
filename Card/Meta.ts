type Value = Meta | Value[] | undefined | number | string | boolean
export interface Meta {
	[key: string]: Value
}

export namespace Meta {
	export function is(value: any | Meta): value is Meta {
		return (
			value === null ||
			(typeof value == "object" && Object.values(value).every(Meta.is)) ||
			(Array.isArray(value) && value.every(Meta.is)) ||
			value == undefined ||
			typeof value == "number" ||
			typeof value == "string" ||
			typeof value == "boolean"
		)
	}
}
