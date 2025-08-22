import React, { useState } from 'react'
import { ArrowLeft, User, Edit, Save, X, Users, MessageCircle, Heart } from 'lucide-react'

interface ProfileAppProps {
  onBackToHome: () => void
}

const ProfileApp: React.FC<ProfileAppProps> = ({ onBackToHome }) => {
  const [viewMode, setViewMode] = useState<'my-profile' | 'edit-profile' | 'messages' | 'followers' | 'following' | 'requests'>('my-profile')
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Ahmad Rahman',
    username: '@ahmadrahman_my',
    university: 'Seoul National University',
    major: 'Computer Science',
    year: 'Year 3',
    location: 'Seoul, South Korea',
    bio: 'Malaysian student passionate about technology and Korean culture. Love to connect with fellow Malaysians!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: 156,
    following: 89,
    posts: 23,
    github: 'github.com/ahmadrahman',
    instagram: 'instagram.com/ahmad_my',
    linkedin: 'linkedin.com/in/ahmadrahman'
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
          <h1 className="text-xl font-bold pixel-text">MY PROFILE</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-exuberant-orange text-cloud-dancer px-4 py-2 rounded pixel-text font-bold border-2 border-cloud-dancer hover:bg-sun-glare hover:text-darkest-hour transition-colors"
        >
          {isEditing ? <Save size={16} /> : <Edit size={16} />}
          <span className="ml-2">{isEditing ? 'SAVE' : 'EDIT'}</span>
        </button>
      </div>

      <div className="p-6">
        {/* Profile Header */}
        <div className="bg-cloud-dancer border-4 border-darkest-hour p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 border-4 border-darkest-hour overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-exuberant-orange text-cloud-dancer border-2 border-darkest-hour flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-colors">
                  <Edit size={14} />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    className="text-2xl pixel-text font-bold text-darkest-hour bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <h1 className="text-2xl pixel-text font-bold text-darkest-hour">{profile.name}</h1>
                )}
                <p className="pixel-text text-darkest-hour/70">{profile.username}</p>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-xl pixel-text font-bold text-darkest-hour">{profile.posts}</div>
                  <div className="text-sm pixel-text text-darkest-hour/70">POSTS</div>
                </div>
                <div className="text-center">
                  <div className="text-xl pixel-text font-bold text-darkest-hour">{profile.followers}</div>
                  <div className="text-sm pixel-text text-darkest-hour/70">FOLLOWERS</div>
                </div>
                <div className="text-center">
                  <div className="text-xl pixel-text font-bold text-darkest-hour">{profile.following}</div>
                  <div className="text-sm pixel-text text-darkest-hour/70">FOLLOWING</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-violet text-cloud-dancer py-2 px-4 border-2 border-darkest-hour pixel-text font-bold hover:bg-darkest-hour transition-colors">
                  <MessageCircle size={16} className="inline mr-2" />
                  MESSAGE
                </button>
                <button className="flex-1 bg-exuberant-orange text-cloud-dancer py-2 px-4 border-2 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors">
                  <Users size={16} className="inline mr-2" />
                  FOLLOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="bg-cloud-dancer border-4 border-darkest-hour p-4">
            <h3 className="pixel-text font-bold text-darkest-hour mb-3">ABOUT</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                className="w-full p-2 border-2 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text resize-none"
                rows={3}
              />
            ) : (
              <p className="pixel-text text-darkest-hour leading-relaxed">{profile.bio}</p>
            )}
          </div>

          <div className="bg-cloud-dancer border-4 border-darkest-hour p-4">
            <h3 className="pixel-text font-bold text-darkest-hour mb-3">EDUCATION</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">UNIVERSITY:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.university}
                    onChange={(e) => handleProfileUpdate('university', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <span className="pixel-text text-darkest-hour font-bold">{profile.university}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">MAJOR:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.major}
                    onChange={(e) => handleProfileUpdate('major', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <span className="pixel-text text-darkest-hour font-bold">{profile.major}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">YEAR:</span>
                {isEditing ? (
                  <select
                    value={profile.year}
                    onChange={(e) => handleProfileUpdate('year', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  >
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                ) : (
                  <span className="pixel-text text-darkest-hour font-bold">{profile.year}</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-cloud-dancer border-4 border-darkest-hour p-4">
            <h3 className="pixel-text font-bold text-darkest-hour mb-3">SOCIAL LINKS</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">GITHUB:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.github}
                    onChange={(e) => handleProfileUpdate('github', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="pixel-text text-blue-violet font-bold hover:opacity-80 transition-opacity">
                    {profile.github}
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">INSTAGRAM:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.instagram}
                    onChange={(e) => handleProfileUpdate('instagram', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <a href={`https://${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="pixel-text text-blue-violet font-bold hover:opacity-80 transition-opacity">
                    {profile.instagram}
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="pixel-text text-darkest-hour/70">LINKEDIN:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={(e) => handleProfileUpdate('linkedin', e.target.value)}
                    className="text-darkest-hour pixel-text font-bold bg-transparent border-b-2 border-darkest-hour outline-none"
                  />
                ) : (
                  <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="pixel-text text-blue-violet font-bold hover:opacity-80 transition-opacity">
                    {profile.linkedin}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileApp
