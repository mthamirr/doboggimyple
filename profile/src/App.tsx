import React, { useState } from 'react'

interface UserProfile {
  name: string
  username: string
  batch: string
  university: string
  rank: string
  chingu: number
  instagram: string
  linkedin: string
  github: string
}

interface FollowRequest {
  username: string
  name: string
  batch: string
  university: string
}

interface Message {
  id: string
  sender: 'me' | 'them'
  text: string
  timestamp: Date
}

type ViewMode = 'profile' | 'my-profile' | 'search-result' | 'not-found' | 'chat-inbox' | 'requests' | 'chingu-list' | 'texting'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('my-profile')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentProfile, setCurrentProfile] = useState<string>('nazaratul_azli')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  
  // Track follow status for each user
  const [followStatuses, setFollowStatuses] = useState<Record<string, 'none' | 'pending' | 'approved'>>({})
  
  const [myProfile, setMyProfile] = useState<UserProfile>({
    name: 'Nazaratul Azli',
    username: 'nazaratul_azli',
    batch: 'B22',
    university: 'Yonsei University',
    rank: 'Member',
    chingu: 234,
    instagram: '@nazaratul.azli',
    linkedin: 'linkedin.com/in/nazazli',
    github: 'github.com/nazazli'
  })

  // Mock database of users with mutable chingu counts
  const [mockUsers, setMockUsers] = useState<Record<string, UserProfile>>({
    'john_doe': {
      name: 'John Doe',
      username: 'john_doe',
      batch: 'B21',
      university: 'Seoul National University',
      rank: 'Senior',
      chingu: 456,
      instagram: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe'
    },
    'jane_smith': {
      name: 'Jane Smith',
      username: 'jane_smith',
      batch: 'B23',
      university: 'KAIST',
      rank: 'Junior',
      chingu: 123,
      instagram: '@janesmith',
      linkedin: 'linkedin.com/in/janesmith',
      github: 'github.com/janesmith'
    },
    'pixel_master': {
      name: 'Pixel Master',
      username: 'pixel_master',
      batch: 'B20',
      university: 'Hanyang University',
      rank: 'Leader',
      chingu: 789,
      instagram: '@pixelmaster',
      linkedin: 'linkedin.com/in/pixelmaster',
      github: 'github.com/pixelmaster'
    },
    'gameboy_fan': {
      name: 'Gameboy Fan',
      username: 'gameboy_fan',
      batch: 'B22',
      university: 'Yonsei University',
      rank: 'Member',
      chingu: 345,
      instagram: '@gameboyfan',
      linkedin: 'linkedin.com/in/gameboyfan',
      github: 'github.com/gameboyfan'
    }
  })

  // Dynamic follow requests list
  const [followRequests, setFollowRequests] = useState<FollowRequest[]>([
    { username: 'pixel_master', name: 'Pixel Master', batch: 'B20', university: 'Hanyang University' },
    { username: 'gameboy_fan', name: 'Gameboy Fan', batch: 'B22', university: 'Yonsei University' }
  ])

  // Dynamic approved chingu list
  const [approvedChingu, setApprovedChingu] = useState<FollowRequest[]>([
    { username: 'john_doe', name: 'John Doe', batch: 'B21', university: 'Seoul National University' },
    { username: 'jane_smith', name: 'Jane Smith', batch: 'B23', university: 'KAIST' }
  ])

  // Chat messages storage
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({})

  // Natural chat responses pool
  const chatResponses = [
    "Hey! How's it going?",
    "Nice to hear from you! What's up?",
    "Hi there! Been a while!",
    "Oh hey! How have you been?",
    "Hello! Great to connect with you!",
    "Hey friend! What brings you here?",
    "Hi! Long time no see!",
    "Yo! What's new with you?",
    "Hello there! How's your day going?",
    "Hey! Thanks for reaching out!",
    "Hi! I was just thinking about you!",
    "What's up! How's everything?",
    "Hey there! Good to hear from you!",
    "Hello! How's life treating you?",
    "Hi! Hope you're doing well!",
    "Hey! Any exciting news?",
    "Greetings! How's your project going?",
    "Hi there! What have you been up to?",
    "Hello! Ready for the weekend?",
    "Hey! Did you finish that assignment?"
  ]

  const getRandomResponse = () => {
    return chatResponses[Math.floor(Math.random() * chatResponses.length)]
  }

  const handleFollowClick = () => {
    const status = followStatuses[currentProfile] || 'none'
    if (status === 'none') {
      setFollowStatuses(prev => ({ ...prev, [currentProfile]: 'pending' }))
    } else if (status === 'approved') {
      // Navigate to texting page
      setSelectedChat(currentProfile)
      setViewMode('texting')
    }
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase()
      if (searchLower === myProfile.username) {
        setViewMode('my-profile')
      } else if (mockUsers[searchLower]) {
        setCurrentProfile(searchLower)
        setViewMode('search-result')
      } else {
        setViewMode('not-found')
      }
      setSearchQuery('')
    }
  }

  const handleBackClick = () => {
    if (viewMode === 'texting') {
      // Go back to where we came from
      if (selectedChat && approvedChingu.find(c => c.username === selectedChat)) {
        setViewMode('chat-inbox')
      } else {
        setViewMode('my-profile')
      }
    } else {
      setViewMode('my-profile')
    }
    setSearchQuery('')
    setSelectedChat(null)
  }

  const handleChatInboxClick = () => {
    setViewMode('chat-inbox')
  }

  const handleProfileUpdate = (field: keyof UserProfile, value: string | number) => {
    setMyProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleApproveRequest = (username: string) => {
    const request = followRequests.find(r => r.username === username)
    if (request) {
      // Remove from requests
      setFollowRequests(prev => prev.filter(r => r.username !== username))
      // Add to approved chingu
      setApprovedChingu(prev => [...prev, request])
      // Update my chingu count
      setMyProfile(prev => ({ ...prev, chingu: prev.chingu + 1 }))
      // Update follow status
      setFollowStatuses(prev => ({ ...prev, [username]: 'approved' }))
      // Also increase the requester's chingu count
      setMockUsers(prev => ({
        ...prev,
        [username]: {
          ...prev[username],
          chingu: prev[username].chingu + 1
        }
      }))
    }
  }

  const handleDeclineRequest = (username: string) => {
    // Remove from requests
    setFollowRequests(prev => prev.filter(r => r.username !== username))
    // Reset follow status to none
    setFollowStatuses(prev => ({ ...prev, [username]: 'none' }))
  }

  const handleMessageUser = (username: string) => {
    setSelectedChat(username)
    setViewMode('texting')
  }

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        text: messageInput.trim(),
        timestamp: new Date()
      }
      
      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }))
      
      setMessageInput('')
      
      // Simulate a natural reply after 1-2 seconds
      const delay = 1000 + Math.random() * 1000
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'them',
          text: getRandomResponse(),
          timestamp: new Date()
        }
        setChatMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), replyMessage]
        }))
      }, delay)
    }
  }

  // Simulate follow approval after 2 seconds
  React.useEffect(() => {
    const pendingUsers = Object.entries(followStatuses).filter(([_, status]) => status === 'pending')
    
    if (pendingUsers.length > 0) {
      const timers = pendingUsers.map(([username]) => {
        return setTimeout(() => {
          setFollowStatuses(prev => ({ ...prev, [username]: 'approved' }))
          
          // Add the user to my Chingu list when they approve my request
          const userInfo = mockUsers[username]
          if (userInfo && !approvedChingu.find(c => c.username === username)) {
            setApprovedChingu(prev => [...prev, {
              username: userInfo.username,
              name: userInfo.name,
              batch: userInfo.batch,
              university: userInfo.university
            }])
          }
          
          // Increase both users' chingu counts
          setMyProfile(prev => ({ ...prev, chingu: prev.chingu + 1 }))
          setMockUsers(prev => ({
            ...prev,
            [username]: {
              ...prev[username],
              chingu: prev[username].chingu + 1
            }
          }))
        }, 2000)
      })
      
      return () => timers.forEach(timer => clearTimeout(timer))
    }
  }, [followStatuses, mockUsers, approvedChingu])

  // Chat Inbox View
  if (viewMode === 'chat-inbox') {
    return (
      <div className="min-h-screen bg-white font-mono" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="bg-navy p-4 flex items-center justify-between rounded-b-2xl">
          <button onClick={handleBackClick} className="w-8 h-8 relative flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-lime"></div>
            <div className="w-4 h-1 bg-lime ml-[-2px]"></div>
          </button>
          <h1 className="text-lime font-black text-xl">CHAT INBOX</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-cream p-6 min-h-screen">
          <div className="space-y-4">
            {approvedChingu.map((chingu) => (
              <div key={chingu.username} className="bg-white p-4 rounded-xl border-3 border-navy">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green font-black text-lg mb-1">{chingu.name}</h3>
                    <p className="text-navy font-black text-sm">@{chingu.username}</p>
                  </div>
                  <button 
                    onClick={() => handleMessageUser(chingu.username)}
                    className="bg-orange text-yellow font-black text-sm py-2 px-4 rounded-lg hover:opacity-90"
                  >
                    CHAT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Texting View
  if (viewMode === 'texting' && selectedChat) {
    const chatUser = mockUsers[selectedChat] || approvedChingu.find(c => c.username === selectedChat)
    const messages = chatMessages[selectedChat] || []
    
    return (
      <div className="min-h-screen bg-white font-mono flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="bg-navy p-4 flex items-center justify-between rounded-b-2xl">
          <button onClick={handleBackClick} className="w-8 h-8 relative flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-lime"></div>
            <div className="w-4 h-1 bg-lime ml-[-2px]"></div>
          </button>
          <h1 className="text-lime font-black text-lg">{chatUser?.name || selectedChat}</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-cream flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'me' 
                    ? 'bg-green text-white' 
                    : 'bg-white text-navy border-2 border-navy'
                }`}>
                  <p className="text-xs break-words">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-navy p-4 rounded-t-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type message..."
              className="flex-1 bg-white text-navy px-3 py-2 rounded-lg text-xs placeholder-navy/50 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-lime text-navy font-black text-xs px-4 py-2 rounded-lg hover:opacity-90"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Follow Requests View
  if (viewMode === 'requests') {
    return (
      <div className="min-h-screen bg-white font-mono" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="bg-navy p-4 flex items-center justify-between rounded-b-2xl">
          <button onClick={handleBackClick} className="w-8 h-8 relative flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-lime"></div>
            <div className="w-4 h-1 bg-lime ml-[-2px]"></div>
          </button>
          <h1 className="text-lime font-black text-xl">FOLLOW REQUESTS</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-cream p-6 min-h-screen">
          {followRequests.length === 0 ? (
            <div className="text-center text-navy font-black text-lg mt-8">
              No pending requests
            </div>
          ) : (
            <div className="space-y-4">
              {followRequests.map((request) => (
                <div key={request.username} className="bg-white p-4 rounded-xl border-3 border-navy">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-green font-black text-lg mb-1">{request.name}</h3>
                      <p className="text-navy font-black text-sm">@{request.username}</p>
                      <p className="text-navy font-black text-xs mt-1">{request.batch} | {request.university}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApproveRequest(request.username)}
                      className="flex-1 bg-green text-white font-black text-sm py-2 px-3 rounded-lg hover:opacity-90"
                    >
                      APPROVE
                    </button>
                    <button 
                      onClick={() => handleDeclineRequest(request.username)}
                      className="flex-1 bg-navy text-white font-black text-sm py-2 px-3 rounded-lg hover:opacity-90"
                    >
                      DECLINE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Chingu List View
  if (viewMode === 'chingu-list') {
    return (
      <div className="min-h-screen bg-white font-mono" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="bg-navy p-4 flex items-center justify-between rounded-b-2xl">
          <button onClick={handleBackClick} className="w-8 h-8 relative flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-lime"></div>
            <div className="w-4 h-1 bg-lime ml-[-2px]"></div>
          </button>
          <h1 className="text-lime font-black text-xl">MY CHINGU</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-cream p-6 min-h-screen">
          {approvedChingu.length === 0 ? (
            <div className="text-center text-navy font-black text-lg mt-8">
              No Chingu yet
            </div>
          ) : (
            <div className="space-y-4">
              {approvedChingu.map((chingu) => (
                <div key={chingu.username} className="bg-white p-4 rounded-xl border-3 border-navy">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-green font-black text-lg mb-1">{chingu.name}</h3>
                      <p className="text-navy font-black text-sm">@{chingu.username}</p>
                      <p className="text-navy font-black text-xs mt-1">{chingu.batch} | {chingu.university}</p>
                    </div>
                    <button 
                      onClick={() => handleMessageUser(chingu.username)}
                      className="bg-orange text-yellow font-black text-sm py-2 px-4 rounded-lg hover:opacity-90"
                    >
                      MESSAGE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // User Not Found View
  if (viewMode === 'not-found') {
    return (
      <div className="min-h-screen bg-cream font-mono flex items-center justify-center" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="text-center">
          <h1 className="text-navy font-black text-3xl mb-8">User Not Exist</h1>
          <button 
            onClick={handleBackClick}
            className="bg-orange text-yellow font-black text-xl py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            BACK
          </button>
        </div>
      </div>
    )
  }

  // Determine which profile to show
  const profileToShow = viewMode === 'my-profile' ? myProfile : mockUsers[currentProfile]
  const isMyProfile = viewMode === 'my-profile'
  const currentFollowStatus = followStatuses[currentProfile] || 'none'

  return (
    <div className="min-h-screen bg-white font-mono" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div className="bg-navy p-4 flex items-center justify-between rounded-b-2xl">
        {/* Back Button - Arrow */}
        <button onClick={handleBackClick} className="w-8 h-8 relative flex items-center justify-center">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-lime"></div>
          <div className="w-4 h-1 bg-lime ml-[-2px]"></div>
        </button>
        
        {/* Search Bar - Centered and Smaller */}
        <div className="flex-1 mx-3 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 relative">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-white transform rotate-45 translate-x-0.5"></div>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search username..."
              className="bg-transparent text-white text-sm font-bold tracking-wider outline-none placeholder-white/70"
              style={{ width: '150px' }}
            />
          </div>
        </div>
        
        {/* Chat Inbox Icon Only */}
        <button onClick={handleChatInboxClick} className="w-8 h-8 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <rect x="3" y="7" width="18" height="12" fill="#b9ff00"/>
            <path d="M3 7l9 6l9-6" stroke="#1a2b4a" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      </div>

      {/* Main Profile Section */}
      <div className="bg-cream p-6 min-h-screen">
        {/* Profile Header with Stats */}
        <div className="flex items-start justify-between mb-8">
          {/* Left Stats - CHINGU */}
          <div className="text-center">
            <div className="bg-lime text-navy font-black text-base mb-2 px-4 py-2 rounded-lg">
              CHINGU
            </div>
            <div className="text-navy font-black text-4xl">{profileToShow.chingu}</div>
          </div>

          {/* Center Avatar */}
          <div className="mx-6">
            <div className="w-28 h-28 bg-teal rounded-full p-3">
              <div className="w-full h-full relative">
                {/* Pixel Art Character */}
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  {/* Hair - Black */}
                  <rect x="7" y="2" width="10" height="3" fill="#000000"/>
                  <rect x="6" y="3" width="12" height="2" fill="#000000"/>
                  <rect x="5" y="5" width="14" height="2" fill="#000000"/>
                  
                  {/* Face - Orange/Tan */}
                  <rect x="6" y="7" width="12" height="8" fill="#ff9933"/>
                  
                  {/* Eyes - Black dots */}
                  <rect x="8" y="9" width="2" height="2" fill="#000000"/>
                  <rect x="14" y="9" width="2" height="2" fill="#000000"/>
                  
                  {/* Mouth */}
                  <rect x="10" y="12" width="4" height="1" fill="#000000"/>
                  
                  {/* Neck */}
                  <rect x="10" y="15" width="4" height="2" fill="#ff9933"/>
                  
                  {/* Shirt - Orange */}
                  <rect x="5" y="17" width="14" height="5" fill="#ff6600"/>
                  <rect x="7" y="16" width="10" height="1" fill="#ff6600"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Stats - RANK */}
          <div className="text-center">
            <div className="bg-lime text-navy font-black text-base mb-2 px-4 py-2 rounded-lg">
              RANK
            </div>
            {isEditing ? (
              <input
                type="text"
                value={profileToShow.rank}
                onChange={(e) => handleProfileUpdate('rank', e.target.value)}
                className="text-navy font-black text-2xl bg-transparent border-b-2 border-navy outline-none text-center w-24"
              />
            ) : (
              <div className="text-navy font-black text-2xl">{profileToShow.rank}</div>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          {isEditing ? (
            <>
              <input
                type="text"
                value={profileToShow.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="text-green font-black text-4xl mb-3 tracking-wide bg-transparent border-b-2 border-green outline-none text-center w-full"
              />
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-navy font-black text-xl">@</span>
                <input
                  type="text"
                  value={profileToShow.username}
                  onChange={(e) => handleProfileUpdate('username', e.target.value.replace('@', ''))}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={profileToShow.batch}
                  onChange={(e) => handleProfileUpdate('batch', e.target.value)}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none w-16 text-center"
                />
                <span className="text-navy font-black text-xl">|</span>
                <input
                  type="text"
                  value={profileToShow.university}
                  onChange={(e) => handleProfileUpdate('university', e.target.value)}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-green font-black text-4xl mb-3 tracking-wide">
                {profileToShow.name}
              </h1>
              <p className="text-navy font-black text-xl mb-2">@{profileToShow.username}</p>
              <p className="text-navy font-black text-xl">{profileToShow.batch} | {profileToShow.university}</p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {isMyProfile ? (
          // My Profile buttons
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 bg-orange text-yellow font-black text-xl py-4 px-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              {isEditing ? 'SAVE' : 'EDIT'}
            </button>
            <button 
              onClick={() => setViewMode('requests')}
              className="flex-1 bg-green text-white font-black text-xl py-4 px-4 rounded-xl hover:opacity-90 transition-opacity relative"
            >
              REQUESTS
              {followRequests.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow text-navy text-xs px-2 py-1 rounded-full">
                  {followRequests.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setViewMode('chingu-list')}
              className="flex-1 bg-navy text-white font-black text-xl py-4 px-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              VIEW CHINGU
            </button>
          </div>
        ) : (
          // Other user's profile button
          <button 
            onClick={handleFollowClick}
            className={`w-full ${
              currentFollowStatus === 'pending' ? 'bg-yellow text-navy' : 
              currentFollowStatus === 'approved' ? 'bg-green text-white' : 
              'bg-orange text-yellow'
            } font-black text-2xl py-4 px-4 mb-8 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3`}
          >
            {currentFollowStatus === 'approved' ? (
              <>
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M2 12l18-10v20z" fill="white"/>
                  <path d="M2 12l7 2l11-12" stroke="#7ac943" strokeWidth="1" fill="none"/>
                </svg>
                MESSAGE
              </>
            ) : currentFollowStatus === 'pending' ? (
              'PENDING'
            ) : (
              'FOLLOW REQUEST'
            )}
          </button>
        )}

        {/* Social Links */}
        <div className="mb-6">
          <div className="text-navy font-black text-2xl mb-4">Find me at:</div>
          <div className="space-y-4">
            {/* Instagram */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple p-2 rounded-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <rect x="6" y="6" width="12" height="12" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                  <circle cx="16" cy="8" r="1" fill="white"/>
                </svg>
              </div>
              {isEditing && isMyProfile ? (
                <input
                  type="text"
                  value={profileToShow.instagram}
                  onChange={(e) => handleProfileUpdate('instagram', e.target.value)}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none"
                />
              ) : (
                <a href={`https://instagram.com/${profileToShow.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-navy font-black text-xl hover:opacity-80 transition-opacity">
                  {profileToShow.instagram}
                </a>
              )}
            </div>
            
            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan p-2 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-2xl">in</span>
              </div>
              {isEditing && isMyProfile ? (
                <input
                  type="text"
                  value={profileToShow.linkedin}
                  onChange={(e) => handleProfileUpdate('linkedin', e.target.value)}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none"
                />
              ) : (
                <a href={`https://${profileToShow.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-navy font-black text-xl hover:opacity-80 transition-opacity">
                  {profileToShow.linkedin}
                </a>
              )}
            </div>
            
            {/* GitHub */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-dark-teal p-2 rounded-lg">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <rect x="10" y="4" width="4" height="4" fill="white"/>
                  <rect x="8" y="6" width="8" height="2" fill="white"/>
                  <rect x="6" y="8" width="12" height="8" fill="white"/>
                  <rect x="8" y="10" width="2" height="2" fill="#006d70"/>
                  <rect x="14" y="10" width="2" height="2" fill="#006d70"/>
                  <rect x="10" y="13" width="4" height="1" fill="#006d70"/>
                </svg>
              </div>
              {isEditing && isMyProfile ? (
                <input
                  type="text"
                  value={profileToShow.github}
                  onChange={(e) => handleProfileUpdate('github', e.target.value)}
                  className="text-navy font-black text-xl bg-transparent border-b-2 border-navy outline-none"
                />
              ) : (
                <a href={`https://${profileToShow.github}`} target="_blank" rel="noopener noreferrer" className="text-navy font-black text-xl hover:opacity-80 transition-opacity">
                  {profileToShow.github}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-navy p-4 flex items-center justify-around rounded-t-2xl">
        {/* Trolley/Cart Icon */}
        <button className="w-8 h-8 relative flex items-center justify-center">
          <div className="w-6 h-5 bg-lime"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 bg-lime"></div>
          <div className="absolute -bottom-1 left-1.5 w-1.5 h-1.5 bg-lime rounded-full"></div>
          <div className="absolute -bottom-1 right-1.5 w-1.5 h-1.5 bg-lime rounded-full"></div>
        </button>
        
        {/* Two Persons Icon */}
        <button className="w-8 h-8 relative flex items-center justify-center">
          <div className="absolute left-0 w-3 h-3 bg-lime rounded-full"></div>
          <div className="absolute left-0 bottom-0 w-4 h-2.5 bg-lime rounded-t-full"></div>
          <div className="absolute right-0 top-1 w-3 h-3 bg-lime rounded-full"></div>
          <div className="absolute right-0 bottom-0 w-4 h-2.5 bg-lime rounded-t-full"></div>
        </button>
        
        {/* Home Icon - With Contrast (darker/highlighted) */}
        <button className="w-10 h-10 relative flex items-center justify-center bg-lime/20 rounded-lg">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[14px] border-b-yellow"></div>
          <div className="absolute bottom-1 w-5 h-3 bg-yellow"></div>
          <div className="absolute bottom-2 w-2 h-2 bg-navy"></div>
        </button>
        
        {/* Chat Bubble Icon */}
        <button className="w-8 h-8 relative flex items-center justify-center">
          <div className="w-7 h-5 bg-lime rounded-lg"></div>
          <div className="absolute bottom-0 left-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-lime"></div>
        </button>
        
        {/* My Profile Icon - Highlighted when active */}
        <button 
          onClick={() => setViewMode('my-profile')}
          className={`w-8 h-8 relative flex items-center justify-center ${isMyProfile ? 'bg-lime/20 rounded-lg' : ''}`}
        >
          <div className="w-4 h-4 bg-lime rounded-full"></div>
          <div className="absolute bottom-0 w-6 h-3 bg-lime rounded-t-full"></div>
        </button>
      </div>
    </div>
  )
}

export default App
