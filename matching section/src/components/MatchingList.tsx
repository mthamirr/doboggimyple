import React from 'react'
import { MapPin, Users, Clock, BookOpen, Heart, Star, MessageCircle, GraduationCap, Building, UserCheck } from 'lucide-react'

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

interface MatchingListProps {
  matchings: Matching[]
  onViewMatching: (matching: Matching) => void
}

const MatchingList: React.FC<MatchingListProps> = ({ matchings, onViewMatching }) => {
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

  const getGenderIcon = (genderPreference: string) => {
    return UserCheck
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
      case 'mixed': return 'MIXED'
      case 'male-only': return 'MALE ONLY'
      case 'female-only': return 'FEMALE ONLY'
      default: return 'MIXED'
    }
  }

  if (matchings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-sun-glare rounded-lg mx-auto mb-6 flex items-center justify-center">
          <GraduationCap className="w-12 h-12 text-darkest-hour" />
        </div>
        <h3 className="text-2xl font-bold text-darkest-hour mb-4 tracking-wide">NO EVENTS FOUND</h3>
        <p className="text-gray-600 font-bold">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matchings.map((matching) => {
        const TypeIcon = getTypeIcon(matching.type)
        const typeColor = getTypeColor(matching.type)
        const GenderIcon = getGenderIcon(matching.genderPreference)
        const genderColor = getGenderColor(matching.genderPreference)
        const genderLabel = getGenderLabel(matching.genderPreference)
        
        return (
          <div
            key={matching.id}
            className="bg-white border-4 border-darkest-hour rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => onViewMatching(matching)}
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-darkest-hour">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${typeColor} text-white`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${genderColor}`}>
                    <div className="flex items-center space-x-1">
                      <GenderIcon className="w-3 h-3" />
                      <span>{genderLabel}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-darkest-hour font-bold">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{matching.currentPeople}/{matching.maxPeople}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-darkest-hour mb-2 tracking-wide line-clamp-2">
                {matching.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {matching.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="font-bold">{matching.university}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="font-bold">{matching.location}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="p-4 border-b-4 border-darkest-hour">
              <div className="flex flex-wrap gap-2">
                {matching.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sun-glare text-darkest-hour text-xs font-bold rounded-full border-2 border-darkest-hour"
                  >
                    {tag}
                  </span>
                ))}
                {matching.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-200 text-darkest-hour text-xs font-bold rounded-full border-2 border-darkest-hour">
                    +{matching.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={matching.avatar}
                    alt={matching.createdBy}
                    className="w-8 h-8 rounded-full border-2 border-darkest-hour mr-3"
                  />
                  <div>
                    <p className="text-sm font-bold text-darkest-hour">{matching.createdBy}</p>
                    <p className="text-xs text-gray-500">{matching.studentYear} • {matching.major}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="font-bold">{matching.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MatchingList
