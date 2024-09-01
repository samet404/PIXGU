export const getYouGuessed = async () => {
  const { useAmIGuessed, useWinnersChatLayout, useGuessChatLayout } =
    await import('@/zustand/store')

  useAmIGuessed.getState().iGuessed()
  useWinnersChatLayout.getState().setIGuessed()
  useGuessChatLayout.getState().setIGuessed()
}
