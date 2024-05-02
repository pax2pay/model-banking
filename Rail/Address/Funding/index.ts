import { Base } from "./Base"
import { Paxgiro as FundingPaxgiro } from "./Paxgiro"

export type Funding = Funding.Paxgiro

export namespace Funding {
	export import Source = Base.Source
	export type Paxgiro = FundingPaxgiro
}
