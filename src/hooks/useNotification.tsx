'use client'

import { useState, useCallback } from 'react'
import { NotificationType } from '@/types'

interface NotificationState {
  id: number;
  message: string;
  type: NotificationType;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationState[]>([])

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }, [])

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return {
    notifications,
    showNotification,
    removeNotification
  }
}