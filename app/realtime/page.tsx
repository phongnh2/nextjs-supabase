'use client'

import React from 'react'
import ChatComponent from '@/components/chat/chat-component'
import ChatCodeExample from '@/components/chat/chat-example'
import { Divider } from '@nextui-org/react'

const ChatPage = () => {
  return (
    <div className="grid grid-cols-8 gap-20 h-[55vh]">
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Share your voice 🗣️</h1>
        <Divider className="my-5" />
        <ChatComponent />
      </div>
      <div className="col-span-4 h-3/5">
        <h1 className="text-3xl font-bold">Preview code</h1>
        <ChatCodeExample />
      </div>
    </div>
  )
}

export default ChatPage