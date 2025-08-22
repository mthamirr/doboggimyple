import React, { useState } from 'react'
import { ArrowLeft, BookOpen, Heart, Star, MessageCircle, GraduationCap, MapPin, Users, FileText, Tag, Building, UserCheck } from 'lucide-react'

interface CreateMatchingProps {
  onBack: () => void
  universities: string[]
}

const CreateMatching: React.FC<CreateMatchingProps> = ({ onBack, universities }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'study' as 'study' | 'sports' | 'food' | 'cultural' | 'others',
    description: '',
    location: '',
    university: '',
    maxPeople: 2,
    tags: [] as string[],
    newTag: '',
    studentYear: '',
    genderPreference: 'mixed' as 'mixed' | 'male-only' | 'female-only'
  })

  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const typeOptions = [
    { value: 'study', label: 'STUDY', icon: BookOpen, color: 'bg-blue-violet' },
    { value: 'sports', label: 'SPORTS', icon: Heart, color: 'bg-exuberant-orange' },
    { value: 'food', label: 'FOOD', icon: Star, color: 'bg-sun-glare text-darkest-hour' },
    { value: 'cultural', label: 'CULTURAL', icon: GraduationCap, color: 'bg-green-500' },
    { value: 'others', label: 'OTHERS', icon: MessageCircle, color: 'bg-darkest-hour' }
  ]

  const genderOptions = [
    { value: 'mixed', label: 'MIXED GENDER', description: 'Open to all genders', color: 'bg-blue-500' },
    { value: 'male-only', label: 'MALE ONLY', description: 'Male participants only', color: 'bg-indigo-600' },
    { value: 'female-only', label: 'FEMALE ONLY', description: 'Female participants only', color: 'bg-pink-600' }
  ]

  const studentYears = ['Open to All', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduate', 'PhD']

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    // Handle form submission
    console.log('Creating event:', formData)
    onBack()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="bg-darkest-hour text-white p-3 rounded-lg mr-4 hover:bg-gray-800 transition-colors border-2 border-darkest-hour"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-darkest-hour tracking-wide">CREATE NEW EVENT</h1>
          <p className="text-sun-glare font-bold">Connect with fellow Malaysian students in Seoul!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Type */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide">WHAT TYPE OF EVENT?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {typeOptions.map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleInputChange('type', value)}
                className={`p-4 rounded-lg border-4 transition-all duration-200 ${
                  formData.type === value
                    ? `${color} text-white border-darkest-hour`
                    : 'bg-gray-100 text-darkest-hour border-gray-300 hover:border-darkest-hour'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <span className="font-bold text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gender Preference */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
            <UserCheck className="w-6 h-6 mr-2" />
            GENDER PREFERENCE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {genderOptions.map(({ value, label, description, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleInputChange('genderPreference', value)}
                className={`p-4 rounded-lg border-4 transition-all duration-200 text-center ${
                  formData.genderPreference === value
                    ? `${color} text-white border-darkest-hour`
                    : 'bg-gray-100 text-darkest-hour border-gray-300 hover:border-darkest-hour'
                }`}
              >
                <div className="font-bold text-sm mb-1">{label}</div>
                <div className="text-xs opacity-90">{description}</div>
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm font-bold">
              💡 <strong>Note:</strong> Gender preferences help create comfortable environments for all participants. 
              Mixed gender events promote inclusive networking across the Malaysian student community.
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-6 tracking-wide">EVENT DETAILS</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-darkest-hour font-bold mb-2">EVENT TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Korean Language Study Group"
                className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                required
              />
            </div>

            <div>
              <label className="block text-darkest-hour font-bold mb-2">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your event and what participants can expect..."
                rows={4}
                className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-darkest-hour font-bold mb-2 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  YOUR UNIVERSITY
                </label>
                <select
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                  required
                >
                  <option value="">Select your university</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-darkest-hour font-bold mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  MEETING LOCATION
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Hongdae Area, Gangnam Study Cafe"
                  className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-darkest-hour font-bold mb-2 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  MAX PARTICIPANTS
                </label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={formData.maxPeople}
                  onChange={(e) => handleInputChange('maxPeople', parseInt(e.target.value))}
                  className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                  required
                />
              </div>

              <div>
                <label className="block text-darkest-hour font-bold mb-2 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  TARGET STUDENT YEAR
                </label>
                <select
                  value={formData.studentYear}
                  onChange={(e) => handleInputChange('studentYear', e.target.value)}
                  className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                  required
                >
                  <option value="">Select target year</option>
                  {studentYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
            <Tag className="w-6 h-6 mr-2" />
            TAGS
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) => handleInputChange('newTag', e.target.value)}
                placeholder="Add a tag (e.g., Korean Language, Halal Food)..."
                className="flex-1 p-3 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-sun-glare text-darkest-hour px-6 py-3 rounded-lg font-bold border-4 border-darkest-hour hover:bg-yellow-400 transition-colors"
              >
                ADD
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-violet text-white rounded-full font-bold text-sm border-2 border-darkest-hour cursor-pointer hover:bg-purple-600 transition-colors"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 mt-1 border-2 border-darkest-hour rounded focus:ring-sun-glare"
            />
            <label htmlFor="terms" className="text-darkest-hour font-bold">
              I agree to the community guidelines and confirm that this event is for Malaysian students in Seoul universities
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-exuberant-orange hover:bg-orange-600 text-white px-12 py-4 rounded-lg font-bold text-xl tracking-wide transition-all duration-200 transform hover:scale-105 border-4 border-darkest-hour shadow-lg"
          >
            CREATE EVENT
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateMatching
