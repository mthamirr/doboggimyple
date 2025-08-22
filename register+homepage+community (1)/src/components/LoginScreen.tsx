import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface LoginScreenProps {
  onComplete: (userData: { name: string; gender: string; avatar: string }) => void
  onGoToRegistration: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onComplete, onGoToRegistration }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL IS REQUIRED'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'INVALID EMAIL FORMAT'
    }

    if (!formData.password) {
      newErrors.password = 'PASSWORD IS REQUIRED'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const extractNameFromEmail = (email: string): string => {
    const namePart = email.split('@')[0]
    return namePart
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .toUpperCase()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoggingIn(true)
      
      setTimeout(() => {
        const extractedName = extractNameFromEmail(formData.email)
        
        const userData = {
          name: extractedName,
          gender: 'female',
          avatar: '👩‍🎓'
        }
        
        onComplete(userData)
      }, 2000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isLoggingIn) {
    return (
      <div className="min-h-screen bg-darkest-hour flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-cloud-dancer pixel-border p-8 mb-6">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="pixel-text-lg text-darkest-hour font-black mb-4">LOGGING IN...</h2>
            <div className="flex justify-center space-x-1">
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <p className="pixel-text text-cloud-dancer">WELCOME BACK TO MYPLE!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-darkest-hour p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎮</div>
          <h1 className="pixel-text-lg text-sun-glare font-black mb-2">WELCOME BACK</h1>
          <p className="pixel-text text-cloud-dancer">LOGIN TO MYPLE COMMUNITY</p>
        </div>

        {/* Login Form */}
        <div className="bg-cloud-dancer pixel-card">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* FIXED: Email Field - Proper Input Containment */}
            <div>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <div className="flex items-center p-3">
                  <Mail className="w-4 h-4 text-darkest-hour mr-3 flex-shrink-0" />
                  <span className="pixel-text text-darkest-hour font-black mr-3 flex-shrink-0 text-xs">EMAIL</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none pixel-text text-darkest-hour text-xs"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>
              {errors.email && <p className="pixel-text text-exuberant-orange mt-1 text-xs">{errors.email}</p>}
            </div>

            {/* FIXED: Password Field - Proper Input Containment */}
            <div>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <div className="flex items-center p-3">
                  <Lock className="w-4 h-4 text-darkest-hour mr-3 flex-shrink-0" />
                  <span className="pixel-text text-darkest-hour font-black mr-3 flex-shrink-0 text-xs">PASSWORD</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none pixel-text text-darkest-hour text-xs"
                    style={{ maxWidth: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 flex-shrink-0"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-darkest-hour" /> : <Eye className="w-4 h-4 text-darkest-hour" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="pixel-text text-exuberant-orange mt-1 text-xs">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full pixel-btn-primary py-4 flex items-center justify-center space-x-2 mt-6"
            >
              <span className="pixel-text font-black">LOGIN TO MYPLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Don't have account yet */}
        <div className="text-center mt-6">
          <button 
            onClick={onGoToRegistration}
            className="pixel-text text-blue-violet hover:text-sun-glare transition-none"
          >
            DON'T HAVE ACCOUNT YET?
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button className="pixel-text text-exuberant-orange hover:text-sun-glare transition-none">
            FORGOT PASSWORD?
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="pixel-text text-cloud-dancer opacity-75">MYPLE STUDENT COMMUNITY</p>
          <p className="pixel-text text-cloud-dancer opacity-50">POWERED BY DOBOGGI • 2025</p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
