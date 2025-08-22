import React, { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface RegistrationScreenProps {
  onComplete: (userData: { name: string; gender: string; avatar: string }) => void
  onBackToLogin: () => void
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onComplete, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    batch: '',
    major: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isRegistering, setIsRegistering] = useState(false)

  const genderOptions = [
    { value: 'male', label: 'MALE', avatar: '👨‍🎓' },
    { value: 'female', label: 'FEMALE', avatar: '👩‍🎓' }
  ]

  const batchOptions = ['B21', 'B22', 'B23', 'B24', 'B25']
  const majorOptions = ['IT', 'ENGINEERING', 'LIFE SCIENCE', 'ANIMATION', 'ARTS', 'BUSINESS']

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'NAME IS REQUIRED'
    } else if (formData.name.length < 2) {
      newErrors.name = 'NAME TOO SHORT'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL IS REQUIRED'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'INVALID EMAIL FORMAT'
    }

    if (!formData.password) {
      newErrors.password = 'PASSWORD IS REQUIRED'
    } else if (formData.password.length < 6) {
      newErrors.password = 'PASSWORD TOO SHORT (MIN 6)'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'PASSWORDS DO NOT MATCH'
    }

    if (!formData.gender) {
      newErrors.gender = 'GENDER IS REQUIRED'
    }

    if (!formData.batch) {
      newErrors.batch = 'BATCH IS REQUIRED'
    }

    if (!formData.major) {
      newErrors.major = 'MAJOR IS REQUIRED'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsRegistering(true)
      
      setTimeout(() => {
        const selectedGender = genderOptions.find(g => g.value === formData.gender)
        
        onComplete({
          name: formData.name.toUpperCase(),
          gender: formData.gender,
          avatar: selectedGender?.avatar || '👨‍🎓'
        })
      }, 2000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isRegistering) {
    return (
      <div className="min-h-screen bg-darkest-hour flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-cloud-dancer pixel-border p-8 mb-6">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="pixel-text-lg text-darkest-hour font-black mb-4">CREATING ACCOUNT...</h2>
            <div className="flex justify-center space-x-1">
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-sun-glare pixel-border-thin pixel-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <p className="pixel-text text-cloud-dancer">WELCOME TO MYPLE COMMUNITY!</p>
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
          <h1 className="pixel-text-lg text-sun-glare font-black mb-2">JOIN MYPLE</h1>
          <p className="pixel-text text-cloud-dancer">CREATE YOUR STUDENT ACCOUNT</p>
        </div>

        {/* Registration Form */}
        <div className="bg-cloud-dancer pixel-card">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* FIXED: Name Field - Proper Input Containment */}
            <div>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <div className="flex items-center p-3">
                  <User className="w-4 h-4 text-darkest-hour mr-3 flex-shrink-0" />
                  <span className="pixel-text text-darkest-hour font-black mr-3 flex-shrink-0 text-xs">FULL NAME</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none pixel-text text-darkest-hour text-xs"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>
              {errors.name && <p className="pixel-text text-exuberant-orange mt-1 text-xs">{errors.name}</p>}
            </div>

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

            {/* FIXED: Confirm Password Field - Proper Input Containment */}
            <div>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <div className="flex items-center p-3">
                  <Lock className="w-4 h-4 text-darkest-hour mr-3 flex-shrink-0" />
                  <span className="pixel-text text-darkest-hour font-black mr-3 flex-shrink-0 text-xs">CONFIRM</span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none pixel-text text-darkest-hour text-xs"
                    style={{ maxWidth: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2 flex-shrink-0"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-darkest-hour" /> : <Eye className="w-4 h-4 text-darkest-hour" />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="pixel-text text-exuberant-orange mt-1 text-xs">{errors.confirmPassword}</p>}
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block pixel-text text-darkest-hour font-black mb-2">
                GENDER
              </label>
              <div className="grid grid-cols-2 gap-2">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('gender', option.value)}
                    className={`p-3 pixel-border-thin text-center transition-none ${
                      formData.gender === option.value
                        ? 'bg-sun-glare text-darkest-hour'
                        : 'bg-darkest-hour text-cloud-dancer hover:bg-blue-violet'
                    }`}
                  >
                    <div className="text-lg mb-1">{option.avatar}</div>
                    <div className="pixel-text font-black">{option.label}</div>
                  </button>
                ))}
              </div>
              {errors.gender && <p className="pixel-text text-exuberant-orange mt-1">{errors.gender}</p>}
            </div>

            {/* FIXED: Batch Selection - Proper Containment */}
            <div>
              <label className="block pixel-text text-darkest-hour font-black mb-2">
                BATCH
              </label>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <select
                  value={formData.batch}
                  onChange={(e) => handleInputChange('batch', e.target.value)}
                  className="w-full p-3 bg-transparent border-none outline-none pixel-text text-darkest-hour font-black appearance-none"
                >
                  <option value="">SELECT BATCH</option>
                  {batchOptions.map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>
              {errors.batch && <p className="pixel-text text-exuberant-orange mt-1">{errors.batch}</p>}
            </div>

            {/* FIXED: Major Selection - Proper Containment */}
            <div>
              <label className="block pixel-text text-darkest-hour font-black mb-2">
                MAJOR
              </label>
              <div className="relative pixel-border-thin bg-white overflow-hidden">
                <select
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full p-3 bg-transparent border-none outline-none pixel-text text-darkest-hour font-black appearance-none"
                >
                  <option value="">SELECT MAJOR</option>
                  {majorOptions.map((major) => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
              {errors.major && <p className="pixel-text text-exuberant-orange mt-1">{errors.major}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full pixel-btn-primary py-4 flex items-center justify-center space-x-2 mt-6"
            >
              <span className="pixel-text font-black">CREATE ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full pixel-btn-secondary py-3 flex items-center justify-center space-x-2 mt-3"
            >
              <span className="pixel-text font-black">BACK TO LOGIN</span>
            </button>
          </form>
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

export default RegistrationScreen
