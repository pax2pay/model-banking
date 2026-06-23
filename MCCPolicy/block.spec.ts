import { pax2pay } from "../index"

describe("global block list", () => {
	it.each(Array.from({ length: 10000 }).map((_, i) => i.toString().padStart(4, "0")))("block %s", (mcc: string) => {
		const state: pax2pay.Rule.State = {
			account: {
				id: "9-MPCCcM",
				name: "primary test",
				type: "emoney",
				rails: [
					{ iban: "ZZ00PXGR11111102970707", type: "iban", holder: "Developer Test" },
					{ sort: "111111", type: "scan", holder: "Developer Test", account: "02970707" },
					{ type: "paxgiro", identifier: "AHXgaa9c" },
				],
				rules: [],
				status: {
					mode: "active",
				},
				address: {
					id: "zzzyNJZsscYQ47xm",
					iin: "111111",
					type: "card",
					last4: "4032",
					expiry: [29, 12],
					holder: "Pax2pay",
					scheme: "mastercard",
				},
				created: "2023-08-23T08:24:56.047Z",
				details: {
					supplier: "paxgiro",
					addresses: [
						{ iban: "ZZ00PXGR11111102970707", type: "iban", holder: "Developer Test" },
						{ sort: "111111", type: "scan", holder: "Developer Test", account: "02970707" },
						{ type: "paxgiro", identifier: "AHXgaa9c" },
					],
					reference: "9-MPCCcM",
					currencies: ["GBP", "SEK", "USD", "EUR"],
				},
				balances: {
					GBP: {
						actual: 259,
						reserved: {
							buffer: 1,
							incoming: 0,
							outgoing: 102,
						},
						available: 156,
						bufferReserved: 1,
						incomingReserved: 0,
						outgoingReserved: 102,
					},
				},
				counterparts: {},
				organization: "6OSoVdty",
			},
			transaction: {
				id: "tr_yNFlMLVAPsXxb",
				kind: "authorization",
				type: "card",
				stage: "initiate",
				amount: 1,
				account: {
					id: "zzzyNJZsscYQ47xm",
					type: "card",
				},
				currency: "GBP",
				original: {
					total: 1,
					amount: 1,
					currency: "GBP",
				},
				accountId: "9-MPCCcM",
				reference: {
					reference: "zzzyNJZsscYQ47xm9-MPCCcM",
				},
				counterpart: {
					type: "card",
					acquirer: {
						id: "2345erty",
						number: "1351858913568",
						country: "GB" as any,
					},
					merchant: {
						id: "abcd1234",
						zip: "12345",
						city: "towncity",
						name: "Merchant1",
						address: "Streetname 1, 12345 Towncity",
						country: "UK" as any,
						category: mcc,
					},
				},
				description: "Insomnia",
			},
			authorization: {
				card: "zzzyNJZsscYQ47xm",
				hour: 8,
				time: "08:46:16.573Z",
				amount: 1,
				account: "9-MPCCcM",
				acquirer: {
					id: "2345erty",
					number: "1351858913568",
					country: "GB" as any,
				},
				currency: "GBP",
				merchant: {
					id: "abcd1234",
					zip: "12345",
					city: "towncity",
					name: "Merchant1",
					address: "Streetname 1, 12345 Towncity",
					country: "UK" as any,
					category: mcc,
					reference: "2345erty-abcd1234",
				},
				reference: "zzzyNJZsscYQ47xm9-MPCCcM",
				description: "Insomnia",
			},
			card: {
				id: "zzzyNJZsscYQ47xm",
				age: {
					days: 42558,
					minutes: 61284773,
				},
				used: {
					count: 0,
					amount: 0,
					merchants: [],
				},
				limit: 30,
				realm: "test",
				rules: [],
				spent: ["GBP", 3],
				preset: "test-ta-pg-200",
				reject: {
					count: 0,
				},
				scheme: "mastercard",
				status: "active",
				account: "9-MPCCcM",
				created: "2026-06-11T13:02:43.680Z",
				details: {
					iin: "111111",
					last4: "4032",
					token: "1111114032/16/1229/1302/VgCxBVaGprtrrxk6n8DWRhlKY2nbU4e-EK1NSWLtmPXtBW6E/xa0nh4UK4xmbZs70ljP0-w",
					expiry: [29, 12],
					holder: "Pax2pay",
				},
				history: [],
				original: {
					limit: 30,
					currency: "GBP",
				},
				reference: "zzzyNJZsscYQ47xm9-MPCCcM",
				organization: "6OSoVdty",
			},
			organization: {
				code: "6OSoVdty",
				name: "Developer Test",
				risk: "low",
				type: "emoney",
				realm: "test",
				rules: [],
				groups: [],
				status: "active",
				contact: {
					name: {
						last: "test",
						first: "test",
					},
					email: "test@testing.test",
					phone: {
						code: "+1",
						number: "12345679",
					},
					owners: [
						{
							last: "qwer",
							first: "asdf",
						},
					],
					address: {
						primary: {
							city: "Test City",
							street: "test st. 42",
							zipCode: "123454",
							building: "GB",
							countryCode: "GB",
						},
					},
				},
			},
		}
		const ruleResult = pax2pay.Rule.evaluate([blockRule], state)
		const [policyResult] = pax2pay.MCCPolicy.resolve([allow], {
			category: mcc,
			org: state.organization?.code,
			cardPreset: state.card?.preset,
		})
		onTestFailed(() => {
			console.log("mcc", mcc, "policyResult", policyResult?.action, "ruleResult", ruleResult.outcome)
			failedMccs.push({ mcc, ruleOutcome: ruleResult.outcome, policy: policyResult })
		})
		if (policyResult) {
			expect(ruleResult.outcome).toEqual(policyResult.action == "allow" ? "approve" : "reject")
		} else {
			expect(ruleResult.outcome).toEqual("reject")
		}
	})
	afterAll(() => {
		console.log("failedMccs", failedMccs)
	})
})

