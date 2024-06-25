export const setNextOrCurrentPainterIfLeaves = (
  painterID: string,
  paintersOrder: PaintersOrder,
  nextPainter: NextPainter,
  currentPainter: CurrentPainter,
) => {
  const nextPainterVal = nextPainter.value
  const currentPainterVal = currentPainter.value

  if (painterID !== nextPainterVal && painterID !== currentPainterVal)
    return null

  const paintersOrderVal = paintersOrder.value

  const currentPainterIndex = paintersOrder.value!.findIndex(
    (i) => i === currentPainterVal,
  )

  if (currentPainterVal === painterID) {
    const nextPainterIndex = currentPainterIndex + 1

    if (painte) nextPainter.value = paintersOrderVal![nextPainterIndex]
  }
}

type PaintersOrder = {
  value?: string[]
}

type NextPainter = {
  value?: string
}

type CurrentPainter = {
  value?: string
}
