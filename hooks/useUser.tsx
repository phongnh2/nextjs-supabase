'use client';

import { randomNames } from '@/constants/names';
import { IUser } from '@/interfaces/message';
import { useState, useEffect } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<IUser| null>(null)

  useEffect(() => {
    const initUser = async () => {
      let currentUser = localStorage.getItem('currentUser')
      console.log("🚀 ~ initUser ~ currentUser:", currentUser)
      if (!currentUser) {
        const userId = crypto.randomUUID()
        const newNickname = randomNames[Math.floor(Math.random() * randomNames.length)]
        localStorage.setItem('currentUser', JSON.stringify({ userId, nickname: newNickname }))

        setUser({
          userId,
          nickname: newNickname
        })
      }
      
      setUser(JSON.parse(currentUser ?? '') as IUser)
    }

    initUser()
  }, [])

  const updateNickname =  (newNickname: string) => {
    if (user) {
      const { userId } = user
      setUser({ userId, nickname: newNickname })
      localStorage.setItem('currentUser', JSON.stringify({ userId, nickname: newNickname }))
    }
  }

  return { user, updateNickname }
}