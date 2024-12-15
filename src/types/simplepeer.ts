import * as stream from "stream"

declare namespace SimplePeer {
    interface Instance extends stream.Duplex {
        getStats: (cb: (err: Error | null, report: any[]) => void) => void
    }
}