import React from 'react'
import { ShoppingCart, Users, Home, MessageCircle, User } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabClick?: (tabId: string) => void
  onHomeClick?: () => void // NEW: Home navigation handler
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabClick, onHomeClick }) => {
  const tabs = [
    { id: 'cart', label: 'ADD2CART', icon: ShoppingCart },
    { id: 'match', label: 'MATCH', icon: Users },
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'counseling', label: 'COUNSELLING', icon: MessageCircle },
    { id: 'profile', label: 'PROFILE', icon: User }
  ]

  const handleTabClick = (tabId: string) => {
    if (tabId === 'home' && onHomeClick) {
      // UPDATED: Use dedicated home handler for responsive navigation
      onHomeClick()
    } else if (onTabClick) {
      onTabClick(tabId)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-darkest-hour border-t-4 border-darkest-hour safe-area-bottom z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const IconComponent = tab.icon
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center transition-none ${
                isActive 
                  ? 'bg-sun-glare text-darkest-hour' 
                  : 'bg-darkest-hour text-cloud-dancer hover:bg-blue-violet'
              }`}
              style={{ height: '72px' }} // FIXED HEIGHT FOR ALL TABS
            >
              <IconComponent size={20} className="mb-1" />
              {isActive && (
                <span className="pixel-text font-black text-center leading-tight text-xs">
                  {tab.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
