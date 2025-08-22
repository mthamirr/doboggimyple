import React, { useState } from 'react'
import { MoreHorizontal, MessageCircle, Share, Flag, Bookmark, X, Trash2 } from 'lucide-react'
import { Post } from '../types'

interface PostCardProps {
  post: Post
  onClick: () => void
  onReaction: (postId: string, reactionType: string) => void
  onBookmark: (postId: string) => void
  onShare: (post: Post) => void
  onReport: (postId: string, reason: string) => void
  currentUser: string
  onDeletePost: (postId: string) => void
  boardType?: string
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onClick,
  onReaction,
  onBookmark,
  onShare,
  onReport,
  currentUser,
  onDeletePost,
  boardType
}) => {
  const [showPostMenu, setShowPostMenu] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [showReportPopup, setShowReportPopup] = useState(false)

  // FIXED: Only 3 reactions now
  const reactionEmojis = {
    thumbsUp: '👍',
    thumbsDown: '👎', 
    heart: '❤️'
  }

  const handleReactionClick = (reactionType: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onReaction(post.id, reactionType)
  }

  const handlePostMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPostMenu(!showPostMenu)
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBookmark(post.id)
    setShowPostMenu(false)
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare(post)
    setShowPostMenu(false)
    // Show popup message
    setShowSharePopup(true)
    setTimeout(() => setShowSharePopup(false), 3000)
  }

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPostMenu(false)
    setShowReportModal(true)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDeletePost(post.id)
    setShowPostMenu(false)
  }

  const handleReportSubmit = (reason: string) => {
    onReport(post.id, reason)
    setShowReportModal(false)
    // Show popup message
    setShowReportPopup(true)
    setTimeout(() => setShowReportPopup(false), 2000)
  }

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <div className="relative">
      <div 
        onClick={onClick}
        className="bg-cloud-dancer pixel-card pixel-card-hover cursor-pointer p-5 transition-none"
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
                {/* Smaller batch indicator */}
                {boardType === 'batch' && post.batch && post.batch !== 'N/A' && (
                  <span className="px-1 py-0.5 bg-exuberant-orange text-cloud-dancer pixel-border-thin text-xs font-black">
                    {post.batch}
                  </span>
                )}
              </div>
              <span className="pixel-text text-darkest-hour opacity-75 text-left">{post.timestamp.toUpperCase()}</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={handlePostMenuClick}
              className="w-10 h-10 bg-blue-violet pixel-border flex items-center justify-center hover:bg-exuberant-orange transition-none"
            >
              <MoreHorizontal size={16} className="text-cloud-dancer" />
            </button>
            
            {/* Post Menu */}
            {showPostMenu && (
              <div className="absolute right-0 top-12 bg-cloud-dancer pixel-border z-10 min-w-[160px]">
                <button
                  onClick={handleBookmarkClick}
                  className="w-full text-left px-4 py-3 hover:bg-sun-glare flex items-center space-x-3 pixel-text text-darkest-hour font-black"
                >
                  <Bookmark size={12} />
                  <span className="text-left">{post.isBookmarked ? 'REMOVE BOOKMARK' : 'BOOKMARK'}</span>
                </button>
                <button
                  onClick={handleShareClick}
                  className="w-full text-left px-4 py-3 hover:bg-sun-glare flex items-center space-x-3 pixel-text text-darkest-hour font-black border-t-2 border-darkest-hour"
                >
                  <Share size={12} />
                  <span className="text-left">SHARE</span>
                </button>
                <button
                  onClick={handleReportClick}
                  className="w-full text-left px-4 py-3 hover:bg-exuberant-orange hover:text-cloud-dancer flex items-center space-x-3 pixel-text text-darkest-hour font-black border-t-2 border-darkest-hour"
                >
                  <Flag size={12} />
                  <span className="text-left">REPORT</span>
                </button>
                {/* RESTORED: Delete option for post author */}
                {post.author === 'Anonymous' && (
                  <button
                    onClick={handleDeleteClick}
                    className="w-full text-left px-4 py-3 hover:bg-exuberant-orange hover:text-cloud-dancer flex items-center space-x-3 pixel-text text-darkest-hour font-black border-t-2 border-darkest-hour"
                  >
                    <Trash2 size={12} />
                    <span className="text-left">DELETE</span>
                  </button>
                )}
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
                  className="w-full pixel-border object-cover max-h-64"
                />
              ))}
            </div>
          </div>
        )}

        {/* FIXED: Reactions and Stats - ALWAYS SHOW ALL 3 REACTIONS */}
        <div className="pt-4 border-t-4 border-darkest-hour">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-wrap">
              {/* CRITICAL FIX: Always show all 3 reactions, even with 0 count */}
              {['thumbsUp', 'thumbsDown', 'heart'].map((reactionType) => {
                const count = post.reactions[reactionType as keyof typeof post.reactions] || 0
                return (
                  <button
                    key={reactionType}
                    onClick={(e) => handleReactionClick(reactionType, e)}
                    className={`flex items-center space-x-1 px-2 py-1 pixel-text font-black transition-none text-xs ${
                      post.userReaction === reactionType
                        ? 'bg-sun-glare text-darkest-hour pixel-border'
                        : 'bg-blue-violet text-cloud-dancer pixel-border hover:bg-exuberant-orange'
                    }`}
                  >
                    <span className="text-center">{reactionEmojis[reactionType as keyof typeof reactionEmojis]}</span>
                    <span className="text-center">{count}</span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={handleCommentsClick}
              className="flex items-center space-x-2 bg-darkest-hour text-cloud-dancer px-3 py-1 pixel-border hover:bg-blue-violet transition-none"
            >
              <MessageCircle size={12} />
              <span className="pixel-text font-black text-xs text-center">{post.comments}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer pixel-modal max-w-sm w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="pixel-text-lg text-darkest-hour font-black text-center">REPORT POST</h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-8 h-8 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
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
                    onClick={() => handleReportSubmit(reason)}
                    className="w-full text-left p-3 bg-sun-glare hover:bg-exuberant-orange hover:text-cloud-dancer pixel-border pixel-text text-darkest-hour font-black transition-none"
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-sun-glare pixel-border px-6 py-3 z-50">
          <p className="pixel-text text-darkest-hour font-black text-center">LINK COPIED SUCCESSFULLY!</p>
        </div>
      )}

      {/* Report Popup */}
      {showReportPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-exuberant-orange pixel-border px-6 py-3 z-50">
          <p className="pixel-text text-cloud-dancer font-black text-center">POST REPORTED SUCCESSFULLY!</p>
        </div>
      )}

      {/* Click outside to close menu */}
      {showPostMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowPostMenu(false)}
        />
      )}
    </div>
  )
}

export default PostCard
