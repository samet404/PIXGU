"use client"

import { usePowerups } from '@/zustand/store'
import { Card } from './components/Card'
import type { LangObj } from '../../../lang'
import type { Powerup } from '@/types/powerups'
import { calculateCardPositions } from './funcs/calculatePositions'


export const CardContent = ({ langObj }: Props) => {
    const visibleCards = usePowerups((s) => s.activePowerups)
    const setPowerupInActive = usePowerups((s) => s.setPowerupInActive)

    return visibleCards.map((powerup: Powerup) => {
        const { description, title } = langObj[powerup as Powerup]
        const position = calculateCardPositions(powerup, visibleCards)
        if (!position) return null

        return (
            <Card
                key={powerup}
                title={title}
                description={description}
                rotation={position.rotation}
                addTranslateX={position.translateX}
                addTranslateY={position.translateY}
                onRemove={() => setPowerupInActive(powerup)}
            />
        )
    })


}

type Props = {
    langObj: LangObj
}