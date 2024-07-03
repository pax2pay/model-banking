import { Configuration as AnalyticsConfiguration } from "./Configuration"
import { Event as AnalyticsEvent } from "./Event"

export namespace Analytics {
	export import Event = AnalyticsEvent
	export import Configuration = AnalyticsConfiguration
}

// /**
//  * It is possible to set default values for analytics:
//  *
//  * Both properties in Event and in AnalyticsExtra can be used.
//  * This needs to satisfies Partial<Event & AnalyticsExtra>, but not be declared as that.
//  * Do not use `as` or declare the const as Partial<Event & AnalyticsExtra>.
//  * If satisfies isn't possible to use (eg old typescript version or es-lint parsing error etc)
//  * remove type-declaration.
//  *
//  * This is because the actual  type of this object will effect the type of
//  * the event-parameter for `Analytics.send(event)`
//  */
// //eslint-disable-next-line
// export const analyticsDefault = { version: data.version, source: "pax2pay-worker-banking-ledger", } satisfies Partial<types.Event & AnalyticsExtra>;
