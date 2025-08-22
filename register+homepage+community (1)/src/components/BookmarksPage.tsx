import React, { useState } from 'react'
import { ArrowLeft, Bookmark, MoreHorizontal, MessageCircle, Share, Flag, X } from 'lucide-react'
import BottomNavigation from './BottomNavigation'
import { Post } from '../types'

interface BookmarksPageProps {
  bookmarkedPosts: Post[]
  onPostClick: (post: Post) => void
  onBackToBoard: () => void
  onReaction: (postId: string, reactionType: string) => void
  onBookmark: (postId: string) => void
  onShare: (post: Post) => void
  onReport: (postId: string, reason: string) => void
  onDeletePost: (postId: string) => void
  currentUser: string
  onBackToHome: () => void // NEW: Add home navigation handler
}

const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarkedPosts,
  onPostClick,
  onBackToBoard,
  onReaction,
  onBookmark,
  onShare,
  onReport,
  onDeletePost,
  currentUser,
  onBackToHome // NEW: Receive home handler
}) => {
  const [showPostMenu, setShowPostMenu] = useState<string | null>(null)
  const [showReportModal, setShowReportModal] = useState<string | null>(null)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [showReportPopup, setShowReportPopup] = useState(false)

  const reactionEmojis = {
    thumbsUp: '👍',
    thumbsDown: '👎', 
    heart: '❤️'
  }

  const handleReactionClick = (postId: string, reactionType: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onReaction(postId, reactionType)
  }

  const handlePostMenuClick = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPostMenu(showPostMenu === postId ? null : postId)
  }

  const handleRemoveBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onBookmark(postId) // This will toggle the bookmark off
    setShowPostMenu(null)
  }

  const handleShareClick = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    onShare(post)
    setShowPostMenu(null)
    setShowSharePopup(true)
    setTimeout(() => setShowSharePopup(false), 3000)
  }

  const handleReportClick = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPostMenu(null)
    setShowReportModal(postId)
  }

  const handleReportSubmit = (postId: string, reason: string) => {
    onReport(postId, reason)
    setShowReportModal(null)
    setShowReportPopup(true)
    setTimeout(() => setShowReportPopup(false), 2000)
  }

  const handleBackClick = () => {
    onBackToBoard()
  }

  const handleCommentsClick = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    onPostClick(post)
  }

  const handlePostClick = (post: Post) => {
    onPostClick(post)
  }

  return (
    <div className="min-h-screen bg-cloud-dancer pb-16">
      {/* Header - Responsive and flexible */}
      <div className="bg-darkest-hour border-b-4 border-darkest-hour safe-area-top">
        <div className="px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <button
                onClick={handleBackClick}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-sun-glare border-2 sm:border-4 border-darkest-hour flex items-center justify-center hover:bg-exuberant-orange hover:text-cloud-dancer transition-none flex-shrink-0"
              >
                <ArrowLeft size={12} className="text-darkest-hour" />
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 text-base sm:text-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-center">📖</span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl text-cloud-dancer font-black truncate text-left">BOOKMARKS</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {bookmarkedPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-sun-glare border-4 border-darkest-hour flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-6 h-6 text-darkest-hour" />
            </div>
            <h3 className="pixel-text-lg text-darkest-hour font-black mb-2 text-center">NO BOOKMARKS YET</h3>
            <p className="pixel-text text-darkest-hour text-center">START BOOKMARKING POSTS YOU WANT TO SAVE!</p>
          </div>
        ) : (
          bookmarkedPosts.map((post) => (
            <div key={post.id} className="relative">
              <div 
                onClick={() => handlePostClick(post)}
                className="bg-cloud-dancer border-4 border-darkest-hour shadow-lg hover:shadow-xl cursor-pointer p-5 transition-none"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">
                      <span className="text-center">{post.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="pixel-text text-darkest-hour font-black text-left">{post.author.toUpperCase()}</span>
                      </div>
                      <span className="pixel-text text-darkest-hour opacity-75 text-left">{post.timestamp.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => handlePostMenuClick(post.id, e)}
                      className="w-10 h-10 bg-blue-violet border-2 border-darkest-hour flex items-center justify-center hover:bg-exuberant-orange transition-none"
                    >
                      <MoreHorizontal size={16} className="text-cloud-dancer" />
                    </button>
                    
                    {/* Post Menu */}
                    {showPostMenu === post.id && (
                      <div className="absolute right-0 top-12 bg-cloud-dancer border-4 border-darkest-hour z-10 min-w-[160px]">
                        <button
                          onClick={(e) => handleRemoveBookmark(post.id, e)}
                          className="w-full text-left px-4 py-3 hover:bg-exuberant-orange hover:text-cloud-dancer flex items-center space-x-3 pixel-text text-darkest-hour font-black"
                        >
                          <X size={12} />
                          <span className="text-left">REMOVE BOOKMARK</span>
                        </button>
                        <button
                          onClick={(e) => handleShareClick(post, e)}
                          className="w-full text-left px-4 py-3 hover:bg-sun-glare flex items-center space-x-3 pixel-text text-darkest-hour font-black border-t-2 border-darkest-hour"
                        >
                          <Share size={12} />
                          <span className="text-left">SHARE</span>
                        </button>
                        <button
                          onClick={(e) => handleReportClick(post.id, e)}
                          className="w-full text-left px-4 py-3 hover:bg-exuberant-orange hover:text-cloud-dancer flex items-center space-x-3 pixel-text text-darkest-hour font-black border-t-2 border-darkest-hour"
                        >
                          <Flag size={12} />
                          <span className="text-left">REPORT</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-5">
                  <h3 className="pixel-text-xl text-darkest-hour font-black mb-4 text-left leading-tight">{post.title.toUpperCase()}</h3>
                  <p className="pixel-text text-darkest-hour leading-relaxed text-left">{post.content.toUpperCase()}</p>
                </div>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-5">
                    <div className="grid gap-2">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full border-2 border-darkest-hour object-cover max-h-64"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Reactions and Stats */}
                <div className="pt-4 border-t-4 border-darkest-hour">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-wrap">
                      {Object.entries(post.reactions).map(([type, count]) => (
                        count > 0 && (
                          <button
                            key={type}
                            onClick={(e) => handleReactionClick(post.id, type, e)}
                            className={`flex items-center space-x-1 px-2 py-1 pixel-text font-black transition-none text-xs ${
                              post.userReaction === type
                                ? 'bg-sun-glare text-darkest-hour border-2 border-darkest-hour'
                                : 'bg-blue-violet text-cloud-dancer border-2 border-darkest-hour hover:bg-exuberant-orange'
                            }`}
                          >
                            <span className="text-center">{reactionEmojis[type as keyof typeof reactionEmojis]}</span>
                            <span className="text-center">{count}</span>
                          </button>
                        )
                      ))}
                    </div>
                    <button
                      onClick={(e) => handleCommentsClick(post, e)}
                      className="flex items-center space-x-2 bg-darkest-hour text-cloud-dancer px-3 py-1 border-2 border-darkest-hour hover:bg-blue-violet transition-none"
                    >
                      <MessageCircle size={12} />
                      <span className="pixel-text font-black text-xs text-center">{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer border-4 border-darkest-hour shadow-lg max-w-sm w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="pixel-text-lg text-darkest-hour font-black text-center">REPORT POST</h3>
                <button
                  onClick={() => setShowReportModal(null)}
                  className="w-8 h-8 bg-exuberant-orange border-2 border-darkest-hour flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
                >
                  <X size={12} className="text-cloud-dancer" />
                </button>
              </div>
              <p className="pixel-text text-darkest-hour mb-6 text-center">WHY ARE YOU REPORTING THIS POST?</p>
              <div className="space-y-2">
                {[
                  'SPAM OR MISLEADING',
                  'INAPPROPRIATE CONTENT',
                  'HARASSMENT OR BULLYING',
                  'FALSE INFORMATION',
                  'OTHER'
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReportSubmit(showReportModal!, reason)}
                    className="w-full text-left p-3 bg-sun-glare hover:bg-exuberant-orange hover:text-cloud-dancer border-2 border-darkest-hour pixel-text text-darkest-hour font-black transition-none"
                  >
                    <span className="text-center block">{reason}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Success Popup */}
      {showSharePopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-sun-glare border-4 border-darkest-hour px-6 py-3 z-50">
          <p className="pixel-text text-darkest-hour font-black text-center">LINK COPIED SUCCESSFULLY!</p>
        </div>
      )}

      {/* Report Popup */}
      {showReportPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-exuberant-orange border-4 border-darkest-hour px-6 py-3 z-50">
          <p className="pixel-text text-cloud-dancer font-black text-center">POST REPORTED SUCCESSFULLY!</p>
        </div>
      )}

      {/* Click outside to close menu */}
      {showPostMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowPostMenu(null)}
        />
      )}

      {/* FIXED: Pass onHomeClick handler to BottomNavigation */}
      <BottomNavigation activeTab="" onHomeClick={onBackToHome} />
    </div>
  )
}

export default BookmarksPage
