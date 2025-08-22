import React, { useState } from 'react'
import { MessageSquare, Users, Plus, Search, Send, MoreVertical, UserPlus } from 'lucide-react'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import Header from './components/Header'

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

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Ahmad Rahman',
    lastMessage: 'Hey, ada assignment untuk subject Programming tak?',
    timestamp: '2 min ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    unread: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    lastMessage: 'Jom study group untuk final exam!',
    timestamp: '15 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    unread: 0,
    isOnline: true
  },
  {
    id: '3',
    name: 'Raj Kumar',
    lastMessage: 'Thanks for the notes bro!',
    timestamp: '1 hour ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    unread: 0,
    isOnline: false
  },
  {
    id: '4',
    name: 'Lim Wei Ming',
    lastMessage: 'Presentation slides ready!',
    timestamp: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    unread: 1,
    isOnline: true
  },
  {
    id: '5',
    name: 'Fatimah Zahra',
    lastMessage: 'See you at the library tomorrow',
    timestamp: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    unread: 0,
    isOnline: false
  }
]

const initialMessages: { [chatId: string]: Message[] } = {
  '1': [
    {
      id: '1',
      sender: 'Ahmad Rahman',
      content: 'Hey, ada assignment untuk subject Programming tak?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Ada! Due date next week. Kau dah start ke?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'Ahmad Rahman',
      content: 'Belum lagi... Boleh share requirements tak?',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: '4',
      sender: 'You',
      content: 'Sure! I\'ll send you the PDF file',
      timestamp: '10:35 AM',
      isOwn: true
    }
  ],
  '2': [
    {
      id: '1',
      sender: 'Siti Nurhaliza',
      content: 'Jom study group untuk final exam!',
      timestamp: '9:15 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Good idea! When and where?',
      timestamp: '9:20 AM',
      isOwn: true
    }
  ],
  '3': [
    {
      id: '1',
      sender: 'Raj Kumar',
      content: 'Thanks for the notes bro!',
      timestamp: '8:45 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'No problem! Good luck with the exam',
      timestamp: '8:50 AM',
      isOwn: true
    }
  ],
  '4': [
    {
      id: '1',
      sender: 'Lim Wei Ming',
      content: 'Presentation slides ready!',
      timestamp: '7:30 AM',
      isOwn: false
    }
  ],
  '5': [
    {
      id: '1',
      sender: 'Fatimah Zahra',
      content: 'See you at the library tomorrow',
      timestamp: 'Yesterday',
      isOwn: false
    }
  ]
}

function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])
  const [activeTab, setActiveTab] = useState<'friends' | 'matching' | 'add-contact'>('friends')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>(initialMessages)
  const [chats, setChats] = useState<Chat[]>(mockChats)

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      isOwn: true
    }

    // Add message to messages
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }))

    // Update chat's last message and timestamp
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            lastMessage: content,
            timestamp: 'now'
          }
        : chat
    ))

    // Simulate a response after 2-3 seconds for online users
    const chat = chats.find(c => c.id === chatId)
    if (chat?.isOnline) {
      setTimeout(() => {
        const responses = [
          'Okay, thanks!',
          'Sure thing!',
          'Alright, got it',
          'Thanks for letting me know',
          'Sounds good!',
          'Perfect!',
          'Noted!',
          'Terima kasih!',
          'Okay lah',
          'Sure, no problem'
        ]
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: chat.name,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          isOwn: false
        }

        setMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), responseMessage]
        }))

        setChats(prev => prev.map(c => 
          c.id === chatId 
            ? { 
                ...c, 
                lastMessage: responseMessage.content,
                timestamp: 'now'
              }
            : c
        ))
      }, Math.random() * 2000 + 1000) // Random delay between 1-3 seconds
    }
  }

  return (
    <div className="min-h-screen bg-cloud-dancer font-pixel">
      {/* Gameboy-style container */}
      <div className="max-w-6xl mx-auto bg-darkest-hour p-6 min-h-screen">
        <Header />
        
        {/* Main content area with gameboy screen effect */}
        <div className="bg-sun-glare p-4 rounded-lg border-4 border-darkest-hour shadow-2xl">
          <div className="bg-cloud-dancer border-2 border-darkest-hour rounded p-4 min-h-[600px]">
            
            {/* Chat interface */}
            <div className="flex h-full">
              {/* Left sidebar - Chat list */}
              <div className="w-1/3 border-r-4 border-darkest-hour pr-4">
                {/* Tab navigation */}
                <div className="flex mb-4 bg-blue-violet rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('friends')}
                    className={`flex-1 px-3 py-2 text-sm font-bold rounded transition-all ${
                      activeTab === 'friends'
                        ? 'bg-sun-glare text-darkest-hour'
                        : 'text-cloud-dancer hover:bg-blue-violet/80'
                    }`}
                  >
                    Friends
                  </button>
                  <button
                    onClick={() => setActiveTab('matching')}
                    className={`flex-1 px-3 py-2 text-sm font-bold rounded transition-all ${
                      activeTab === 'matching'
                        ? 'bg-sun-glare text-darkest-hour'
                        : 'text-cloud-dancer hover:bg-blue-violet/80'
                    }`}
                  >
                    Matching
                  </button>
                  <button
                    onClick={() => setActiveTab('add-contact')}
                    className={`flex-1 px-3 py-2 text-sm font-bold rounded transition-all ${
                      activeTab === 'add-contact'
                        ? 'bg-sun-glare text-darkest-hour'
                        : 'text-cloud-dancer hover:bg-blue-violet/80'
                    }`}
                  >
                    Add Contact
                  </button>
                </div>

                {/* Search bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkest-hour w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-darkest-hour rounded-lg bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 focus:outline-none focus:border-exuberant-orange"
                  />
                </div>

                {/* Add new message button */}
                <button className="w-full mb-4 bg-exuberant-orange hover:bg-exuberant-orange/80 text-cloud-dancer font-bold py-3 px-4 rounded-lg border-2 border-darkest-hour transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Message
                </button>

                {/* Chat list */}
                <ChatList 
                  chats={filteredChats}
                  selectedChat={selectedChat}
                  onSelectChat={setSelectedChat}
                />
              </div>

              {/* Right side - Chat window */}
              <div className="flex-1 pl-4">
                {selectedChat ? (
                  <ChatWindow 
                    chat={selectedChat}
                    messages={messages[selectedChat.id] || []}
                    onSendMessage={handleSendMessage}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-darkest-hour/60">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-violet" />
                      <p className="text-lg font-bold">Select a chat to start messaging</p>
                      <p className="text-sm">Choose from your existing conversations or start a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation icons (gameboy style) */}
        <div className="flex justify-center mt-6 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-sun-glare rounded-full border-2 border-darkest-hour cursor-pointer hover:bg-exuberant-orange transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
