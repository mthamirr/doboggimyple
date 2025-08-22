import React, { useState } from 'react'
import { ArrowLeft, Users, Clock, CheckCircle, XCircle, MessageCircle, User, FileText, Star, Eye, Mail, Phone } from 'lucide-react'

interface Application {
  id: string
  applicantName: string
  applicantAvatar: string
  university: string
  studentYear: string
  major: string
  appliedAt: string
  status: 'pending' | 'approved' | 'rejected'
  reason: string
  experience: string
  expectations: string
  contact: {
    email: string
    kakaoId: string
    whatsapp: string
  }
}

interface OrganizerDashboardProps {
  eventTitle: string
  eventId: string
  onBack: () => void
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ 
  eventTitle, 
  eventId, 
  onBack 
}) => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  // Mock applications data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      applicantName: 'Sarah Lim',
      applicantAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      university: 'Yonsei University',
      studentYear: 'Year 2',
      major: 'International Studies',
      appliedAt: '2 hours ago',
      status: 'pending',
      reason: 'I am very interested in improving my Korean language skills and connecting with fellow Malaysian students. As someone who struggles with speaking Korean confidently, I believe this study group would provide the perfect supportive environment to practice.',
      experience: 'I have been studying Korean for 1 year and passed TOPIK Level 2. I also participate in language exchange programs at my university.',
      expectations: 'I hope to improve my conversational Korean and make lasting friendships with Malaysian students who share similar experiences studying abroad.',
      contact: {
        email: 'sarah.lim@yonsei.ac.kr',
        kakaoId: 'sarah_lim_my',
        whatsapp: '+82-10-1234-5678'
      }
    },
    {
      id: '2',
      applicantName: 'Ahmad Faiz',
      applicantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      university: 'Korea University',
      studentYear: 'Year 3',
      major: 'Computer Science',
      appliedAt: '5 hours ago',
      status: 'pending',
      reason: 'Korean language is essential for my future career in Korea. I want to join this group because I learn better in a collaborative environment with people who understand the challenges of being international students.',
      experience: 'I have basic Korean skills and have been taking Korean classes at my university. I also watch Korean dramas to improve my listening skills.',
      expectations: 'I want to reach TOPIK Level 4 by the end of this year and feel more confident speaking Korean in professional settings.',
      contact: {
        email: 'ahmad.faiz@korea.ac.kr',
        kakaoId: 'faiz_ahmad_my',
        whatsapp: '+82-10-2345-6789'
      }
    },
    {
      id: '3',
      applicantName: 'Priya Devi',
      applicantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      university: 'Seoul National University (SNU)',
      studentYear: 'Year 4',
      major: 'Engineering',
      appliedAt: '1 day ago',
      status: 'approved',
      reason: 'I have been looking for a Korean study group specifically for Malaysian students. I believe we can support each other better since we share similar cultural backgrounds and challenges.',
      experience: 'I have TOPIK Level 3 and have been in Korea for 3 years. I often help junior Malaysian students with Korean language basics.',
      expectations: 'I want to achieve native-level fluency and also help other Malaysian students improve their Korean skills.',
      contact: {
        email: 'priya.devi@snu.ac.kr',
        kakaoId: 'priya_devi_my',
        whatsapp: '+82-10-3456-7890'
      }
    }
  ])

  const handleApplicationAction = (applicationId: string, action: 'approve' | 'reject') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' }
          : app
      )
    )
    setSelectedApplication(null)
  }

  const filteredApplications = applications.filter(app => app.status === selectedTab)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTabCount = (status: 'pending' | 'approved' | 'rejected') => {
    return applications.filter(app => app.status === status).length
  }

  if (selectedApplication) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setSelectedApplication(null)}
            className="bg-darkest-hour text-white p-3 rounded-lg mr-4 hover:bg-gray-800 transition-colors border-2 border-darkest-hour"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-darkest-hour tracking-wide">APPLICATION DETAILS</h1>
            <p className="text-sun-glare font-bold">{selectedApplication.applicantName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedApplication.applicantAvatar}
                  alt={selectedApplication.applicantName}
                  className="w-16 h-16 rounded-full border-4 border-darkest-hour"
                />
                <div>
                  <h3 className="text-xl font-bold text-darkest-hour">{selectedApplication.applicantName}</h3>
                  <p className="text-gray-600 font-bold">{selectedApplication.studentYear} • {selectedApplication.major}</p>
                  <p className="text-sm text-gray-500 font-bold">{selectedApplication.university}</p>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="font-bold text-sm">Applied {selectedApplication.appliedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Responses */}
            <div className="space-y-6">
              <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
                <h3 className="text-lg font-bold text-darkest-hour mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WHY THEY WANT TO JOIN
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedApplication.reason}</p>
              </div>

              <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
                <h3 className="text-lg font-bold text-darkest-hour mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  RELEVANT EXPERIENCE
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedApplication.experience}</p>
              </div>

              <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
                <h3 className="text-lg font-bold text-darkest-hour mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  EXPECTATIONS
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedApplication.expectations}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            {selectedApplication.status === 'pending' && (
              <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
                <h3 className="text-lg font-bold text-darkest-hour mb-4">REVIEW APPLICATION</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleApplicationAction(selectedApplication.id, 'approve')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-darkest-hour"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>APPROVE</span>
                  </button>
                  <button
                    onClick={() => handleApplicationAction(selectedApplication.id, 'reject')}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-darkest-hour"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>REJECT</span>
                  </button>
                </div>
              </div>
            )}

            {/* Contact Info */}
            {selectedApplication.status === 'approved' && (
              <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
                <h3 className="text-lg font-bold text-darkest-hour mb-4">CONTACT INFORMATION</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm font-bold">{selectedApplication.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-bold">KakaoTalk: {selectedApplication.contact.kakaoId}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm font-bold">WhatsApp: {selectedApplication.contact.whatsapp}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Status */}
            <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
              <h3 className="text-lg font-bold text-darkest-hour mb-4">APPLICATION STATUS</h3>
              <div className={`px-4 py-2 rounded-full font-bold text-sm text-center ${getStatusColor(selectedApplication.status)}`}>
                {selectedApplication.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="bg-darkest-hour text-white p-3 rounded-lg mr-4 hover:bg-gray-800 transition-colors border-2 border-darkest-hour"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-darkest-hour tracking-wide">ORGANIZER DASHBOARD</h1>
          <p className="text-sun-glare font-bold">Managing applications for: {eventTitle}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">PENDING APPLICATIONS</p>
              <p className="text-3xl font-bold text-yellow-600">{getTabCount('pending')}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">APPROVED</p>
              <p className="text-3xl font-bold text-green-600">{getTabCount('approved')}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white border-4 border-darkest-hour rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">REJECTED</p>
              <p className="text-3xl font-bold text-red-600">{getTabCount('rejected')}</p>
            </div>
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { key: 'pending', label: 'PENDING', count: getTabCount('pending') },
          { key: 'approved', label: 'APPROVED', count: getTabCount('approved') },
          { key: 'rejected', label: 'REJECTED', count: getTabCount('rejected') }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key as 'pending' | 'approved' | 'rejected')}
            className={`px-6 py-3 rounded-lg font-bold tracking-wide border-4 transition-all duration-200 flex items-center space-x-2 ${
              selectedTab === key
                ? 'bg-blue-violet text-white border-darkest-hour'
                : 'bg-white text-darkest-hour border-darkest-hour hover:bg-sun-glare'
            }`}
          >
            <span>{label}</span>
            <span className="bg-white text-darkest-hour px-2 py-1 rounded-full text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sun-glare rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-darkest-hour" />
            </div>
            <h3 className="text-2xl font-bold text-darkest-hour mb-4 tracking-wide">
              NO {selectedTab.toUpperCase()} APPLICATIONS
            </h3>
            <p className="text-gray-600 font-bold">
              {selectedTab === 'pending' ? 'New applications will appear here' : `No ${selectedTab} applications yet`}
            </p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white border-4 border-darkest-hour rounded-lg p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={application.applicantAvatar}
                    alt={application.applicantName}
                    className="w-12 h-12 rounded-full border-2 border-darkest-hour"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-darkest-hour">{application.applicantName}</h3>
                    <p className="text-sm text-gray-600 font-bold">
                      {application.studentYear} • {application.major} • {application.university}
                    </p>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="text-xs font-bold">Applied {application.appliedAt}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full font-bold text-xs ${getStatusColor(application.status)}`}>
                    {application.status.toUpperCase()}
                  </div>
                  
                  <button
                    onClick={() => setSelectedApplication(application)}
                    className="bg-blue-violet hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 flex items-center space-x-2 border-2 border-darkest-hour"
                  >
                    <Eye className="w-4 h-4" />
                    <span>VIEW</span>
                  </button>
                  
                  {application.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApplicationAction(application.id, 'approve')}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-200 border-2 border-darkest-hour"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApplicationAction(application.id, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 border-2 border-darkest-hour"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <p className="text-sm text-gray-700 line-clamp-2">
                  <strong>Why they want to join:</strong> {application.reason}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrganizerDashboard
