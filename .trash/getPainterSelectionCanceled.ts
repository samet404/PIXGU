import type { PainterSelectionCanceled } from '@/types/webRTCConnData'

export const getPainterSelectionCanceled = (
  data: PainterSelectionCanceled['data'],
) => {
  usePainterThemeSelection.getState().set({
    status: null,
  })
}
