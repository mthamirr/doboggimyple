import React, { useState } from 'react'
import { ArrowLeft, MapPin, Users, Clock, BookOpen, Heart, Star, MessageCircle, GraduationCap, Tag, Calendar, Building, User, Settings, UserCheck } from 'lucide-react'
import ApplicationForm from './ApplicationForm'
import OrganizerDashboard from './OrganizerDashboard'

interface Matching {
  id: string
  title: string
  type: 'study' | 'sports' | 'food' | 'cultural' | 'others'
  description: string
  location: string
  university: string
  maxPeople: number
  currentPeople: number
  createdBy: string
  createdAt: string
  tags: string[]
  avatar: string
  studentYear: string
  major: string
  genderPreference: 'mixed' | 'male-only' | 'female-only'
}

interface MatchingDetailProps {
  matching: Matching
  onBack: () => void
}

const MatchingDetail: React.FC<MatchingDetailProps> = ({ matching, onBack }) => {
  const [currentView, setCurrentView] = useState<'detail' | 'apply' | 'dashboard'>('detail')
  const [hasApplied, setHasApplied] = useState(false)
  
  // Mock: Check if current user is the organizer
  const isOrganizer = matching.createdBy === 'Ahmad Zikri' // This would be dynamic in real app

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return BookOpen
      case 'sports': return Heart
      case 'food': return Star
      case 'cultural': return GraduationCap
      case 'others': return MessageCircle
      default: return MessageCircle
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-blue-violet'
      case 'sports': return 'bg-exuberant-orange'
      case 'food': return 'bg-sun-glare text-darkest-hour'
      case 'cultural': return 'bg-green-500'
      case 'others': return 'bg-darkest-hour'
      default: return 'bg-darkest-hour'
    }
  }

  const getGenderColor = (genderPreference: string) => {
    switch (genderPreference) {
      case 'mixed': return 'bg-blue-500 text-white'
      case 'male-only': return 'bg-indigo-600 text-white'
      case 'female-only': return 'bg-pink-600 text-white'
      default: return 'bg-blue-500 text-white'
    }
  }

  const getGenderLabel = (genderPreference: string) => {
    switch (genderPreference) {
      case 'mixed': return 'MIXED GENDER'
      case 'male-only': return 'MALE ONLY'
      case 'female-only': return 'FEMALE ONLY'
      default: return 'MIXED GENDER'
    }
  }

  const getGenderDescription = (genderPreference: string) => {
    switch (genderPreference) {
      case 'mixed': return 'Open to all genders'
      case 'male-only': return 'Male participants only'
      case 'female-only': return 'Female participants only'
      default: return 'Open to all genders'
    }
  }

  const TypeIcon = getTypeIcon(matching.type)
  const typeColor = getTypeColor(matching.type)
  const genderColor = getGenderColor(matching.genderPreference)
  const genderLabel = getGenderLabel(matching.genderPreference)
  const genderDescription = getGenderDescription(matching.genderPreference)

  const handleApply = () => {
    setCurrentView('apply')
  }

  const handleApplicationSubmit = (applicationData: any) => {
    console.log('Application submitted:', applicationData)
    setHasApplied(true)
    setCurrentView('detail')
    alert('Application submitted successfully! The organizer will review it and contact you soon.')
  }

  const handleManageApplications = () => {
    setCurrentView('dashboard')
  }

  const handleBackToDetail = () => {
    setCurrentView('detail')
  }

  if (currentView === 'apply') {
    return (
      <ApplicationForm
        eventTitle={matching.title}
        organizerName={matching.createdBy}
        onBack={handleBackToDetail}
        onSubmit={handleApplicationSubmit}
      />
    )
  }

  if (currentView === 'dashboard') {
    return (
      <OrganizerDashboard
        eventTitle={matching.title}
        eventId={matching.id}
        onBack={handleBackToDetail}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="bg-darkest-hour text-white p-3 rounded-lg mr-4 hover:bg-gray-800 transition-colors border-2 border-darkest-hour"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-darkest-hour tracking-wide">EVENT DETAILS</h1>
            <p className="text-sun-glare font-bold">Join fellow Malaysian students in Seoul!</p>
          </div>
        </div>

        {/* Organizer Actions */}
        {isOrganizer && (
          <button
            onClick={handleManageApplications}
            className="bg-blue-violet hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 border-2 border-darkest-hour shadow-lg"
          >
            <Settings className="w-5 h-5" />
            <span>MANAGE APPLICATIONS</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-lg ${typeColor} text-white`}>
                  <TypeIcon className="w-8 h-8" />
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${genderColor}`}>
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4" />
                    <span>{genderLabel}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-darkest-hour font-bold text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{matching.currentPeople}/{matching.maxPeople} JOINED</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2 border-2 border-darkest-hour">
                  <div 
                    className="bg-sun-glare h-full rounded-full transition-all duration-300"
                    style={{ width: `${(matching.currentPeople / matching.maxPeople) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-darkest-hour mb-4 tracking-wide">
              {matching.title}
            </h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Building className="w-5 h-5 mr-2" />
                <span className="font-bold">{matching.university}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-bold">{matching.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <UserCheck className="w-5 h-5 mr-2" />
                <span className="font-bold">{genderDescription}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {matching.description}
              </p>
            </div>
          </div>

          {/* Gender Preference Info */}
          <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
            <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
              <UserCheck className="w-6 h-6 mr-2" />
              PARTICIPANT REQUIREMENTS
            </h2>
            <div className={`p-4 rounded-lg ${genderColor} mb-4`}>
              <div className="flex items-center space-x-3">
                <UserCheck className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">{genderLabel}</h3>
                  <p className="text-sm opacity-90">{genderDescription}</p>
                </div>
              </div>
            </div>
            
            {matching.genderPreference !== 'mixed' && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm font-bold">
                  ⚠️ <strong>Note:</strong> This event has specific gender requirements. 
                  Please ensure you meet the criteria before applying.
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
            <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide flex items-center">
              <Tag className="w-6 h-6 mr-2" />
              TAGS
            </h2>
            <div className="flex flex-wrap gap-3">
              {matching.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-sun-glare text-darkest-hour font-bold rounded-full border-2 border-darkest-hour"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
            <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide">ORGANIZER</h2>
            <div className="flex items-center space-x-4">
              <img
                src={matching.avatar}
                alt={matching.createdBy}
                className="w-16 h-16 rounded-full border-4 border-darkest-hour"
              />
              <div>
                <h3 className="text-lg font-bold text-darkest-hour">{matching.createdBy}</h3>
                <p className="text-gray-600 font-bold">{matching.studentYear} • {matching.major}</p>
                <p className="text-sm text-gray-500 font-bold">{matching.university}</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-bold text-sm">Created {matching.createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-blue-50 border-4 border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-3">🇲🇾 Malaysian Student Community Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Be respectful and inclusive to all Malaysian students</li>
              <li>• Events are open to Malaysian students from all Seoul universities</li>
              <li>• Share cultural experiences and support each other</li>
              <li>• Help newcomers adapt to life in Seoul</li>
              <li>• Respect gender preferences and create safe spaces for everyone</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          {!isOrganizer && (
            <div className="bg-white border-4 border-darkest-hour rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-darkest-hour mb-4 tracking-wide">JOIN THIS EVENT</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-darkest-hour">Available Spots:</span>
                  <span className="font-bold text-exuberant-orange">
                    {matching.maxPeople - matching.currentPeople}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-darkest-hour">Type:</span>
                  <span className="font-bold text-blue-violet uppercase">
                    {matching.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-darkest-hour">Gender:</span>
                  <span className={`font-bold text-xs px-2 py-1 rounded-full ${genderColor}`}>
                    {genderLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-darkest-hour">University:</span>
                  <span className="font-bold text-green-600 text-sm">
                    {matching.university.split(' ')[0]}
                  </span>
                </div>
              </div>

              {hasApplied ? (
                <div className="text-center">
                  <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-bold">✅ APPLICATION SUBMITTED</p>
                    <p className="text-green-700 text-sm mt-1">
                      The organizer will review your application and contact you soon!
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  className="w-full bg-exuberant-orange hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg tracking-wide transition-all duration-200 transform hover:scale-105 border-4 border-darkest-hour shadow-lg"
                >
                  APPLY TO JOIN
                </button>
              )}

              <p className="text-sm text-gray-600 mt-4 text-center font-bold">
                Connect with Malaysian students across Seoul universities
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
            <h3 className="text-lg font-bold text-darkest-hour mb-4 tracking-wide">EVENT INFO</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-violet" />
                  <span className="font-bold text-sm">Participants</span>
                </div>
                <span className="font-bold text-darkest-hour">{matching.currentPeople}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-exuberant-orange" />
                  <span className="font-bold text-sm">Created</span>
                </div>
                <span className="font-bold text-darkest-hour">{matching.createdAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-sun-glare" />
                  <span className="font-bold text-sm">Tags</span>
                </div>
                <span className="font-bold text-darkest-hour">{matching.tags.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-bold text-sm">Organizer Year</span>
                </div>
                <span className="font-bold text-darkest-hour">{matching.studentYear}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserCheck className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-bold text-sm">Gender Req.</span>
                </div>
                <span className="font-bold text-darkest-hour text-xs">
                  {matching.genderPreference === 'mixed' ? 'MIXED' : 
                   matching.genderPreference === 'male-only' ? 'MALE' : 'FEMALE'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-green-50 border-4 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">📱 How to Connect</h3>
            <div className="text-sm text-green-700 space-y-2">
              <p>After your application is approved, you'll receive contact details via:</p>
              <ul className="ml-4 space-y-1">
                <li>• KakaoTalk (most common in Korea)</li>
                <li>• WhatsApp</li>
                <li>• University email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchingDetail
