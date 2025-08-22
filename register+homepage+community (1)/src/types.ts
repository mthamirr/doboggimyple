export interface Post {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  timestamp: string
  images: string[]
  reactions: {
    thumbsUp?: number
    thumbsDown?: number
    heart?: number
    fire?: number
    // Legacy support
    confused?: number
    cheer?: number
    like?: number
    sad?: number
    happy?: number
  }
  comments: number
  batch: string
  isBookmarked: boolean
  userReaction: string | null
}

export interface Comment {
  id: string
  author: string
  timestamp: string
  content: string
  reactions: {
    like: number
    dislike: number
  }
  userReaction: 'like' | 'dislike' | null
  replies: Comment[]
}
