'use client'

import { useEffect, useState } from 'react'
import { NotificationProps } from '@/types'

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-gray-800'
      case 'error':
        return 'bg-red-50 border-red-500 text-gray-800'
      case 'info':
        return 'bg-blue-50 border-blue-500 text-gray-800'
      default:
        return 'bg-gray-50 border-gray-500 text-gray-800'
    }
  }

  return (
    <div
      className={`fixed top-12 right-5 p-3 px-4 rounded border shadow-lg z-50 text-sm 
        ${getTypeClasses()} 
        ${isVisible ? 'animate-slide-in' : 'animate-slide-out'}`}
    >
      {message}
    </div>
  )
}