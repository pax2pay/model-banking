export type Charge = Record<
	string,
	{
		destination: { account: string }
		percentage: number
		fixed: number
		restricted: {
			to: {
				merchants: string[]
			}
		}
	}[]
>
