'use client';

import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react'

interface MessageInputProps {
  sendMessage: (content: string) => Promise<void>
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="p-4 flex">
      <Input
        isClearable
        fullWidth
        placeholder="Type a message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button onClick={handleSendMessage} className="ml-2">
        Send
      </Button>
    </div>
  )
}

export default MessageInput