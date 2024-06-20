import { pax2pay } from "../index"

describe("Reworking incoming logs to processable logs", () => {
	it("Reworking incoming logs to processable logs", () => {
		const log = pax2pay.Log.fromEvents(events as any)
		expect(log).toMatchInlineSnapshot(`
[
  {
    "collection": "card",
    "created": "2024-06-19T14:00:17.264Z",
    "entries": [
      {
        "data": {
          "account": "6AEY3VzL",
          "details": {
            "expiry": [
              24,
              12,
            ],
            "holder": "Pax2pay",
          },
          "limit": [
            "GBP",
            925,
          ],
          "preset": "test-pg-200",
          "realm": "test",
        },
        "message": "Request body",
      },
      {
        "data": {
          "account": "6AEY3VzL",
          "created": "2024-06-19T14:00:18.241Z",
          "details": {
            "expiry": [
              24,
              12,
            ],
            "holder": "Pax2pay",
            "iin": "111111",
            "last4": "4510",
            "token": "1111114510/16/1224/1400/jyPy5TG61u0ntPSu0ncgfk_TFPheEGY57LFpsE4AEIgoP19z/RIlC_Uw2EaWmOlu6VVn1Gw",
          },
          "history": [
            {
              "created": "2024-06-19T14:00:18.241Z",
              "status": "created",
              "type": "card",
            },
          ],
          "id": "zzzyQwwndBzqyTzO",
          "limit": [
            "GBP",
            925,
          ],
          "organization": "iIynYFfd",
          "preset": "test-pg-200",
          "realm": "test",
          "reference": "zzzyQwwndBzqyTzO",
          "rules": [],
          "scheme": "mastercard",
          "spent": [
            "GBP",
            0,
          ],
          "status": "active",
        },
        "message": "Card Create Result",
      },
    ],
    "id": "${log[0].id}",
    "realm": "test",
    "resource": "abcd1234",
    "script": "worker-banking-card",
  },
]
`)
	})
})
const events = [
	{
		scriptName: "worker-banking-card",
		logs: [
			{
				message: [{ collection: "card", realm: "test" }],
				level: "log",
				timestamp: 1718805617276,
			},
			{
				message: [
					{
						message: "Request body",
						data: {
							account: "6AEY3VzL",
							realm: "test",
							details: { expiry: [24, 12], holder: "Pax2pay" },
							limit: ["GBP", 925],
							preset: "test-pg-200",
						},
					},
				],
				level: "log",
				timestamp: 1718805617276,
			},
			{
				message: ["Belongn't"],
				level: "log",
				timestamp: 1718805618241,
			},
			{
				message: [
					{
						message: "Card Create Result",
						resource: "abcd1234",
						data: {
							account: "6AEY3VzL",
							scheme: "mastercard",
							organization: "iIynYFfd",
							realm: "test",
							created: "2024-06-19T14:00:18.241Z",
							details: {
								expiry: [24, 12],
								holder: "Pax2pay",
								iin: "111111",
								token:
									"1111114510/16/1224/1400/jyPy5TG61u0ntPSu0ncgfk_TFPheEGY57LFpsE4AEIgoP19z/RIlC_Uw2EaWmOlu6VVn1Gw",
								last4: "4510",
							},
							history: [{ type: "card", status: "created", created: "2024-06-19T14:00:18.241Z" }],
							id: "zzzyQwwndBzqyTzO",
							limit: ["GBP", 925],
							preset: "test-pg-200",
							reference: "zzzyQwwndBzqyTzO",
							rules: [],
							spent: ["GBP", 0],
							status: "active",
						},
					},
				],
				level: "log",
				timestamp: 1718805618912,
			},
		],
		eventTimestamp: 1718805617264,
	},
]
