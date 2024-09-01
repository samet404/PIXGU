export const getPainterSelectingTheme = async () =>
  (await import('@/zustand/store')).useNewPainterPanel
    .getState()
    .setSelectingTheme()
