import { Filter } from "cloudly-analytics-administration"
import { pax2pay } from "../../index"

describe("Analytics operations mapping", () => {
	it("Configuration is checks", () => {
		expect(pax2pay.Analytics.Configuration.Mapping.type.is(pax2pay.Analytics.Configuration.Operation.mapping)).toBe(
			true
		)
		expect(pax2pay.Analytics.Configuration.Schema.type.is(pax2pay.Analytics.Configuration.Operation.schema)).toBe(true)
	})
	it("Mapping", () => {
		const mapper = Filter.create<Filter.Mapping>({
			type: "mapping",
			mapping: {
				...pax2pay.Analytics.Configuration.Base.mapping,
				...pax2pay.Analytics.Configuration.Operation.mapping,
			},
		})
		expect(mapper.filter(operation)).toEqual(result)
	})
})
const operation: pax2pay.Analytics.Event.Operation = {
	realm: "test",
	entity: { type: "operation", id: "" },
	action: "created",
	created: "2023-12-05T17:26:36.977Z",
	value: {
		account: "3Lb41MlP",
		currency: "GBP",
		type: "collect",
		changes: {
			"internal-safe01-2024-03-04T15Z": {
				type: "subtract",
				amount: 10,
				status: "success",
				result: 0,
			},
		},
		transaction: "zzzyRwIvXovdzVNA",
		counter: 0,
		created: "2023-12-05T17:26:36.977Z",
	},
}
const result = {
	account: "3Lb41MlP",
	action: "created",
	changes: [
		{
			key: "internal-safe01-2024-03-04T15Z",
			value: {
				amount: 10,
				result: 0,
				status: "success",
				type: "subtract",
			},
		},
	],
	counter: 0,
	created: "2023-12-05T17:26:36.977Z",
	currency: "GBP",
	entity: "operation",
	entityId: "",
	operationCreated: "2023-12-05T17:26:36.977Z",
	realm: "test",
	transaction: "zzzyRwIvXovdzVNA",
	type: "collect",
}
