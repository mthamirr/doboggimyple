import React, { useState } from 'react'
import { ArrowLeft, Plus, Bookmark, Search, Filter } from 'lucide-react'
import PostCard from './PostCard'
import BottomNavigation from './BottomNavigation'
import { Post } from '../types'

interface CommunityBoardProps {
  posts: Post[]
  onPostClick: (post: Post) => void
  onNewPost: () => void
  onBackToHome: () => void
  onReaction: (postId: string, reactionType: string) => void
  onBookmark: (postId: string) => void
  onShare: (post: Post) => void
  onReport: (postId: string, reason: string) => void
  onViewBookmarks: () => void
  onDeletePost: (postId: string) => void
  bookmarkedCount: number
  boardType: string
  boardTitle: string
  subboards: string[]
  currentUser: string
}

const CommunityBoard: React.FC<CommunityBoardProps> = ({
  posts,
  onPostClick,
  onNewPost,
  onBackToHome,
  onReaction,
  onBookmark,
  onShare,
  onReport,
  onViewBookmarks,
  onDeletePost,
  bookmarkedCount,
  boardType,
  boardTitle,
  subboards,
  currentUser
}) => {
  const [selectedSubboard, setSelectedSubboard] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const getBoardIcon = (boardType: string) => {
    switch (boardType) {
      case 'batch': return '📚'
      case 'major': return '💼'
      case 'fashion': return '👗'
      case 'religion': return '🕌'
      case 'music': return '🎵'
      case 'movie': return '🎬'
      case 'sports': return '🏆'
      case 'mens': return '🛡️'
      case 'womens': return '💖'
      case 'announcements': return '📢'
      default: return '📋'
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSubboard = selectedSubboard === 'ALL' || 
      (boardType === 'batch' && post.batch === selectedSubboard) ||
      (boardType !== 'batch' && selectedSubboard === 'ALL')
    
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSubboard && matchesSearch
  })

  return (
    <div className="min-h-screen bg-cloud-dancer pb-16">
      {/* Header */}
      <div className="bg-darkest-hour border-b-4 border-darkest-hour safe-area-top">
        <div className="px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <button
                onClick={onBackToHome}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-sun-glare pixel-border flex items-center justify-center hover:bg-exuberant-orange hover:text-cloud-dancer transition-none flex-shrink-0"
              >
                <ArrowLeft size={12} className="text-darkest-hour" />
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 text-base sm:text-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-center">{getBoardIcon(boardType)}</span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl text-cloud-dancer font-black truncate text-left">{boardTitle}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-violet pixel-border flex items-center justify-center hover:bg-exuberant-orange transition-none"
              >
                <Search size={12} className="text-cloud-dancer" />
              </button>
              <button
                onClick={onViewBookmarks}
                className="relative w-8 h-8 sm:w-10 sm:h-10 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
              >
                <Bookmark size={12} className="text-cloud-dancer" />
                {bookmarkedCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-sun-glare text-darkest-hour pixel-text-xs font-black pixel-border-thin flex items-center justify-center">
                    {bookmarkedCount}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-2 sm:px-4 pb-2 sm:pb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH POSTS..."
              className="w-full pixel-input py-2 sm:py-3"
            />
          </div>
        )}

        {/* Subboard Filter */}
        {subboards.length > 0 && (
          <div className="px-2 sm:px-4 pb-2 sm:pb-4">
            <div className="flex space-x-2 overflow-x-auto">
              <button
                onClick={() => setSelectedSubboard('ALL')}
                className={`px-3 py-1 sm:px-4 sm:py-2 pixel-border-thin whitespace-nowrap transition-none ${
                  selectedSubboard === 'ALL'
                    ? 'bg-sun-glare text-darkest-hour'
                    : 'bg-blue-violet text-cloud-dancer hover:bg-exuberant-orange'
                }`}
              >
                <span className="pixel-text font-black text-xs sm:text-sm text-center">ALL</span>
              </button>
              {subboards.map((subboard) => (
                <button
                  key={subboard}
                  onClick={() => setSelectedSubboard(subboard)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 pixel-border-thin whitespace-nowrap transition-none ${
                    selectedSubboard === subboard
                      ? 'bg-sun-glare text-darkest-hour'
                      : 'bg-blue-violet text-cloud-dancer hover:bg-exuberant-orange'
                  }`}
                >
                  <span className="pixel-text font-black text-xs sm:text-sm text-center">{subboard}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Posts */}
      <div className="px-4 py-4 space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-sun-glare pixel-border flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{getBoardIcon(boardType)}</span>
            </div>
            <h3 className="pixel-text-lg text-darkest-hour font-black mb-2 text-center">NO POSTS FOUND</h3>
            <p className="pixel-text text-darkest-hour text-center">
              {searchQuery ? 'TRY DIFFERENT SEARCH TERMS' : 'BE THE FIRST TO POST!'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
              onReaction={onReaction}
              onBookmark={onBookmark}
              onShare={onShare}
              onReport={onReport}
              currentUser={currentUser}
              onDeletePost={onDeletePost}
              boardType={boardType}
            />
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onNewPost}
        className="fixed bottom-20 right-4 w-14 h-14 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none z-40"
      >
        <Plus size={24} className="text-cloud-dancer" />
      </button>

      {/* FIXED: Pass onHomeClick handler to BottomNavigation */}
      <BottomNavigation activeTab="" onHomeClick={onBackToHome} />
    </div>
  )
}

export default CommunityBoard
