import React, { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 800)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative">
      
      {/* Game Controller Rectangle Container - Light Blue */}
      <div className="bg-blue-100 pixel-border-thick p-4 max-w-lg w-full relative shadow-2xl rounded-lg border-4 border-blue-200" style={{ backgroundColor: '#DBEAFE' }}>
        
        {/* Top Screen Section - Purple */}
        <div className="pixel-border-thin p-4 mb-4 rounded-md relative border-2 border-purple-500" style={{ backgroundColor: '#8B5CF6' }}>
          
          {/* Top Screen with PPMK Logo - Bright Green */}
          <div className="pixel-border-thin p-6 relative rounded-sm border-2 border-green-400" style={{ backgroundColor: '#10B981' }}>
            
            {/* PPMK Logo - White Background */}
            <div className="flex justify-center mb-6">
              <div className="relative bg-white rounded-full p-2 shadow-lg border-2 border-yellow-400">
                <img 
                  src="https://cdn.chatandbuild.com/users/68a1eb83397b31fe64962e78/cropped-logo-ppmk-1755622045733-470530532.png" 
                  alt="PPMK Logo" 
                  className="w-16 h-16 object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Game Title */}
            <div className="text-center mb-4">
              <h1 className="pixel-text-lg font-black mb-2 tracking-widest drop-shadow-lg text-purple-800">
                MYPLE
              </h1>
              <div className="pixel-border-thin p-2 border-2 border-orange-400" style={{ backgroundColor: '#F97316' }}>
                <p className="pixel-text text-white text-xs font-bold">
                  MALAYSIAN STUDENT COMMUNITY
                </p>
              </div>
            </div>

            {/* Progress Bar - Purple */}
            <div className="mb-4">
              <div className="bg-white pixel-border-thick h-6 relative overflow-hidden shadow-inner border-2 border-gray-400">
                <div 
                  className="h-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%`, backgroundColor: '#8B5CF6' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="pixel-text text-gray-800 font-black text-xs drop-shadow-sm">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <div className="pixel-border-thin p-2 inline-block border-2 border-orange-400" style={{ backgroundColor: '#F97316' }}>
                <p className="pixel-text text-white font-bold text-xs">
                  LOADING{dots}
                </p>
              </div>
            </div>

          </div>

          {/* Speaker Grilles - Yellow */}
          <div className="absolute top-6 left-6 grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full shadow-sm border border-yellow-500" style={{ backgroundColor: '#EAB308' }}></div>
            ))}
          </div>
          <div className="absolute top-6 right-6 grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full shadow-sm border border-yellow-500" style={{ backgroundColor: '#EAB308' }}></div>
            ))}
          </div>

        </div>

        {/* Bottom Control Section - Purple */}
        <div className="pixel-border-thin p-6 rounded-md relative border-2 border-purple-500" style={{ backgroundColor: '#8B5CF6' }}>
          
          {/* Bottom Screen Area - Dark Gray */}
          <div className="pixel-border-thin h-24 mb-6 rounded-sm relative overflow-hidden border-2 border-gray-600" style={{ backgroundColor: '#374151' }}>
            <div className="absolute inset-2 rounded-sm" style={{ backgroundColor: '#4B5563' }}></div>
            {/* Screen reflection */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-cyan-300 opacity-30 rounded-sm"></div>
          </div>

          {/* Controls Layout - NO D-PAD */}
          <div className="flex justify-between items-center relative">
            
            {/* Left Side - Empty Space (D-pad removed) */}
            <div className="w-16 h-16"></div>

            {/* Center Loading Animation - Orange */}
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 pixel-border-thin animate-pulse rounded-sm border border-orange-500" 
                  style={{ backgroundColor: '#F97316', animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            
            {/* Right Action Buttons - Green and Light Blue */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full pixel-border-thick relative shadow-md border-2 border-green-500" style={{ backgroundColor: '#10B981' }}>
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              </div>
              <div className="w-8 h-8 rounded-full pixel-border-thick relative shadow-md border-2 border-blue-400" style={{ backgroundColor: '#60A5FA' }}>
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            
          </div>

          {/* Power LED - Orange */}
          <div className="absolute bottom-4 left-8 w-3 h-3 rounded-full animate-pulse shadow-lg border-2 border-orange-500" style={{ backgroundColor: '#F97316' }}></div>

        </div>

      </div>

      {/* Footer on Black Background - Green and Light Blue */}
      <div className="mt-8 text-center">
        <div className="pixel-border-thick p-3 inline-block shadow-lg rounded-md border-2 border-gray-500" style={{ backgroundColor: '#374151' }}>
          <p className="pixel-text text-xs font-bold drop-shadow-sm" style={{ color: '#10B981' }}>
            POWERED BY DOBOGGI
          </p>
          <p className="pixel-text text-xs opacity-90 mt-1 drop-shadow-sm" style={{ color: '#60A5FA' }}>
            MALAYSIA • 2025
          </p>
        </div>
      </div>

    </div>
  )
}

export default LoadingScreen
