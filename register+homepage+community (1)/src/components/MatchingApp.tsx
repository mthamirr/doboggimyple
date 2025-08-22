import React, { useState } from 'react'
import { Users, Plus, Search, Filter, MapPin, Clock, BookOpen, Heart, Star, MessageCircle, GraduationCap, ArrowLeft, UserCheck } from 'lucide-react'

interface MatchingAppProps {
  onBackToHome: () => void
}

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

const MatchingApp: React.FC<MatchingAppProps> = ({ onBackToHome }) => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'detail'>('list')
  const [selectedMatching, setSelectedMatching] = useState<Matching | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedUniversity, setSelectedUniversity] = useState<string>('all')

  const seoulUniversities = [
    'Seoul National University (SNU)',
    'Yonsei University',
    'Korea University',
    'Hanyang University',
    'Kyung Hee University',
    'Hongik University',
    'Ewha Womans University',
    'Sogang University',
    'Sungkyunkwan University',
    'Konkuk University'
  ]

  const mockMatchings: Matching[] = [
    {
      id: '1',
      title: 'Korean Language Study Group',
      type: 'study',
      description: 'Weekly Korean language practice sessions for Malaysian students. We focus on conversational Korean and help each other with TOPIK preparation.',
      location: 'Hongdae Area',
      university: 'Hongik University',
      maxPeople: 8,
      currentPeople: 5,
      createdBy: 'Ahmad Zikri',
      createdAt: '2 hours ago',
      tags: ['Korean Language', 'TOPIK', 'Weekly'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 3',
      major: 'Fine Arts',
      genderPreference: 'mixed'
    },
    {
      id: '2',
      title: 'Badminton Club - Cross University',
      type: 'sports',
      description: 'Malaysian badminton enthusiasts from different Seoul universities. We meet every weekend at Olympic Park Sports Complex.',
      location: 'Olympic Park Sports Complex',
      university: 'Yonsei University',
      maxPeople: 12,
      currentPeople: 8,
      createdBy: 'Lim Wei Jie',
      createdAt: '5 hours ago',
      tags: ['Badminton', 'Weekend', 'Cross-University'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 2',
      major: 'Business Administration',
      genderPreference: 'mixed'
    }
  ]

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

  const filteredMatchings = mockMatchings.filter(matching => {
    const matchesSearch = matching.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matching.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedFilter === 'all' || matching.type === selectedFilter
    const matchesUniversity = selectedUniversity === 'all' || matching.university === selectedUniversity
    
    return matchesSearch && matchesType && matchesUniversity
  })

  return (
    <div className="min-h-screen bg-cloud-dancer">
      {/* Header */}
      <div className="bg-darkest-hour text-cloud-dancer p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-blue-violet rounded transition-colors mr-3"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold pixel-text">MATCHING</h1>
        </div>
        <button
          onClick={() => setCurrentView('create')}
          className="bg-exuberant-orange text-cloud-dancer px-4 py-2 rounded pixel-text font-bold border-2 border-cloud-dancer hover:bg-sun-glare hover:text-darkest-hour transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          CREATE
        </button>
      </div>

      {currentView === 'list' && (
        <div className="p-4">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkest-hour w-5 h-5" />
              <input
                type="text"
                placeholder="Search matchings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 pixel-text font-bold focus:outline-none focus:border-blue-violet"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text font-bold focus:outline-none focus:border-blue-violet"
              >
                <option value="all">All Types</option>
                <option value="study">Study</option>
                <option value="sports">Sports</option>
                <option value="food">Food</option>
                <option value="cultural">Cultural</option>
                <option value="others">Others</option>
              </select>

              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text font-bold focus:outline-none focus:border-blue-violet"
              >
                <option value="all">All Universities</option>
                {seoulUniversities.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Matchings List */}
          <div className="space-y-4">
            {filteredMatchings.map((matching) => {
              const TypeIcon = getTypeIcon(matching.type)
              const typeColor = getTypeColor(matching.type)

              return (
                <div
                  key={matching.id}
                  onClick={() => {
                    setSelectedMatching(matching)
                    setCurrentView('detail')
                  }}
                  className="bg-cloud-dancer border-4 border-darkest-hour p-4 cursor-pointer hover:border-blue-violet transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${typeColor} text-cloud-dancer border-2 border-darkest-hour`}>
                        <TypeIcon size={20} />
                      </div>
                      <div>
                        <h3 className="pixel-text font-bold text-darkest-hour text-lg">{matching.title}</h3>
                        <div className="flex items-center space-x-4 text-darkest-hour/70 pixel-text text-sm">
                          <div className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{matching.currentPeople}/{matching.maxPeople}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{matching.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-darkest-hour pixel-text mb-3 leading-relaxed">{matching.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-darkest-hour/70 pixel-text text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{matching.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GraduationCap size={14} />
                        <span>{matching.university}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {matching.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-violet text-cloud-dancer text-xs pixel-text font-bold border-2 border-darkest-hour"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {currentView === 'detail' && selectedMatching && (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('list')}
            className="mb-4 flex items-center text-darkest-hour hover:text-blue-violet transition-colors pixel-text font-bold"
          >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO LIST
          </button>

          <div className="bg-cloud-dancer border-4 border-darkest-hour p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${getTypeColor(selectedMatching.type)} text-cloud-dancer border-2 border-darkest-hour`}>
                  {React.createElement(getTypeIcon(selectedMatching.type), { size: 24 })}
                </div>
                <div>
                  <h1 className="pixel-text font-bold text-darkest-hour text-2xl mb-2">{selectedMatching.title}</h1>
                  <div className="flex items-center space-x-4 text-darkest-hour/70 pixel-text">
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{selectedMatching.currentPeople}/{selectedMatching.maxPeople} people</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{selectedMatching.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="pixel-text font-bold text-darkest-hour mb-2">DESCRIPTION</h3>
                <p className="text-darkest-hour pixel-text leading-relaxed">{selectedMatching.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="pixel-text font-bold text-darkest-hour mb-2">LOCATION</h3>
                  <div className="flex items-center space-x-2 text-darkest-hour pixel-text">
                    <MapPin size={16} />
                    <span>{selectedMatching.location}</span>
                  </div>
                </div>
                <div>
                  <h3 className="pixel-text font-bold text-darkest-hour mb-2">UNIVERSITY</h3>
                  <div className="flex items-center space-x-2 text-darkest-hour pixel-text">
                    <GraduationCap size={16} />
                    <span>{selectedMatching.university}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="pixel-text font-bold text-darkest-hour mb-2">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMatching.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-violet text-cloud-dancer pixel-text font-bold border-2 border-darkest-hour"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-exuberant-orange text-cloud-dancer py-3 px-6 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors">
                  JOIN MATCHING
                </button>
                <button className="flex-1 bg-blue-violet text-cloud-dancer py-3 px-6 border-4 border-darkest-hour pixel-text font-bold hover:bg-darkest-hour transition-colors">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'create' && (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('list')}
            className="mb-4 flex items-center text-darkest-hour hover:text-blue-violet transition-colors pixel-text font-bold"
          >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO LIST
          </button>

          <div className="bg-cloud-dancer border-4 border-darkest-hour p-6">
            <h2 className="pixel-text font-bold text-darkest-hour text-xl mb-6">CREATE NEW MATCHING</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">TITLE</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                  placeholder="Enter matching title..."
                />
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">TYPE</label>
                <select className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet">
                  <option value="study">Study</option>
                  <option value="sports">Sports</option>
                  <option value="food">Food</option>
                  <option value="cultural">Cultural</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">DESCRIPTION</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet resize-none"
                  placeholder="Describe your matching..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">LOCATION</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                    placeholder="Meeting location..."
                  />
                </div>
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">MAX PEOPLE</label>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                    placeholder="Max participants..."
                  />
                </div>
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">UNIVERSITY</label>
                <select className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet">
                  {seoulUniversities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="flex-1 bg-darkest-hour text-cloud-dancer py-3 px-6 border-4 border-darkest-hour pixel-text font-bold hover:bg-blue-violet transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-exuberant-orange text-cloud-dancer py-3 px-6 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors"
                >
                  CREATE MATCHING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchingApp
