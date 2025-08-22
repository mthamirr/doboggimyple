import React from 'react'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  avatar: string
  unread: number
  isOnline: boolean
}

interface ChatListProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
            selectedChat?.id === chat.id
              ? 'bg-blue-violet text-cloud-dancer border-blue-violet'
              : 'bg-cloud-dancer border-darkest-hour hover:bg-sun-glare/20'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Avatar with online indicator */}
            <div className="relative">
              <div className="w-12 h-12 rounded-lg border-2 border-darkest-hour overflow-hidden bg-blue-violet">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sun-glare rounded-full border-2 border-darkest-hour animate-pulse"></div>
              )}
            </div>

            {/* Chat info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                <span className="text-xs opacity-75 flex-shrink-0 ml-2">{chat.timestamp}</span>
              </div>
              <p className="text-xs opacity-75 truncate">{chat.lastMessage}</p>
            </div>

            {/* Unread indicator */}
            {chat.unread > 0 && (
              <div className="bg-exuberant-orange text-cloud-dancer text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-darkest-hour animate-bounce-slow">
                {chat.unread}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
