'use client'

import { useEffect, useRef, useState } from 'react'
import { drawNode, drawConnections } from '@/utils/tree'

export const TreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const drawTree = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Сохраняем контекст для трансформаций
    ctx.save()

    // Центрируем дерево в canvas + смещение от перетаскивания
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    ctx.translate(centerX + offset.x, centerY + offset.y)

    // Рисуем дерево
    drawNode(ctx, 0, -100, '+7(123)456-78-90', '#4caf50')
    drawNode(ctx, -100, -20, '+7(987)654-32-10', '#2196f3')
    drawNode(ctx, 100, -20, '+7(555)123-45-67', '#2196f3')
    drawNode(ctx, -150, 60, '+7(111)222-33-44', '#757575')

    // Рисуем связи
    drawConnections(ctx)

    ctx.restore()
  }

  useEffect(() => {
    drawTree()
  }, [offset])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        setOffset(prev => ({
          x: prev.x + mouseX - dragStart.x,
          y: prev.y + mouseY - dragStart.y
        }))

        setDragStart({ x: mouseX, y: mouseY })
      }
      e.preventDefault()
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="h-full overflow-auto flex justify-center items-center p-2 bg-white">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="border border-gray-300 cursor-move bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}