import React, { useState, useRef, useEffect } from 'react'
import { Send, MoreVertical, Phone, Video, UserPlus } from 'lucide-react'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  avatar: string
  unread: number
  isOnline: boolean
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  onSendMessage: (chatId: string, content: string) => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(chat.id, newMessage.trim())
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-darkest-hour bg-blue-violet text-cloud-dancer rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg border-2 border-cloud-dancer overflow-hidden">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-full h-full object-cover pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            {chat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-sun-glare rounded-full border border-cloud-dancer animate-pulse"></div>
            )}
          </div>
          <div>
            <h2 className="font-bold">{chat.name}</h2>
            <p className="text-xs opacity-75">
              {chat.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-blue-violet/80 rounded border border-cloud-dancer transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-blue-violet/80 rounded border border-cloud-dancer transition-colors">
            <Video className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-blue-violet/80 rounded border border-cloud-dancer transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-cloud-dancer">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-darkest-hour/60">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-violet rounded-lg border-2 border-darkest-hour flex items-center justify-center">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded object-cover pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <p className="text-lg font-bold">Start a conversation with {chat.name}</p>
              <p className="text-sm">Send a message to get the conversation started!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg border-2 ${
                    message.isOwn
                      ? 'bg-sun-glare text-darkest-hour border-darkest-hour'
                      : 'bg-blue-violet text-cloud-dancer border-blue-violet'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <div className="p-4 border-t-2 border-darkest-hour bg-cloud-dancer">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border-2 border-darkest-hour rounded-lg bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 focus:outline-none focus:border-exuberant-orange"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg border-2 border-darkest-hour transition-colors ${
              newMessage.trim()
                ? 'bg-exuberant-orange hover:bg-exuberant-orange/80 text-cloud-dancer'
                : 'bg-darkest-hour/20 text-darkest-hour/40 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
