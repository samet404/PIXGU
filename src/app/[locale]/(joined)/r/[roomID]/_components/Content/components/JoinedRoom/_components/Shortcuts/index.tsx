"use client"

import { UseShortcut } from '@/components/UseShortcut'
import { toolsHaveSizeProperty, useGameToolAlert, usePainterTool, type ToolHaveSizeProperty } from '@/zustand/store'
import { Fragment } from 'react'

export const Shortcuts = () => {
    const setTool = usePainterTool((s) => s.setCurrent)
    const setToolAlert = useGameToolAlert((s) => s.setAlert)
    const switchGrid = usePainterTool((s) => s.switchGrid)

    return (
        <Fragment>
            <UseShortcut keyName='Pencil' onShortcut={() => {
                setTool('pencil')
                setToolAlert('Pencil selected')
            }} />

            <UseShortcut keyName='Bucket' onShortcut={() => {
                setTool('bucket')
                setToolAlert('Bucket selected')
            }} />

            <UseShortcut keyName='Eyedropper' onShortcut={() => {
                setTool('eyedropper')
                setToolAlert('Eye dropper selected')
            }} />

            <UseShortcut keyName='Eraser' onShortcut={() => {
                setTool('eraser')
                setToolAlert('Eraser selected')
            }} />

            <UseShortcut keyName='Grid' onShortcut={() => {
                switchGrid()
                setToolAlert('Grid selected')
            }} />

            <UseShortcut keyName='Decrease tool size' onShortcut={() => {
                const current = usePainterTool.getState().current
                if (toolsHaveSizeProperty.includes(current)) {
                    usePainterTool.getState().decreaseSize(current as ToolHaveSizeProperty)
                    setToolAlert(`Tool size: ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
                }
            }} />

            <UseShortcut keyName='Increase tool size' onShortcut={() => {
                const current = usePainterTool.getState().current
                if (toolsHaveSizeProperty.includes(current)) {
                    usePainterTool.getState().increaseSize(current as ToolHaveSizeProperty)
                    setToolAlert(`Tool size: ${usePainterTool.getState().options[current as ToolHaveSizeProperty].size}`)
                }
            }} />



        </Fragment>
    )
}