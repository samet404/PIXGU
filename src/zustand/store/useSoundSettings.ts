import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persistNSync } from "persist-and-sync";

const initState: State = {
    music: false,
    sfx: true,
    musicSoundLevel: '50',
    sfxSoundLevel: '1',
    musicLinks: ['HMjQygwPI1c', 'mmCnQDUSO4I']
}

export const useSoundSettings = create<State & Action>()(
    subscribeWithSelector(
        persistNSync<State & Action>(
            (set, get) => ({
                ...initState,
                setSfxSoundLevel: (level) => {
                    set({
                        ...get(),
                        sfxSoundLevel: level
                    })
                },
                setMusicSoundLevel: (level) => {
                    set({
                        ...get(),
                        musicSoundLevel: level
                    })
                },
                toggleMusic: async () => {
                    const useTabs = (await import('@/zustand/store')).useTabs
                    const tabID = useTabs.getState().tabID
                    useTabs.getState().setMusicPlayerTabID(tabID)

                    set({
                        ...get(),
                        music: !get().music
                    })
                },
                toggleSfx: () => {
                    set({
                        ...get(),
                        sfx: !get().sfx
                    })
                },

                addMusicLink: (link) => {
                    set({
                        ...get(),
                        musicLinks: [...get().musicLinks, link]
                    })
                },
                removeMusicLink: (link) => {
                    set({
                        ...get(),
                        musicLinks: get().musicLinks.filter((l) => l !== link)
                    })
                }
            }),
            { name: 'sounds' },
        ),
    ),
)

type State = {
    music: boolean
    musicSoundLevel: string
    sfx: boolean
    sfxSoundLevel: string
    musicLinks: string[]
}

type Action = {
    setSfxSoundLevel: (level: string) => void
    setMusicSoundLevel: (level: string) => void
    toggleMusic: () => void
    toggleSfx: () => void
    addMusicLink: (link: string) => void
    removeMusicLink: (link: string) => void
}

