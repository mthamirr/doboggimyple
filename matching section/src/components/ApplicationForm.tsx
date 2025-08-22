import React, { useState } from 'react'
import { ArrowLeft, Send, User, FileText, MessageCircle, Star } from 'lucide-react'

interface ApplicationFormProps {
  eventTitle: string
  organizerName: string
  onBack: () => void
  onSubmit: (application: { reason: string; experience: string; expectations: string }) => void
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  eventTitle, 
  organizerName, 
  onBack, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    expectations: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(formData)
    setIsSubmitting(false)
  }

  const isFormValid = formData.reason.trim().length >= 20 && 
                     formData.experience.trim().length >= 10 && 
                     formData.expectations.trim().length >= 10

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="bg-darkest-hour text-white p-3 rounded-lg mr-4 hover:bg-gray-800 transition-colors border-2 border-darkest-hour"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-darkest-hour tracking-wide">APPLICATION FORM</h1>
          <p className="text-sun-glare font-bold">Apply to join: {eventTitle}</p>
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-blue-50 border-4 border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-3">
          <User className="w-5 h-5 mr-2 text-blue-800" />
          <span className="font-bold text-blue-800">Organizer: {organizerName}</span>
        </div>
        <p className="text-blue-700 text-sm">
          Your application will be reviewed by the organizer. Please provide thoughtful responses to increase your chances of acceptance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Why do you want to join? */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            WHY DO YOU WANT TO JOIN THIS EVENT?
          </h2>
          <textarea
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            placeholder="Share your motivation for joining this event. What interests you about it? How does it align with your goals as a Malaysian student in Seoul?"
            rows={5}
            className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm font-bold ${formData.reason.length >= 20 ? 'text-green-600' : 'text-red-500'}`}>
              {formData.reason.length}/20 minimum characters
            </span>
            <span className="text-sm text-gray-500 font-bold">
              {formData.reason.length}/500 characters
            </span>
          </div>
        </div>

        {/* Relevant Experience */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            RELEVANT EXPERIENCE OR BACKGROUND
          </h2>
          <textarea
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            placeholder="Tell us about any relevant experience, skills, or background that makes you a good fit for this event. This could include academic background, hobbies, previous similar activities, etc."
            rows={4}
            className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm font-bold ${formData.experience.length >= 10 ? 'text-green-600' : 'text-red-500'}`}>
              {formData.experience.length}/10 minimum characters
            </span>
            <span className="text-sm text-gray-500 font-bold">
              {formData.experience.length}/300 characters
            </span>
          </div>
        </div>

        {/* What do you hope to gain? */}
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
            <Star className="w-6 h-6 mr-2" />
            WHAT DO YOU HOPE TO GAIN FROM THIS EVENT?
          </h2>
          <textarea
            value={formData.expectations}
            onChange={(e) => handleInputChange('expectations', e.target.value)}
            placeholder="What are your expectations? What do you hope to learn, achieve, or experience through this event? How will it help you as a Malaysian student in Seoul?"
            rows={4}
            className="w-full p-4 border-4 border-darkest-hour rounded-lg font-bold tracking-wide focus:outline-none focus:border-sun-glare resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm font-bold ${formData.expectations.length >= 10 ? 'text-green-600' : 'text-red-500'}`}>
              {formData.expectations.length}/10 minimum characters
            </span>
            <span className="text-sm text-gray-500 font-bold">
              {formData.expectations.length}/300 characters
            </span>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-yellow-50 border-4 border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">📝 Application Guidelines</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Be honest and authentic in your responses</li>
            <li>• Provide specific examples when possible</li>
            <li>• Show enthusiasm and genuine interest</li>
            <li>• Applications are reviewed within 24-48 hours</li>
            <li>• You'll be notified via KakaoTalk or WhatsApp</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`px-12 py-4 rounded-lg font-bold text-xl tracking-wide transition-all duration-200 transform border-4 border-darkest-hour shadow-lg flex items-center space-x-3 ${
              isFormValid && !isSubmitting
                ? 'bg-exuberant-orange hover:bg-orange-600 text-white hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>SUBMITTING...</span>
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                <span>SUBMIT APPLICATION</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ApplicationForm