const failedMccs: { mcc: string; policy?: pax2pay.MCCPolicy; ruleOutcome?: string }[] = []
const blockRule: pax2pay.Rule = {
	name: "mcc allow list",
	code: "mcc-allow-list",
	description: "Only allow travel MCCs.",
	condition:
		"!(authorization.merchant.category:within(3301,3308,4011,4111,4112,4121,4131,4411,4511,4582,4722,4789,5045,5499,5732,5734,5812,5813,5816,5941,5962,5969,6300,6513,7011,7012,7033,7221,7230,7298,7311,7372,7392,7394,7399,7512,7513,7519,7523,7832,7922,7941,7991,7992,7996,7997,7999,8220,8398,9311,9399,4468,8641,8699,5811,5561,5309,5818)) !(authorization.merchant.category>=3000 authorization.merchant.category<=3299) !(authorization.merchant.category>=3351 authorization.merchant.category<=3999)",
	type: "authorization",
	flags: ["category", "merchant"],
	category: "product",
	action: "reject",
}

const allow: pax2pay.MCCPolicy = {
	id: "iFxgb6vL",
	realm: "test",
	action: "allow",
	name: "Global Allow List",
	group: {
		ranges: [
			{
				to: "3299",
				from: "3000",
			},
			{
				to: "3999",
				from: "3351",
			},
		],
		values: [
			"3301",
			"3308",
			"4011",
			"4111",
			"4112",
			"4121",
			"4131",
			"4411",
			"4468",
			"4511",
			"4582",
			"4722",
			"4789",
			"5045",
			"5309",
			"5499",
			"5561",
			"5732",
			"5734",
			"5811",
			"5812",
			"5813",
			"5816",
			"5818",
			"5941",
			"5962",
			"5969",
			"6300",
			"6513",
			"7011",
			"7012",
			"7033",
			"7221",
			"7230",
			"7298",
			"7311",
			"7372",
			"7392",
			"7394",
			"7399",
			"7512",
			"7513",
			"7519",
			"7523",
			"7832",
			"7922",
			"7941",
			"7991",
			"7992",
			"7996",
			"7997",
			"7999",
			"8220",
			"8398",
			"8641",
			"8699",
			"9311",
			"9399",
		],
	},
	created: "2026-06-15T12:44:34.147Z",
	updated: "2026-06-15T12:44:34.147Z",
}
