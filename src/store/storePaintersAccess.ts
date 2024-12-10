
export const storePaintersAccess: Actions & State = {
    value: {
        counts: {},
        paintersToBeSelected: [],
    },

    initUsers: function (users) {
        this.value.paintersToBeSelected = users
    },
    selectedAsPainter: function (userID, painterAccessCountPerUser) {
        this.value.counts[userID] = (this.value.counts[userID] ?? 0) + 1
        if (this.value.counts[userID] === painterAccessCountPerUser) this.value.paintersToBeSelected = this.value.paintersToBeSelected.filter(p => p !== userID)
    },
    removePlayerFromPaintersToBeSelected: function (userID, painterAccessCountPerUser) {
        const remainPainterAccessCount = painterAccessCountPerUser - (this.value.counts[userID] ?? 0)

        this.value.paintersToBeSelected = this.value.paintersToBeSelected.filter(p => p !== userID)
        delete this.value.counts[userID]

        return remainPainterAccessCount
    },
    reset: function () {
        this.value = {
            counts: {},
            paintersToBeSelected: [],
        }
    }
}

type State = {
    value: {
        counts: Record<string, number>
        paintersToBeSelected: string[]
    }
}

type Actions = {
    selectedAsPainter: (userID: string, painterAccessCountPerUser: number) => void
    initUsers: (users: string[]) => void
    removePlayerFromPaintersToBeSelected: (userID: string, painterAccessCountPerUser: number) => number
    reset: () => void
}