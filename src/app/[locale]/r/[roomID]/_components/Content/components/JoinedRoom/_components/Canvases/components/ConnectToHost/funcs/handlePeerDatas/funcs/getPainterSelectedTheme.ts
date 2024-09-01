export const getPainterSelectedTheme = async () =>
  (await import('@/zustand/store')).useNewPainterPanel.getState().close()
