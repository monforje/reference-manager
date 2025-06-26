'use client'

import { useState, useRef } from 'react'

interface DropZoneProps {
  onFileUpload: (file: File) => void;
}

export const DropZone = ({ onFileUpload }: DropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed p-8 text-center bg-gray-50 cursor-pointer transition-colors
        ${isDragOver 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-300 hover:bg-blue-50 hover:border-blue-500'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="text-2xl mb-2 text-gray-500">📄</div>
      <p className="text-gray-500 text-sm">
        Перетащите файл сюда или нажмите для выбора
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}