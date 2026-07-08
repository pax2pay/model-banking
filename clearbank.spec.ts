import { pax2pay } from "./index"

// cSpell:disable
describe("clearbank retained inactive", () => {
	it("stays a valid Supplier enum value", () => {
		expect(pax2pay.Supplier.type.is("clearbank")).toEqual(true)
	})
	it("is absent from the active supplier lists", () => {
		expect(pax2pay.Realm.suppliers.uk).not.toContain("clearbank")
		expect(pax2pay.Supplier.realm.uk).not.toContain("clearbank")
		expect(pax2pay.Supplier.currencies.uk.clearbank).toBeUndefined()
	})
	it("is flagged as decommissioned", () => {
		expect(pax2pay.Supplier.isDecommissioned("clearbank")).toEqual(true)
		expect(pax2pay.Supplier.isDecommissioned("bankingcircle")).toEqual(false)
		expect(pax2pay.Supplier.decommissioned).toContain("clearbank")
	})
	it("historical Transaction still deserializes", () => {
		const transaction: pax2pay.Transaction = {
			account: { type: "internal", identifier: "6gpfb4Bf" },
			accountId: "6gpfb4Bf",
			amount: { original: -1, charge: 0, total: -1 },
			balance: { actual: 100, reserved: 50, available: 50 },
			counterpart: { identifier: "ENycgXna", type: "internal" },
			currency: "GBP",
			description: "test",
			id: "V1uV3dB8",
			flags: [],
			oldFlags: [],
			notes: [],
			operations: [
				{
					transaction: "V1uV3dB8",
					created: "2023-03-17T12:26:10.575Z",
					currency: "GBP",
					changes: {
						available: { amount: 1, result: 6993, status: "success", type: "subtract" },
					},
					type: "finalizeOutgoing",
					counter: 1,
					account: "12230000",
				},
			],
			organization: "RBhssR36",
			posted: "2023-03-17T12:26:10.575Z",
			status: "finalized",
			rail: "fasterpayments",
			transacted: "2023-03-17T12:27:08.624Z",
			reference: { supplier: "clearbank", reference: "LghIz_9W", endToEndId: "LghIz_9W" },
		}
		expect(pax2pay.Transaction.type.is(transaction)).toEqual(true)
	})
	it("historical Treasury.Snapshot still carries the supplier", () => {
		const snapshot: pax2pay.Treasury.Snapshot = {
			version: 2,
			emoney: { accounts: [] },
			created: "2023-03-17T12:26:10.575Z",
			currency: "GBP",
			supplier: "clearbank",
			fiat: { total: 0, accounts: [] },
			notes: [],
			checks: [],
			result: "passed",
		}
		expect(pax2pay.Supplier.type.is(snapshot.supplier)).toEqual(true)
	})
	it("historical Audit entry still deserializes", () => {
		const audit: pax2pay.Audit = {
			id: "abcdefgh",
			created: "2023-03-17T12:26:10.575Z",
			by: "system",
			messages: [],
			resource: { type: "clearbank", action: "assessmentFailed" },
		}
		expect(pax2pay.Audit.Resource.type.is(audit.resource.type)).toEqual(true)
	})
})
