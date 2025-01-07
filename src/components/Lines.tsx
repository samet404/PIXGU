// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react'

export const NeonLines = () => {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(true)
    const initialDelayRef = useRef(true)

    const CANVAS_WIDTH = 320
    const CANVAS_HEIGHT = 180
    const config = {
        pixelSize: 3,
        lineWeight: 2,
        baseSpeed: 0.0002,
        maxLineLength: 10000,
        minLineLength: 5000,
        pauseChance: 1,
        pauseDuration: [0, 0],
        colors: [
            '#19434b',
        ],
        controlPoints: 6, // Increased for more curves
        mistakeChance: 0.1,
    }

    const drawingState = useRef({
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        pixelsDrawn: 0,
        currentColor: config.colors[0],
        paused: false,
        controlPoints: [],
        currentT: 0,
        makingMistake: false,
        mistakePoints: [],
        isRoundLine: false
    })

    const getRandomPoint = () => {
        const preferEdge = Math.random() < 0.7
        let x, y

        if (preferEdge) {
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 : CANVAS_WIDTH
                y = Math.random() * CANVAS_HEIGHT
            } else {
                x = Math.random() * CANVAS_WIDTH
                y = Math.random() < 0.5 ? 0 : CANVAS_HEIGHT
            }
        } else {
            x = Math.random() * CANVAS_WIDTH
            y = Math.random() * CANVAS_HEIGHT
        }

        return { x, y }
    }

    const generateMistakePoints = (startX: number, startY: number) => {
        const points = [{ x: startX, y: startY }]
        const mistakeLength = Math.random() * 30 + 20

        for (let i = 0; i < 3; i++) {
            points.push({
                x: startX + (Math.random() - 0.5) * mistakeLength,
                y: startY + (Math.random() - 0.5) * mistakeLength
            })
        }

        points.push({ x: startX, y: startY })
        return points
    }

    const generateControlPoints = (startX: number, startY: number, endX: number, endY: number) => {
        const points = [{ x: startX, y: startY }]
        const dx = endX - startX
        const dy = endY - startY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const curveMagnitude = dist * 0.5 // Increased curve magnitude

        for (let i = 1; i <= config.controlPoints; i++) {
            const t = i / (config.controlPoints + 1)
            points.push({
                x: startX + dx * t + (Math.random() - 0.5) * curveMagnitude,
                y: startY + dy * t + (Math.random() - 0.5) * curveMagnitude
            })
        }

        points.push({ x: endX, y: endY })
        return points
    }

    const generateCirclePoints = () => {
        const points = []
        const centerX = CANVAS_WIDTH / 2 + (Math.random() - 0.5) * CANVAS_WIDTH * 0.5
        const centerY = CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * CANVAS_HEIGHT * 0.5
        const radius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.2

        for (let i = 0; i <= config.controlPoints; i++) {
            const angle = (i / config.controlPoints) * Math.PI * 2
            points.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            })
        }

        return points
    }

    const generateNewLine = () => {
        const state = drawingState.current

        // 30% chance for a circle
        if (Math.random() < 0.3) {
            state.controlPoints = generateCirclePoints()
            state.currentX = state.controlPoints[0].x
            state.currentY = state.controlPoints[0].y
            state.targetX = state.controlPoints[state.controlPoints.length - 1].x
            state.targetY = state.controlPoints[state.controlPoints.length - 1].y
        } else {
            let attempts = 0
            let start, end, length

            do {
                start = getRandomPoint()
                end = getRandomPoint()
                const dx = end.x - start.x
                const dy = end.y - start.y
                length = Math.sqrt(dx * dx + dy * dy)
                attempts++
            } while (length < config.minLineLength && attempts < 10)

            state.currentX = start.x
            state.currentY = start.y
            state.targetX = end.x
            state.targetY = end.y

            state.makingMistake = Math.random() < config.mistakeChance
            if (state.makingMistake) {
                state.mistakePoints = generateMistakePoints(state.currentX, state.currentY)
                state.controlPoints = state.mistakePoints
            } else {
                state.controlPoints = generateControlPoints(
                    state.currentX,
                    state.currentY,
                    state.targetX,
                    state.targetY
                )
            }
        }

        state.currentT = 0
        state.pixelsDrawn = 0
        state.currentColor = config.colors[Math.floor(Math.random() * config.colors.length)]
    }

    const getBezierPoint = (t, points) => {
        if (points.length === 1) return points[0]

        const nextPoints = []
        for (let i = 0; i < points.length - 1; i++) {
            nextPoints.push({
                x: points[i].x * (1 - t) + points[i + 1].x * t,
                y: points[i].y * (1 - t) + points[i + 1].y * t
            })
        }

        return getBezierPoint(t, nextPoints)
    }

    const drawPixel = (ctx, x, y, color) => {
        const pixelSize = config.pixelSize
        const roundedX = Math.floor(x / pixelSize) * pixelSize
        const roundedY = Math.floor(y / pixelSize) * pixelSize

        ctx.fillStyle = color
        ctx.fillRect(
            roundedX,
            roundedY,
            pixelSize * config.lineWeight,
            pixelSize * config.lineWeight
        )
    }

    const animate = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', { alpha: true })
        const state = drawingState.current

        if (initialDelayRef.current) {
            animationRef.current = requestAnimationFrame(animate)
            return
        }

        if (state.paused) {
            if (Date.now() > state.pauseUntil) {
                state.paused = false
                generateNewLine()
            }
            animationRef.current = requestAnimationFrame(animate)
            return
        }

        for (let i = 0; i < 5; i++) {
            if (state.currentT >= 1 || state.pixelsDrawn >= config.maxLineLength) {
                state.paused = true
                state.pauseUntil = Date.now() + config.pauseDuration[0]
                break
            }

            const point = getBezierPoint(state.currentT, state.controlPoints)

            drawPixel(
                ctx,
                point.x,
                point.y,
                state.currentColor
            )

            state.currentT += config.baseSpeed
            state.pixelsDrawn++
        }

        if (isDrawing) {
            animationRef.current = requestAnimationFrame(animate)
        }
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsDrawing(!document.hidden)
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', { alpha: true })

        canvas.width = CANVAS_WIDTH
        canvas.height = CANVAS_HEIGHT

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        generateNewLine()
        animate()

        // Start 10 second delay
        setTimeout(() => {
            initialDelayRef.current = false
        }, 10000)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                imageRendering: 'pixelated'
            }}
        />
    )
}