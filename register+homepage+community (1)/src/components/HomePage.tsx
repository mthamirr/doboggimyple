import React, { useState } from 'react'
import { Bell, Mail, Search, Users, BookOpen, Briefcase, Palette, Church, Music, Film, Trophy, Shield, Heart, Megaphone, X, Plus, TrendingUp, Calendar, Star } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

interface HomePageProps {
  onNavigateToBatch: () => void
  onNavigateToBoard: (boardType: string) => void
  userGender?: string
  userAvatar?: string
  userName?: string
}

const HomePage: React.FC<HomePageProps> = ({ 
  onNavigateToBatch, 
  onNavigateToBoard, 
  userGender = 'female',
  userAvatar = '👩‍🎓', // Graduation gown girl
  userName = 'SITI NURHALIZA' // Malay girl name
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [genderWarning, setGenderWarning] = useState<string | null>(null)

  // Mock notifications - Anonymous
  const notifications = [
    {
      id: 1,
      title: 'NEW COMMENT ON POST',
      message: 'SOMEONE REPLIED TO STUDY GROUP',
      time: '5 MIN AGO',
      type: 'comment',
      redirectTo: 'batch',
      postId: 'batch-1'
    },
    {
      id: 2,
      title: 'EVENT REMINDER',
      message: 'SPRING FESTIVAL MEETING IN 1H',
      time: '1 HOUR AGO',
      type: 'event',
      redirectTo: 'announcements',
      postId: 'announcements-1'
    },
    {
      id: 3,
      title: 'NEW ANNOUNCEMENT',
      message: 'LIBRARY EXTENDED HOURS',
      time: '2 HOURS AGO',
      type: 'announcement',
      redirectTo: 'announcements',
      postId: 'announcements-2'
    }
  ]

  // Mock messages
  const messages = [
    {
      id: 1,
      sender: 'SARAH AHMAD',
      message: 'HEY! JOINING STUDY GROUP TONIGHT?',
      time: '10 MIN AGO',
      unread: true
    },
    {
      id: 2,
      sender: 'IT PROJECT TEAM',
      message: 'MEETING TOMORROW AT 2 PM',
      time: '1 HOUR AGO',
      unread: false
    }
  ]

  const communityBoards = [
    { 
      id: 'batch', 
      icon: '📚', 
      label: 'BATCH', 
      color: 'bg-exuberant-orange',
      description: 'CONNECT WITH BATCH MATES',
      onClick: () => onNavigateToBoard('batch')
    },
    { 
      id: 'major', 
      icon: '💼', 
      label: 'MAJOR', 
      color: 'bg-sun-glare',
      description: 'DISCUSS YOUR FIELD',
      onClick: () => onNavigateToBoard('major')
    },
    { 
      id: 'mens', 
      icon: '🛡️', 
      label: "MEN'S LOUNGE", 
      color: 'bg-blue-violet',
      description: 'MEN-ONLY DISCUSSIONS',
      restricted: 'male',
      onClick: () => onNavigateToBoard('mens')
    },
    { 
      id: 'womens', 
      icon: '💖', 
      label: "WOMEN'S LOUNGE", 
      color: 'bg-exuberant-orange',
      description: 'WOMEN-ONLY DISCUSSIONS',
      restricted: 'female',
      onClick: () => onNavigateToBoard('womens')
    },
    { 
      id: 'fashion', 
      icon: '👗', 
      label: 'FASHION', 
      color: 'bg-sun-glare',
      description: 'STYLE & TRENDS',
      onClick: () => onNavigateToBoard('fashion')
    },
    { 
      id: 'religion', 
      icon: '🕌', 
      label: 'RELIGION', 
      color: 'bg-blue-violet',
      description: 'FAITH DISCUSSIONS',
      onClick: () => onNavigateToBoard('religion')
    },
    { 
      id: 'music', 
      icon: '🎵', 
      label: 'MUSIC', 
      color: 'bg-exuberant-orange',
      description: 'SHARE YOUR TUNES',
      onClick: () => onNavigateToBoard('music')
    },
    { 
      id: 'movie', 
      icon: '🎬', 
      label: 'MOVIES', 
      color: 'bg-sun-glare',
      description: 'FILM REVIEWS',
      onClick: () => onNavigateToBoard('movie')
    },
    { 
      id: 'sports', 
      icon: '🏆', 
      label: 'SPORTS', 
      color: 'bg-blue-violet',
      description: 'SPORTS & ACTIVITIES',
      onClick: () => onNavigateToBoard('sports')
    },
    { 
      id: 'announcements', 
      icon: '📢', 
      label: 'ANNOUNCEMENTS', 
      color: 'bg-exuberant-orange',
      description: 'OFFICIAL UPDATES',
      onClick: () => onNavigateToBoard('announcements')
    }
  ]

  const handleCommunityClick = (board: any) => {
    // FIXED: Gender-based access control with proper female user restrictions
    if (board.restricted && board.restricted !== userGender) {
      const restrictedGender = board.restricted === 'male' ? "MEN'S" : "WOMEN'S"
      const userGenderText = userGender === 'male' ? 'MALE' : 'FEMALE'
      setGenderWarning(`ACCESS DENIED: THIS IS THE ${restrictedGender} LOUNGE. ONLY ${board.restricted.toUpperCase()} STUDENTS CAN ACCESS. YOU ARE REGISTERED AS ${userGenderText}.`)
      return
    }
    
    if (board.onClick) {
      board.onClick()
    }
  }

  const handleNotificationClick = (notification: any) => {
    setShowNotifications(false)
    onNavigateToBoard(notification.redirectTo)
  }

  return (
    <div className="min-h-screen bg-cloud-dancer pb-16">
      {/* FIXED: Responsive Header - No overflow on any device */}
      <div className="bg-darkest-hour border-b-4 border-darkest-hour safe-area-top">
        <div className="px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              {/* FIXED: Graduation gown girl avatar */}
              <span className="text-2xl sm:text-3xl flex-shrink-0">{userAvatar}</span>
              <div className="min-w-0 flex-1">
                <h1 className="pixel-text-sm sm:pixel-text-lg text-cloud-dancer font-black truncate">WELCOME!</h1>
                <p className="pixel-text-xs sm:pixel-text text-sun-glare truncate">{userName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative w-10 h-10 sm:w-12 sm:h-12 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
              >
                <Bell size={16} className="sm:w-5 sm:h-5 text-cloud-dancer" />
                {/* FIXED: Smaller counter size */}
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-sun-glare text-darkest-hour pixel-text-xs font-black pixel-border-thin flex items-center justify-center">
                  3
                </div>
              </button>
              <button 
                onClick={() => setShowMessages(true)}
                className="relative w-10 h-10 sm:w-12 sm:h-12 bg-blue-violet pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
              >
                <Mail size={16} className="sm:w-5 sm:h-5 text-cloud-dancer" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-exuberant-orange pixel-border-thin"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        
        {/* Event Countdown Card */}
        <div className="bg-blue-violet pixel-card text-cloud-dancer">
          <div className="p-6 text-center">
            <div className="inline-flex items-center px-3 py-2 bg-sun-glare text-darkest-hour pixel-border-thin pixel-text font-black mb-4">
              <Calendar className="w-3 h-3 mr-2" />
              KASUMA SPRING FESTIVAL
            </div>
            <div className="pixel-text-xl font-black mb-4" style={{ fontSize: '48px', lineHeight: '1' }}>3</div>
            <div className="pixel-text-lg font-black mb-2">DAYS TO GO</div>
            <div className="pixel-text text-sun-glare">FRIDAY, MAY 10TH</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sun-glare pixel-card">
            <div className="p-4 flex items-center">
              <div className="w-12 h-12 bg-darkest-hour pixel-border-thin flex items-center justify-center mr-3">
                <TrendingUp size={16} className="text-sun-glare" />
              </div>
              <div>
                <div className="pixel-text-lg text-darkest-hour font-black">156</div>
                <div className="pixel-text text-darkest-hour">ACTIVE POSTS</div>
              </div>
            </div>
          </div>
          <div className="bg-exuberant-orange pixel-card">
            <div className="p-4 flex items-center">
              <div className="w-12 h-12 bg-darkest-hour pixel-border-thin flex items-center justify-center mr-3">
                <Users size={16} className="text-exuberant-orange" />
              </div>
              <div>
                <div className="pixel-text-lg text-cloud-dancer font-black">2.3K</div>
                <div className="pixel-text text-cloud-dancer">MEMBERS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Announcement */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="pixel-text text-darkest-hour font-black">LATEST ANNOUNCEMENT</h3>
            <span className="text-xl">📢</span>
          </div>
          <div 
            className="bg-sun-glare p-4 cursor-pointer pixel-card-hover border-l-8 border-exuberant-orange"
            onClick={() => onNavigateToBoard('announcements')}
          >
            <h4 className="pixel-text text-darkest-hour font-black mb-2">NEW SEMESTER REGISTRATION OPENS NEXT WEEK</h4>
            <p className="pixel-text text-darkest-hour">ADMIN • AUG 17, 2025</p>
          </div>
        </div>

        {/* Community Boards */}
        <div className="space-y-4">
          <h2 className="pixel-text text-darkest-hour font-black">COMMUNITY BOARDS</h2>
          <div className="grid grid-cols-2 gap-4">
            {communityBoards.map((board) => (
              <button
                key={board.id}
                onClick={() => handleCommunityClick(board)}
                className={`${board.color} pixel-card pixel-card-hover text-left p-4`}
              >
                <div className="text-2xl mb-3">{board.icon}</div>
                <h3 className="pixel-text text-darkest-hour font-black mb-2">{board.label}</h3>
                <p className="pixel-text text-darkest-hour leading-relaxed">{board.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer pixel-modal max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="pixel-text-lg text-darkest-hour font-black">NOTIFICATIONS</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-12 h-12 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
                >
                  <X size={20} className="text-cloud-dancer" />
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="bg-sun-glare pixel-border-thin p-4 cursor-pointer pixel-card-hover" 
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <h4 className="pixel-text text-darkest-hour font-black mb-2">{notification.title}</h4>
                    <p className="pixel-text text-darkest-hour mb-2">{notification.message}</p>
                    <p className="pixel-text text-darkest-hour opacity-75">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer pixel-modal max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="pixel-text-lg text-darkest-hour font-black">MESSAGES</h3>
                <button
                  onClick={() => setShowMessages(false)}
                  className="w-12 h-12 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
                >
                  <X size={20} className="text-cloud-dancer" />
                </button>
              </div>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`pixel-border-thin p-4 ${message.unread ? 'bg-blue-violet text-cloud-dancer' : 'bg-sun-glare text-darkest-hour'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="pixel-text font-black">{message.sender}</h4>
                      {message.unread && <div className="w-3 h-3 bg-exuberant-orange pixel-border-thin"></div>}
                    </div>
                    <p className="pixel-text mb-2">{message.message}</p>
                    <p className="pixel-text opacity-75">{message.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gender Warning Modal */}
      {genderWarning && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer pixel-modal max-w-sm w-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-exuberant-orange pixel-border flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cloud-dancer" />
              </div>
              <h3 className="pixel-text-lg text-darkest-hour font-black mb-4">ACCESS RESTRICTED</h3>
              <p className="pixel-text text-darkest-hour mb-6 leading-relaxed">{genderWarning}</p>
              <button
                onClick={() => setGenderWarning(null)}
                className="w-full pixel-btn-danger py-3"
              >
                UNDERSTOOD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  )
}

export default HomePage
