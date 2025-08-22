import React, { useState } from 'react'
import { ArrowLeft, MessageSquare, Search, Send, Phone, Video, MoreVertical, UserPlus } from 'lucide-react'

interface MessagingAppProps {
  onBackToHome: () => void
}

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

const MessagingApp: React.FC<MessagingAppProps> = ({ onBackToHome }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Ahmad Zikri',
      lastMessage: 'Hey! Are you joining the study group tomorrow?',
      timestamp: '10:30 AM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      lastMessage: 'Jom study group untuk final exam!',
      timestamp: '9:15 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c92d?w=150&h=150&fit=crop&crop=face',
      unread: 0,
      isOnline: true
    },
    {
      id: '3',
      name: 'Raj Kumar',
      lastMessage: 'Thanks for the notes bro!',
      timestamp: '8:45 AM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      unread: 0,
      isOnline: false
    }
  ]

  const mockMessages: { [chatId: string]: Message[] } = {
    '1': [
      {
        id: '1',
        sender: 'Ahmad Zikri',
        content: 'Hey! Are you joining the study group tomorrow?',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: '2',
        sender: 'You',
        content: 'Yes, definitely! What time?',
        timestamp: '10:32 AM',
        isOwn: true
      }
    ]
  }

  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>(mockMessages)

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isOwn: true
      }

      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), message]
      }))

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
    <div className="min-h-screen bg-cloud-dancer">
      {/* Header */}
      <div className="bg-darkest-hour text-cloud-dancer p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-blue-violet rounded transition-colors mr-3"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-sun-glare p-2 rounded border-2 border-cloud-dancer">
              <MessageSquare className="w-6 h-6 text-darkest-hour" />
            </div>
            <div>
              <h1 className="text-xl font-bold pixel-text">MESSAGES</h1>
              <p className="text-sm text-cloud-dancer/80">Malaysian Student Community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat List */}
        <div className="w-1/3 border-r-4 border-darkest-hour bg-cloud-dancer">
          {/* Search */}
          <div className="p-4 border-b-2 border-darkest-hour">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkest-hour w-4 h-4" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-darkest-hour bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 pixel-text focus:outline-none focus:border-blue-violet"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b-2 border-darkest-hour cursor-pointer hover:bg-sun-glare transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-blue-violet text-cloud-dancer' : 'text-darkest-hour'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded border-2 border-darkest-hour overflow-hidden">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-sun-glare rounded-full border border-darkest-hour"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="pixel-text font-bold">{chat.name}</h3>
                      <span className="pixel-text text-xs opacity-75">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="pixel-text text-sm opacity-75 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="bg-exuberant-orange text-cloud-dancer text-xs w-5 h-5 flex items-center justify-center pixel-text font-bold border border-darkest-hour">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b-2 border-darkest-hour bg-blue-violet text-cloud-dancer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded border-2 border-cloud-dancer overflow-hidden">
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-sun-glare rounded-full border border-cloud-dancer"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="pixel-text font-bold">{selectedChat.name}</h2>
                    <p className="pixel-text text-xs opacity-75">
                      {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
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

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-cloud-dancer">
                {(messages[selectedChat.id] || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 border-2 ${
                        message.isOwn
                          ? 'bg-sun-glare text-darkest-hour border-darkest-hour'
                          : 'bg-blue-violet text-cloud-dancer border-blue-violet'
                      }`}
                    >
                      <p className="pixel-text text-sm">{message.content}</p>
                      <p className="pixel-text text-xs opacity-75 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t-2 border-darkest-hour bg-cloud-dancer">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border-2 border-darkest-hour bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 pixel-text focus:outline-none focus:border-exuberant-orange"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2 border-2 border-darkest-hour transition-colors ${
                      newMessage.trim()
                        ? 'bg-exuberant-orange hover:bg-exuberant-orange/80 text-cloud-dancer'
                        : 'bg-darkest-hour/20 text-darkest-hour/40 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-darkest-hour/60">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-violet" />
                <p className="text-lg font-bold pixel-text">Select a chat to start messaging</p>
                <p className="text-sm pixel-text">Choose from your existing conversations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessagingApp
