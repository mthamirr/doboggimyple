import React, { useState } from 'react'
import { X, ThumbsUp, ThumbsDown, Flag, MessageCircle } from 'lucide-react'
import { Post } from '../types'

interface Reply {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  reactions: {
    thumbsUp: number
    thumbsDown: number
  }
  userReaction: string | null
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  reactions: {
    thumbsUp: number
    thumbsDown: number
  }
  userReaction: string | null
  replies: Reply[]
  showReplyForm: boolean
}

interface PostDetailModalProps {
  post: Post
  onClose: () => void
  onReaction: (postId: string, reactionType: string) => void
  onCommentReaction: (commentId: string, reactionType: string) => void
  onShare: (post: Post) => void
  onReport: (postId: string, reason: string) => void
  onUpdateCommentCount?: (postId: string, newCount: number) => void
  currentUser?: string
  boardType?: string
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onCommentReaction,
  onShare,
  onReport,
  onUpdateCommentCount,
  currentUser = 'Siti Nurhaliza',
  boardType = 'batch'
}) => {
  const [newComment, setNewComment] = useState('')
  const [replyTexts, setReplyTexts] = useState<{[key: string]: string}>({})
  const [showReportModal, setShowReportModal] = useState<{type: 'comment' | 'reply', id: string} | null>(null)
  const [reportReason, setReportReason] = useState('')
  const [showReportPopup, setShowReportPopup] = useState(false)
  
  const [userCounter, setUserCounter] = useState(4)
  const [userMap, setUserMap] = useState<{[key: string]: string}>({
    'Anonymous': 'User 1',
    'User2': 'User 2', 
    'User3': 'User 3'
  })

  // Generate relevant comments based on post content and board type
  const generateRelevantComments = (post: Post, boardType: string): Comment[] => {
    const baseComments: {[key: string]: Comment[]} = {
      'batch-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🎮',
          content: 'Great idea! I\'m also looking for FYP partners. Maybe we can collaborate?',
          timestamp: '2024.01.15 15:30',
          reactions: { thumbsUp: 5, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '1-1',
              author: 'User2',
              avatar: '📚',
              content: 'Count me in! I have experience with React and Node.js.',
              timestamp: '2024.01.15 15:45',
              reactions: { thumbsUp: 2, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '📚',
          content: 'Have you considered machine learning projects? There are many interesting datasets available.',
          timestamp: '2024.01.15 16:45',
          reactions: { thumbsUp: 8, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '3',
          author: 'User3',
          avatar: '🚀',
          content: 'Web development is hot right now. Maybe something with React or Vue.js?',
          timestamp: '2024.01.15 17:20',
          reactions: { thumbsUp: 3, thumbsDown: 1 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        }
      ],
      'batch-2': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '📚',
          content: 'Perfect timing! I really need help with linked lists and trees.',
          timestamp: '2024.01.15 13:00',
          reactions: { thumbsUp: 4, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🎯',
          content: 'Can we also cover dynamic programming? That topic is killing me.',
          timestamp: '2024.01.15 13:15',
          reactions: { thumbsUp: 6, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '⚡',
              content: 'Yes! DP is so confusing. We should definitely include that.',
              timestamp: '2024.01.15 13:30',
              reactions: { thumbsUp: 3, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'major-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🚀',
          content: 'This is huge! Which companies are participating? Any tech startups?',
          timestamp: '2024.01.15 11:30',
          reactions: { thumbsUp: 12, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '💼',
          content: 'Time to update my resume! Anyone want to do mock interviews together?',
          timestamp: '2024.01.15 12:00',
          reactions: { thumbsUp: 8, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '🎯',
              content: 'I\'m in! Let\'s practice common interview questions.',
              timestamp: '2024.01.15 12:15',
              reactions: { thumbsUp: 5, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'fashion-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '✨',
          content: 'Love this! Where exactly is the weekend market? I want to check it out.',
          timestamp: '2024.01.15 15:45',
          reactions: { thumbsUp: 7, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '👗',
          content: 'Those pieces look amazing! Thrifting is so much better than fast fashion.',
          timestamp: '2024.01.15 16:00',
          reactions: { thumbsUp: 9, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '🌱',
              content: 'Exactly! Better for the environment and our wallets.',
              timestamp: '2024.01.15 16:15',
              reactions: { thumbsUp: 4, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'music-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🎸',
          content: 'Finally! I\'ve been waiting for this. Do we need to prepare anything specific for auditions?',
          timestamp: '2024.01.15 16:30',
          reactions: { thumbsUp: 8, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🎤',
          content: 'I\'m planning to perform a traditional Malay song. Anyone else doing cultural music?',
          timestamp: '2024.01.15 17:00',
          reactions: { thumbsUp: 12, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '🥁',
              content: 'That sounds awesome! I might do some Chinese traditional music.',
              timestamp: '2024.01.15 17:15',
              reactions: { thumbsUp: 6, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'sports-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🏸',
          content: 'Count me in for doubles! Anyone looking for a partner?',
          timestamp: '2024.01.15 09:45',
          reactions: { thumbsUp: 6, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🏆',
          content: 'RM2000 prize money is serious! Time to start practicing more.',
          timestamp: '2024.01.15 10:00',
          reactions: { thumbsUp: 9, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '💪',
              content: 'Let\'s form a practice group! We can train together.',
              timestamp: '2024.01.15 10:15',
              reactions: { thumbsUp: 4, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'womens-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '👩‍💻',
          content: 'This is exactly what I needed! As a CS student, I sometimes feel isolated.',
          timestamp: '2024.01.15 14:00',
          reactions: { thumbsUp: 15, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🔬',
          content: 'Love these sessions! Last month\'s discussion about work-life balance was so helpful.',
          timestamp: '2024.01.15 14:15',
          reactions: { thumbsUp: 12, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '⚗️',
              content: 'Yes! And the mentorship program they started is amazing.',
              timestamp: '2024.01.15 14:30',
              reactions: { thumbsUp: 8, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'mens-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '💪',
          content: 'Thank you for organizing this. Mental health is so important but often overlooked.',
          timestamp: '2024.01.15 12:00',
          reactions: { thumbsUp: 18, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🤝',
          content: 'Definitely attending. We need more open conversations like this.',
          timestamp: '2024.01.15 12:15',
          reactions: { thumbsUp: 14, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '🧠',
              content: 'Agreed. The pressure during exam season can be overwhelming.',
              timestamp: '2024.01.15 12:30',
              reactions: { thumbsUp: 9, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'religion-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🕌',
          content: 'JazakAllahu khair for the reminder. See you there!',
          timestamp: '2024.01.15 08:00',
          reactions: { thumbsUp: 8, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '📿',
          content: 'The topic sounds very relevant. Unity is what we need more of.',
          timestamp: '2024.01.15 08:15',
          reactions: { thumbsUp: 6, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        }
      ],
      'movie-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '🎬',
          content: 'Which Malaysian films are you screening? Hope to see some Yasmin Ahmad classics!',
          timestamp: '2024.01.15 14:45',
          reactions: { thumbsUp: 9, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '🍿',
          content: 'Free popcorn? I\'m definitely coming! Love supporting local cinema.',
          timestamp: '2024.01.15 15:00',
          reactions: { thumbsUp: 7, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '🎭',
              content: 'Same! Malaysian films have such unique storytelling.',
              timestamp: '2024.01.15 15:15',
              reactions: { thumbsUp: 5, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ],
      'announcement-1': [
        {
          id: '1',
          author: 'Anonymous',
          avatar: '📝',
          content: 'Thanks for the reminder! Almost forgot about the deadline.',
          timestamp: '2024.01.15 08:30',
          reactions: { thumbsUp: 23, thumbsDown: 0 },
          userReaction: null,
          replies: [],
          showReplyForm: false
        },
        {
          id: '2',
          author: 'User2',
          avatar: '⏰',
          content: 'What are the additional fees for late registration?',
          timestamp: '2024.01.15 09:00',
          reactions: { thumbsUp: 18, thumbsDown: 0 },
          userReaction: null,
          replies: [
            {
              id: '2-1',
              author: 'User3',
              avatar: '💰',
              content: 'I think it\'s RM50 extra. Better to register on time!',
              timestamp: '2024.01.15 09:15',
              reactions: { thumbsUp: 12, thumbsDown: 0 },
              userReaction: null
            }
          ],
          showReplyForm: false
        }
      ]
    }

    // Return relevant comments based on post ID, or default comments
    return baseComments[post.id] || [
      {
        id: '1',
        author: 'Anonymous',
        avatar: '🎮',
        content: 'Great post! Thanks for sharing this information.',
        timestamp: '2024.01.15 15:30',
        reactions: { thumbsUp: 5, thumbsDown: 0 },
        userReaction: null,
        replies: [],
        showReplyForm: false
      },
      {
        id: '2',
        author: 'User2',
        avatar: '📚',
        content: 'This is really helpful. Looking forward to participating!',
        timestamp: '2024.01.15 16:00',
        reactions: { thumbsUp: 3, thumbsDown: 0 },
        userReaction: null,
        replies: [],
        showReplyForm: false
      }
    ]
  }

  const [comments, setComments] = useState<Comment[]>(() => generateRelevantComments(post, boardType))

  const getAnonymousUserName = (originalAuthor: string): string => {
    if (userMap[originalAuthor]) {
      return userMap[originalAuthor]
    }
    
    const newUserName = `User ${userCounter}`
    setUserMap(prev => ({ ...prev, [originalAuthor]: newUserName }))
    setUserCounter(prev => prev + 1)
    return newUserName
  }

  const handleCommentReactionClick = (commentId: string, reactionType: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReactions = { ...comment.reactions }
        const wasActive = comment.userReaction === reactionType
        
        if (comment.userReaction && comment.userReaction in newReactions) {
          newReactions[comment.userReaction as keyof typeof newReactions]--
        }
        
        if (!wasActive && reactionType in newReactions) {
          newReactions[reactionType as keyof typeof newReactions]++
        }
        
        return {
          ...comment,
          reactions: newReactions,
          userReaction: wasActive ? null : reactionType
        }
      }
      return comment
    }))
  }

  const handleReplyReactionClick = (commentId: string, replyId: string, reactionType: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            const newReactions = { ...reply.reactions }
            const wasActive = reply.userReaction === reactionType
            
            if (reply.userReaction && reply.userReaction in newReactions) {
              newReactions[reply.userReaction as keyof typeof newReactions]--
            }
            
            if (!wasActive && reactionType in newReactions) {
              newReactions[reactionType as keyof typeof newReactions]++
            }
            
            return {
              ...reply,
              reactions: newReactions,
              userReaction: wasActive ? null : reactionType
            }
          }
          return reply
        })
        
        return { ...comment, replies: updatedReplies }
      }
      return comment
    }))
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Anonymous',
      avatar: '🎮',
      content: newComment.trim(),
      timestamp: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5'),
      reactions: { thumbsUp: 0, thumbsDown: 0 },
      userReaction: null,
      replies: [],
      showReplyForm: false
    }

    const newComments = [...comments, comment]
    setComments(newComments)
    setNewComment('')
    
    if (onUpdateCommentCount) {
      onUpdateCommentCount(post.id, newComments.reduce((total, comment) => total + 1 + comment.replies.length, 0))
    }
  }

  const handleSubmitReply = (commentId: string) => {
    const replyText = replyTexts[commentId]
    if (!replyText?.trim()) return

    const reply: Reply = {
      id: `${commentId}-${Date.now()}`,
      author: 'Anonymous',
      avatar: '🎮',
      content: replyText.trim(),
      timestamp: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5'),
      reactions: { thumbsUp: 0, thumbsDown: 0 },
      userReaction: null
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
          showReplyForm: false
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyTexts(prev => ({ ...prev, [commentId]: '' }))
    
    if (onUpdateCommentCount) {
      onUpdateCommentCount(post.id, updatedComments.reduce((total, comment) => total + 1 + comment.replies.length, 0))
    }
  }

  const toggleReplyForm = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, showReplyForm: !comment.showReplyForm }
      }
      return comment
    }))
  }

  const handleReportComment = (commentId: string) => {
    console.log(`Reporting comment ${commentId}`)
    setShowReportPopup(true)
    setTimeout(() => setShowReportPopup(false), 2000)
  }

  const handleReportReply = (replyId: string) => {
    console.log(`Reporting reply ${replyId}`)
    setShowReportPopup(true)
    setTimeout(() => setShowReportPopup(false), 2000)
  }

  const handleDeleteComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId)
    if (comment && comment.author === 'Anonymous') {
      const updatedComments = comments.filter(comment => comment.id !== commentId)
      setComments(updatedComments)
      
      if (onUpdateCommentCount) {
        onUpdateCommentCount(post.id, updatedComments.reduce((total, comment) => total + 1 + comment.replies.length, 0))
      }
    }
  }

  const handleDeleteReply = (commentId: string, replyId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const reply = comment.replies.find(r => r.id === replyId)
        if (reply && reply.author === 'Anonymous') {
          return {
            ...comment,
            replies: comment.replies.filter(r => r.id !== replyId)
          }
        }
      }
      return comment
    }))
  }

  return (
    <>
      <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-cloud-dancer pixel-modal w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-4">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b-4 border-darkest-hour bg-darkest-hour">
            <h2 className="pixel-text-sm sm:pixel-text-lg text-cloud-dancer font-black text-center">COMMENTS ({comments.reduce((total, comment) => total + 1 + comment.replies.length, 0)})</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-violet pixel-border-thin flex items-center justify-center hover:bg-exuberant-orange transition-none flex-shrink-0"
            >
              <X size={12} className="sm:w-3.5 sm:h-3.5 text-cloud-dancer" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]">
            <div className="p-3 sm:p-4">
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-4 sm:mb-6">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 min-w-0 px-2 sm:px-3 py-1.5 sm:py-2 pixel-border text-darkest-hour text-xs sm:pixel-text-xs placeholder-darkest-hour placeholder-opacity-50 focus:outline-none focus:bg-exuberant-orange focus:text-cloud-dancer"
                  />
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-violet pixel-border text-cloud-dancer text-xs sm:pixel-text-xs font-black hover:bg-exuberant-orange transition-none flex-shrink-0 whitespace-nowrap"
                  >
                    POST
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3 sm:space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="pixel-border-thin p-2 sm:p-3 bg-cloud-dancer w-full overflow-hidden">
                    <div className="flex items-start justify-between mb-2 w-full">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="text-xs sm:text-sm flex-shrink-0">{comment.avatar}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-black text-darkest-hour truncate">{getAnonymousUserName(comment.author)}</div>
                          <div className="text-xs text-darkest-hour opacity-60 truncate">{comment.timestamp}</div>
                        </div>
                      </div>
                      {comment.author === 'Anonymous' && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs text-darkest-hour hover:text-exuberant-orange font-black flex-shrink-0 whitespace-nowrap"
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-darkest-hour mb-2 sm:mb-3 text-left leading-relaxed break-words">{comment.content}</p>
                    
                    {/* UPDATED: Larger Comment Action Buttons */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
                      <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleCommentReactionClick(comment.id, 'thumbsUp')}
                          className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 transition-none ${
                            comment.userReaction === 'thumbsUp'
                              ? 'bg-exuberant-orange text-cloud-dancer'
                              : 'bg-cloud-dancer text-darkest-hour hover:bg-exuberant-orange hover:text-cloud-dancer'
                          }`}
                        >
                          <ThumbsUp size={12} className="sm:w-4 sm:h-4" />
                          <span className="text-xs font-black">{comment.reactions.thumbsUp}</span>
                        </button>
                        <button
                          onClick={() => handleCommentReactionClick(comment.id, 'thumbsDown')}
                          className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 transition-none ${
                            comment.userReaction === 'thumbsDown'
                              ? 'bg-exuberant-orange text-cloud-dancer'
                              : 'bg-cloud-dancer text-darkest-hour hover:bg-exuberant-orange hover:text-cloud-dancer'
                          }`}
                        >
                          <ThumbsDown size={12} className="sm:w-4 sm:h-4" />
                          <span className="text-xs font-black">{comment.reactions.thumbsDown}</span>
                        </button>
                      </div>
                      <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleReportComment(comment.id)}
                          className="flex items-center justify-center hover:bg-exuberant-orange hover:text-cloud-dancer transition-none p-1.5 sm:p-2"
                        >
                          <Flag size={12} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => toggleReplyForm(comment.id)}
                          className="flex items-center justify-center hover:bg-exuberant-orange transition-none p-1.5 sm:p-2"
                        >
                          <MessageCircle size={12} className="sm:w-4 sm:h-4 text-darkest-hour" />
                        </button>
                      </div>
                    </div>

                    {/* Reply Form */}
                    {comment.showReplyForm && (
                      <div className="ml-3 sm:ml-4 mb-2 sm:mb-3 pr-2">
                        <div className="flex gap-2 w-full">
                          <input
                            type="text"
                            value={replyTexts[comment.id] || ''}
                            onChange={(e) => setReplyTexts(prev => ({ ...prev, [comment.id]: e.target.value }))}
                            placeholder="Write a reply..."
                            className="flex-1 min-w-0 px-2 py-1 pixel-border-thin bg-cloud-dancer text-darkest-hour text-xs placeholder-darkest-hour placeholder-opacity-50 focus:outline-none focus:bg-exuberant-orange focus:text-cloud-dancer"
                          />
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            className="px-2 sm:px-3 py-1 bg-blue-violet pixel-border-thin text-cloud-dancer text-xs font-black hover:bg-exuberant-orange transition-none flex-shrink-0 whitespace-nowrap"
                          >
                            REPLY
                          </button>
                        </div>
                      </div>
                    )}

                    {/* FIXED: Reply Conversation Bubbles with Proper Margin Containment */}
                    {comment.replies.length > 0 && (
                      <div className="ml-3 sm:ml-4 space-y-2 sm:space-y-3 pr-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="relative">
                            {/* Conversation Bubble Design with Proper Containment */}
                            <div className="bg-sun-glare rounded-lg p-2 sm:p-3 relative pixel-border-thin overflow-hidden">
                              {/* Speech Bubble Tail - Smaller and Better Positioned */}
                              <div className="absolute -left-1 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-sun-glare"></div>
                              <div className="absolute -left-[2px] top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-darkest-hour"></div>
                              
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2 min-w-0 flex-1">
                                  <span className="text-xs flex-shrink-0">{reply.avatar}</span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-black text-darkest-hour truncate">{getAnonymousUserName(reply.author)}</div>
                                    <div className="text-xs text-darkest-hour opacity-60 truncate">{reply.timestamp}</div>
                                  </div>
                                </div>
                                {reply.author === 'Anonymous' && (
                                  <button
                                    onClick={() => handleDeleteReply(comment.id, reply.id)}
                                    className="text-xs text-darkest-hour hover:text-exuberant-orange font-black flex-shrink-0 whitespace-nowrap ml-2"
                                  >
                                    DELETE
                                  </button>
                                )}
                              </div>
                              
                              <p className="text-xs sm:text-sm text-darkest-hour mb-2 sm:mb-3 text-left leading-relaxed break-words">{reply.content}</p>
                              
                              {/* UPDATED: Larger Reply Action Buttons with Better Spacing */}
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleReplyReactionClick(comment.id, reply.id, 'thumbsUp')}
                                    className={`flex items-center space-x-1 px-2 py-1.5 rounded text-xs transition-none ${
                                      reply.userReaction === 'thumbsUp'
                                        ? 'bg-exuberant-orange text-cloud-dancer'
                                        : 'bg-cloud-dancer text-darkest-hour hover:bg-exuberant-orange hover:text-cloud-dancer'
                                    }`}
                                  >
                                    <ThumbsUp size={10} />
                                    <span className="font-black">{reply.reactions.thumbsUp}</span>
                                  </button>
                                  <button
                                    onClick={() => handleReplyReactionClick(comment.id, reply.id, 'thumbsDown')}
                                    className={`flex items-center space-x-1 px-2 py-1.5 rounded text-xs transition-none ${
                                      reply.userReaction === 'thumbsDown'
                                        ? 'bg-exuberant-orange text-cloud-dancer'
                                        : 'bg-cloud-dancer text-darkest-hour hover:bg-exuberant-orange hover:text-cloud-dancer'
                                    }`}
                                  >
                                    <ThumbsDown size={10} />
                                    <span className="font-black">{reply.reactions.thumbsDown}</span>
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleReportReply(reply.id)}
                                  className="flex items-center justify-center hover:bg-exuberant-orange hover:text-cloud-dancer transition-none p-1.5 rounded flex-shrink-0 ml-2"
                                >
                                  <Flag size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Popup */}
      {showReportPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-exuberant-orange border-4 border-darkest-hour px-6 py-3 z-50">
          <p className="pixel-text text-cloud-dancer font-black text-center">REPORT SUBMITTED SUCCESSFULLY!</p>
        </div>
      )}
    </>
  )
}

export default PostDetailModal
