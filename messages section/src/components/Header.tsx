import React from 'react'
import { MessageSquare, Wifi, Battery, Signal } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6 text-sun-glare">
      {/* App title with pixel style */}
      <div className="flex items-center gap-3">
        <div className="bg-sun-glare p-2 rounded border-2 border-darkest-hour">
          <MessageSquare className="w-6 h-6 text-darkest-hour" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wider">MESSAGES</h1>
          <p className="text-sm text-sun-glare/80">Malaysian Student Community</p>
        </div>
      </div>

      {/* Status indicators (gameboy style) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-sun-glare"></div>
            <div className="w-1 h-3 bg-sun-glare"></div>
            <div className="w-1 h-3 bg-sun-glare"></div>
            <div className="w-1 h-3 bg-sun-glare/50"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4" />
        </div>
        
        <div className="flex items-center gap-1">
          <Battery className="w-4 h-4" />
          <span className="text-xs">85%</span>
        </div>
        
        <div className="text-sm font-mono">
          {new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
