import React, { useState } from 'react'
import { Users, Plus, Search, Filter, MapPin, Clock, BookOpen, Heart, Star, MessageCircle, GraduationCap } from 'lucide-react'
import MatchingList from './components/MatchingList'
import CreateMatching from './components/CreateMatching'
import MatchingDetail from './components/MatchingDetail'

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

function App() {
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
      university: 'Korea University',
      maxPeople: 12,
      currentPeople: 8,
      createdBy: 'Siti Aisyah',
      createdAt: '5 hours ago',
      tags: ['Badminton', 'Weekend', 'Cross-University'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 2',
      major: 'Business Administration',
      genderPreference: 'mixed'
    },
    {
      id: '3',
      title: 'Malaysian Food Hunt in Seoul',
      type: 'food',
      description: 'Exploring halal Korean food and finding Malaysian ingredients in Seoul. Perfect for homesick Malaysian students!',
      location: 'Itaewon & Myeongdong',
      university: 'Yonsei University',
      maxPeople: 10,
      currentPeople: 6,
      createdBy: 'Raj Kumar',
      createdAt: '1 day ago',
      tags: ['Halal Food', 'Malaysian Cuisine', 'Food Hunt'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 4',
      major: 'International Studies',
      genderPreference: 'mixed'
    },
    {
      id: '4',
      title: 'Sisters Study Circle - Islamic Studies',
      type: 'cultural',
      description: 'A supportive study circle for Malaysian Muslim sisters in Seoul. We discuss Islamic topics, share experiences, and support each other in maintaining our faith while studying abroad.',
      location: 'Seoul Islamic Center',
      university: 'Seoul National University (SNU)',
      maxPeople: 15,
      currentPeople: 8,
      createdBy: 'Nurul Huda',
      createdAt: '2 days ago',
      tags: ['Islamic Studies', 'Sisters Only', 'Faith'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Graduate',
      major: 'Engineering',
      genderPreference: 'female-only'
    },
    {
      id: '5',
      title: 'Brothers Football Team',
      type: 'sports',
      description: 'Malaysian brothers football team looking for new players. We play every Sunday morning at Han River Park. All skill levels welcome!',
      location: 'Han River Park',
      university: 'Hanyang University',
      maxPeople: 20,
      currentPeople: 12,
      createdBy: 'Daniel Lim',
      createdAt: '3 days ago',
      tags: ['Football', 'Brothers', 'Sunday Morning'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 4',
      major: 'Computer Science',
      genderPreference: 'male-only'
    },
    {
      id: '6',
      title: 'Hari Raya Celebration Planning',
      type: 'cultural',
      description: 'Planning a Hari Raya celebration for Malaysian students across Seoul universities. Let\'s celebrate together and make it feel like home!',
      location: 'Seoul Community Center',
      university: 'Ewha Womans University',
      maxPeople: 25,
      currentPeople: 15,
      createdBy: 'Farah Aziz',
      createdAt: '4 days ago',
      tags: ['Hari Raya', 'Cultural', 'Community'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      studentYear: 'Year 3',
      major: 'International Relations',
      genderPreference: 'mixed'
    }
  ]

  const filteredMatchings = mockMatchings.filter(matching => {
    const matchesSearch = matching.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matching.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matching.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         matching.university.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || matching.type === selectedFilter
    const matchesUniversity = selectedUniversity === 'all' || matching.university === selectedUniversity
    
    return matchesSearch && matchesFilter && matchesUniversity
  })

  const handleViewMatching = (matching: Matching) => {
    setSelectedMatching(matching)
    setCurrentView('detail')
  }

  const handleCreateMatching = () => {
    setCurrentView('create')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedMatching(null)
  }

  return (
    <div className="min-h-screen bg-cloud-dancer font-pixel">
      {/* Header */}
      <header className="bg-darkest-hour text-cloud-dancer border-b-4 border-sun-glare">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-sun-glare rounded-lg flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-darkest-hour" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider">MALAYSIAN SEOUL</h1>
                <p className="text-sm text-sun-glare">Malaysian Students in Seoul Universities</p>
              </div>
            </div>
            
            {currentView === 'list' && (
              <button
                onClick={handleCreateMatching}
                className="bg-exuberant-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold tracking-wide transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 border-2 border-darkest-hour shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>CREATE EVENT</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'list' && (
          <>
            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-darkest-hour w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, universities, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-4 border-darkest-hour rounded-lg text-darkest-hour placeholder-gray-500 font-bold tracking-wide focus:outline-none focus:border-sun-glare transition-colors"
                />
              </div>
              
              {/* University Filter */}
              <div className="mb-4">
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 bg-white border-4 border-darkest-hour rounded-lg text-darkest-hour font-bold tracking-wide focus:outline-none focus:border-sun-glare"
                >
                  <option value="all">ALL UNIVERSITIES</option>
                  {seoulUniversities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'all', label: 'ALL', icon: Filter },
                  { key: 'study', label: 'STUDY', icon: BookOpen },
                  { key: 'sports', label: 'SPORTS', icon: Heart },
                  { key: 'food', label: 'FOOD', icon: Star },
                  { key: 'cultural', label: 'CULTURAL', icon: GraduationCap },
                  { key: 'others', label: 'OTHERS', icon: MessageCircle }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedFilter(key)}
                    className={`px-6 py-3 rounded-lg font-bold tracking-wide border-4 transition-all duration-200 flex items-center space-x-2 ${
                      selectedFilter === key
                        ? 'bg-blue-violet text-white border-darkest-hour'
                        : 'bg-white text-darkest-hour border-darkest-hour hover:bg-sun-glare'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <MatchingList 
              matchings={filteredMatchings} 
              onViewMatching={handleViewMatching}
            />
          </>
        )}

        {currentView === 'create' && (
          <CreateMatching onBack={handleBackToList} universities={seoulUniversities} />
        )}

        {currentView === 'detail' && selectedMatching && (
          <MatchingDetail 
            matching={selectedMatching} 
            onBack={handleBackToList}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-darkest-hour text-cloud-dancer mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sun-glare font-bold tracking-wide">
              CONNECTING MALAYSIAN STUDENTS ACROSS SEOUL UNIVERSITIES
            </p>
            <div className="mt-4 flex justify-center space-x-8">
              <span className="text-sm">STUDY TOGETHER</span>
              <span className="text-sm">•</span>
              <span className="text-sm">CULTURAL EVENTS</span>
              <span className="text-sm">•</span>
              <span className="text-sm">BUILD COMMUNITY</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              🇲🇾 Malaysian Students • 🇰🇷 Seoul Universities • 🤝 Building Connections
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
