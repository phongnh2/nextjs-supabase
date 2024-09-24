'use client'

import React, { useState, useEffect } from 'react'
import { Input, Button, Chip } from '@nextui-org/react'
import { IMessage } from '@/interfaces/message'
import { useUser } from '@/hooks/useUser'
import MessageInput from '@/components/chat/message-input'
import MessageList from '@/components/chat/message-list'
import { createClient } from '@/utils/supabase/client'

const ChatComponent: React.FC = () => {
  const supabase = createClient();
  const [messages, setMessages] = useState<IMessage[]>([])
  const { user, updateNickname } = useUser()
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    fetchMessages()

    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(current => [...current, payload.new as IMessage])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname)
    }
  }, [user])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) console.error('Error fetching messages:', error)
    else setMessages(data || [])
  }

  const sendMessage = async (content: string) => {
    if (user) {
      const { error } = await supabase
        .from('messages')
        .insert({ content, nickname: user.nickname, user_id: user.userId })
      if (error) console.error('Error sending message:', error)
    }
  }

  const handleUpdateNickname = async () => {
    if (user && newNickname.trim() !== user.nickname) {
      await updateNickname(newNickname.trim())
    }
    setIsEditingNickname(false)
  }

  return (
    <div className="flex flex-col h-3/5">
      <div className="p-4 flex justify-between items-center gap-2">
        {isEditingNickname ? (
          <Input
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdateNickname()}
          />
        ) : (
          <div><span className='text-primary-500 font-bold'>Your nickname:</span> {user?.nickname && <Chip color="default">{user?.nickname}</Chip>}</div>
        )}
        <Button onClick={() => {
          if (isEditingNickname) {
            handleUpdateNickname()
          } else {
            setIsEditingNickname(true)
          }
        }}>
          {isEditingNickname ? 'Save' : 'Edit'}
        </Button>
      </div>
      {user && <MessageList messages={messages} currentUser={user} />} 
      <MessageInput sendMessage={sendMessage} />
    </div>
  )
}

export default ChatComponent