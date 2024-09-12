import { Filter } from "cloudly-analytics-administration"
import { filter, listener } from "cloudly-analytics-common"
import { pax2pay } from "../../index"

describe("Analytics transactions mapping", () => {
	it("Configuration is checks", () => {
		expect(filter.Mapping.RecordWithSelector.type.is(pax2pay.Analytics.Configuration.Transaction.mapping)).toBe(true)
		expect(listener.BigQueryApi.BaseField.type.array().is(pax2pay.Analytics.Configuration.Transaction.schema)).toBe(
			true
		)
	})
	it("Mapping", () => {
		const mapper = Filter.create<filter.Mapping>({
			type: "mapping",
			mapping: {
				...pax2pay.Analytics.Configuration.Base.mapping,
				...pax2pay.Analytics.Configuration.Transaction.mapping,
			},
		})
		expect(mapper.filter(transaction)).toEqual(result)
	})
})
const transaction: pax2pay.Analytics.Event.Ledger.Transaction = {
	realm: "test",
	entityType: "transaction",
	entity: "zzzyRwIvXovdzVNA",
	action: "created",
	created: "2023-12-05T17:26:36.977Z",
	value: {
		amount: -10,
		counterpart: {
			type: "internal",
			identifier: "IkToJ5Ep",
		},
		currency: "GBP",
		description: "Collect fee_test-paxgiro_202333303.",
		organization: "paxair",
		accountId: "3Lb41MlP",
		account: {
			type: "internal",
			identifier: "3Lb41MlP",
		},
		id: "zzzyRwIvXovdzVNA",
		type: "internal",
		direction: "outbound",
		posted: "2023-12-05T17:26:36.977Z",
		balance: {
			actual: 420,
			reserved: 420,
			available: 420,
		},
		operations: [
			{
				account: "3Lb41MlP",
				currency: "GBP",
				type: "collect",
				changes: {
					"fee_test-paxgiro_202333303": {
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
		],
		status: "review",
		rail: "paxgiro",
		flags: ["dannebrogen", "union-jack"],
		oldFlags: ["sssr"],
		notes: [],
	},
}
const result = {
	accountAddress: '{"type":"internal","identifier":"3Lb41MlP"}',
	account: "3Lb41MlP",
	accountType: "internal",
	action: "created",
	actualBalance: "420",
	amount: "-10",
	availableBalance: "420",
	counterpart: '{"type":"internal","identifier":"IkToJ5Ep"}',
	counterpartType: "internal",
	created: "2023-12-05T17:26:36.977Z",
	currency: "GBP",
	description: "Collect fee_test-paxgiro_202333303.",
	direction: "outbound",
	entityType: "transaction",
	entity: "zzzyRwIvXovdzVNA",
	flags: ["dannebrogen", "union-jack"],
	id: "zzzyRwIvXovdzVNA",
	notes: "[]",
	oldFlags: ["sssr"],
	operations: [
		{
			account: "3Lb41MlP",
			changes: [
				{
					key: "fee_test-paxgiro_202333303",
					value: {
						amount: "10",
						result: "0",
						status: "success",
						type: "subtract",
					},
				},
			],
			counter: "0",
			created: "2023-12-05T17:26:36.977Z",
			currency: "GBP",
			transaction: "zzzyRwIvXovdzVNA",
			type: "collect",
		},
	],
	organization: "paxair",
	posted: "2023-12-05T17:26:36.977Z",
	rail: "paxgiro",
	realm: "test",
	reservedBalance: "420",
	status: "review",
	type: "internal",
}
