import React, { useState, useEffect } from 'react'
import { X, ThumbsUp, ThumbsDown, Reply, Flag } from 'lucide-react'
import { Post, Comment } from '../types'

interface PostModalProps {
  post: Post
  onClose: () => void
  onReaction: (postId: string, reactionType: string) => void
  onBookmark: (postId: string) => void
  onShare: (post: Post) => void
  onReport: (postId: string, reason: string) => void
  onCommentReport: () => void
}

const PostModal: React.FC<PostModalProps> = ({ 
  post, 
  onClose, 
  onCommentReport
}) => {
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const mockComments: Comment[] = []
    for (let i = 0; i < post.comments; i++) {
      mockComments.push({
        id: `${i + 1}`,
        author: `User ${i + 1}`,
        timestamp: '08.16 18:40',
        content: i === 0 ? 'Great idea! I\'m definitely interested in joining the study group.' : 
                i === 1 ? 'Awesome! I\'ll create a group chat.' : 
                i === 2 ? 'Count me in! What time works best for everyone?' : 'This sounds perfect!',
        reactions: { like: Math.floor(Math.random() * 5) + 1, dislike: 0 },
        userReaction: null,
        replies: []
      })
    }
    setComments(mockComments)
  }, [post.comments])

  const handleCommentReaction = (commentId: string, reactionType: 'like' | 'dislike') => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReactions = { ...comment.reactions }
        
        if (comment.userReaction === reactionType) {
          newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1)
          return { ...comment, reactions: newReactions, userReaction: null }
        } else {
          if (comment.userReaction) {
            newReactions[comment.userReaction] = Math.max(0, newReactions[comment.userReaction] - 1)
          }
          newReactions[reactionType]++
          return { ...comment, reactions: newReactions, userReaction: reactionType }
        }
      }
      return comment
    }))
  }

  const handleReplyReaction = (commentId: string, replyId: string, reactionType: 'like' | 'dislike') => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            const newReactions = { ...reply.reactions }
            
            if (reply.userReaction === reactionType) {
              newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1)
              return { ...reply, reactions: newReactions, userReaction: null }
            } else {
              if (reply.userReaction) {
                newReactions[reply.userReaction] = Math.max(0, newReactions[reply.userReaction] - 1)
              }
              newReactions[reactionType]++
              return { ...reply, reactions: newReactions, userReaction: reactionType }
            }
          }
          return reply
        })
        return { ...comment, replies: updatedReplies }
      }
      return comment
    }))
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment: Comment = {
      id: `${Date.now()}`,
      author: `User ${comments.length + 1}`,
      timestamp: new Date().toLocaleString('en-GB', { 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      content: newComment.trim(),
      reactions: { like: 0, dislike: 0 },
      userReaction: null,
      replies: []
    }

    setComments([...comments, comment])
    setNewComment('')
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return
    
    // Count total replies to determine next user number
    const totalReplies = comments.reduce((total, comment) => total + comment.replies.length, 0)
    
    const newReply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: `User ${comments.length + totalReplies + 1}`,
      timestamp: new Date().toLocaleString('en-GB', { 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      content: replyContent.trim(),
      reactions: { like: 0, dislike: 0 },
      userReaction: null,
      replies: []
    }

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, replies: [...comment.replies, newReply] }
      }
      return comment
    }))

    setReplyContent('')
    setReplyTo(null)
  }

  return (
    <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-cloud-dancer pixel-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center p-4 border-b-4 border-darkest-hour sticky top-0 bg-cloud-dancer">
          <h2 className="pixel-text-lg text-darkest-hour font-black flex-1 text-center pr-10">{post.title.toUpperCase()}</h2>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
          >
            <X size={20} className="text-cloud-dancer" />
          </button>
        </div>

        {/* Comments Section */}
        <div className="p-4">
          <div className="mb-4">
            <h4 className="pixel-text text-darkest-hour font-black mb-2">COMMENT {comments.length}</h4>
            <hr className="border-4 border-darkest-hour mb-4" />
          </div>

          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                {/* Main Comment */}
                <div className="bg-cloud-dancer pixel-card">
                  {/* Comment Header */}
                  <div className="flex items-center gap-3 p-3 border-b-2 border-darkest-hour">
                    <div className="w-10 h-10 bg-blue-violet pixel-border flex items-center justify-center text-cloud-dancer pixel-text font-black">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="pixel-text text-darkest-hour font-black">{comment.author.toUpperCase()}</span>
                        <span className="pixel-text text-darkest-hour opacity-75">{comment.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="p-3">
                    <div className="bg-sun-glare pixel-border p-3 mb-3">
                      <p className="pixel-text text-darkest-hour font-black">{comment.content.toUpperCase()}</p>
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleCommentReaction(comment.id, 'like')}
                          className={`flex items-center gap-1 px-2 py-1 pixel-text font-black transition-none ${
                            comment.userReaction === 'like' 
                              ? 'bg-sun-glare text-darkest-hour pixel-border-thin' 
                              : 'bg-blue-violet text-cloud-dancer pixel-border-thin hover:bg-exuberant-orange'
                          }`}
                        >
                          <ThumbsUp size={12} className={comment.userReaction === 'like' ? 'fill-current' : ''} />
                          <span>{comment.reactions.like}</span>
                        </button>
                        <button 
                          onClick={() => handleCommentReaction(comment.id, 'dislike')}
                          className={`flex items-center gap-1 px-2 py-1 pixel-text font-black transition-none ${
                            comment.userReaction === 'dislike' 
                              ? 'bg-exuberant-orange text-cloud-dancer pixel-border-thin' 
                              : 'bg-blue-violet text-cloud-dancer pixel-border-thin hover:bg-exuberant-orange'
                          }`}
                        >
                          <ThumbsDown size={12} className={comment.userReaction === 'dislike' ? 'fill-current' : ''} />
                          <span>{comment.reactions.dislike}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="w-8 h-8 bg-blue-violet pixel-border flex items-center justify-center hover:bg-exuberant-orange transition-none"
                        >
                          <Reply size={12} className="text-cloud-dancer" />
                        </button>
                        <button 
                          onClick={onCommentReport}
                          className="w-8 h-8 bg-exuberant-orange pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
                        >
                          <Flag size={12} className="text-cloud-dancer" />
                        </button>
                      </div>
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="mt-3 p-3 bg-blue-violet pixel-border">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="WRITE A REPLY..."
                          className="w-full p-2 pixel-border pixel-text text-darkest-hour font-black focus:outline-none resize-none bg-cloud-dancer"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setReplyTo(null)
                              setReplyContent('')
                            }}
                            className="px-3 py-2 bg-exuberant-orange pixel-border pixel-text text-cloud-dancer font-black hover:bg-sun-glare hover:text-darkest-hour transition-none"
                          >
                            CANCEL
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReply(comment.id)}
                            className="px-3 py-2 bg-sun-glare pixel-border pixel-text text-darkest-hour font-black hover:bg-exuberant-orange hover:text-cloud-dancer transition-none"
                          >
                            REPLY
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-3 ml-6 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-exuberant-orange pixel-border p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-sun-glare pixel-border flex items-center justify-center text-darkest-hour pixel-text font-black">
                                {reply.author.charAt(0)}
                              </div>
                              <span className="pixel-text text-cloud-dancer font-black">{reply.author.toUpperCase()}</span>
                              <span className="pixel-text text-cloud-dancer opacity-75 ml-auto">{reply.timestamp}</span>
                            </div>
                            <p className="pixel-text text-cloud-dancer font-black mb-2">{reply.content.toUpperCase()}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => handleReplyReaction(comment.id, reply.id, 'like')}
                                  className={`flex items-center gap-1 px-2 py-1 pixel-text font-black transition-none ${
                                    reply.userReaction === 'like' 
                                      ? 'bg-sun-glare text-darkest-hour pixel-border-thin' 
                                      : 'bg-blue-violet text-cloud-dancer pixel-border-thin hover:bg-sun-glare hover:text-darkest-hour'
                                  }`}
                                >
                                  <ThumbsUp size={10} className={reply.userReaction === 'like' ? 'fill-current' : ''} />
                                  <span>{reply.reactions.like}</span>
                                </button>
                                <button 
                                  onClick={() => handleReplyReaction(comment.id, reply.id, 'dislike')}
                                  className={`flex items-center gap-1 px-2 py-1 pixel-text font-black transition-none ${
                                    reply.userReaction === 'dislike' 
                                      ? 'bg-darkest-hour text-cloud-dancer pixel-border-thin' 
                                      : 'bg-blue-violet text-cloud-dancer pixel-border-thin hover:bg-darkest-hour'
                                  }`}
                                >
                                  <ThumbsDown size={10} className={reply.userReaction === 'dislike' ? 'fill-current' : ''} />
                                  <span>{reply.reactions.dislike}</span>
                                </button>
                              </div>
                              <button 
                                onClick={onCommentReport}
                                className="w-6 h-6 bg-darkest-hour pixel-border flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
                              >
                                <Flag size={8} className="text-cloud-dancer" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="bg-cloud-dancer pixel-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-sun-glare pixel-border flex items-center justify-center text-darkest-hour pixel-text font-black flex-shrink-0">
                U
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="WRITE A COMMENT..."
                  className="w-full p-3 pixel-border pixel-text text-darkest-hour font-black focus:outline-none resize-none bg-cloud-dancer"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={handleAddComment}
                    className="bg-sun-glare pixel-border text-darkest-hour px-4 py-2 pixel-text font-black hover:bg-exuberant-orange hover:text-cloud-dancer transition-none flex items-center gap-2"
                  >
                    <span>📤</span>
                    POST COMMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostModal
