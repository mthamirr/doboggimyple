import React, { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'
import RegistrationScreen from './components/RegistrationScreen'
import HomePage from './components/HomePage'
import CommunityBoard from './components/CommunityBoard'
import PostDetail from './components/PostDetail'
import NewPostModal from './components/NewPostModal'
import BookmarksPage from './components/BookmarksPage'

// Import new app components
import MatchingApp from './components/MatchingApp'
import MessagingApp from './components/MessagingApp'
import ProfileApp from './components/ProfileApp'
import CounsellingCartApp from './components/CounsellingCartApp'

import { Post } from './types'

type AuthState = 'loading' | 'login' | 'registration' | 'authenticated'
type AppView = 'home' | 'board' | 'bookmarks' | 'matching' | 'messages' | 'profile' | 'counselling' | 'cart'

function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [currentUser, setCurrentUser] = useState<string>('')
  const [userGender, setUserGender] = useState<string>('')
  const [userAvatar, setUserAvatar] = useState<string>('')
  const [currentBoardType, setCurrentBoardType] = useState<string>('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showNewPostModal, setShowNewPostModal] = useState(false)

  // Existing posts data and functions (keep your existing posts logic here)
  const [posts, setPosts] = useState<{ [key: string]: Post[] }>({
    announcements: [],
    batch: [],
    anonymous: [],
    mens: [],
    womens: []
  })

  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([])

  // Navigation handlers
  const handleNavigateToApp = (appName: AppView) => {
    setCurrentView(appName)
    setSelectedPost(null)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedPost(null)
  }

  // Auth handlers
  const handleLoadingComplete = () => {
    setAuthState('login')
  }

  const handleLoginComplete = (userData: { name: string; gender: string; avatar: string }) => {
    setCurrentUser(userData.name)
    setUserGender(userData.gender)
    setUserAvatar(userData.avatar)
    setAuthState('authenticated')
  }

  const handleGoToRegistration = () => {
    setAuthState('registration')
  }

  const handleRegistrationComplete = (userData: { name: string; gender: string; avatar: string }) => {
    setCurrentUser(userData.name)
    setUserGender(userData.gender)
    setUserAvatar(userData.avatar)
    setAuthState('authenticated')
  }

  const handleBackToLogin = () => {
    setAuthState('login')
  }

  // Community functions (keep your existing logic)
  const handleNavigateToBoard = (boardType: string) => {
    if (boardType === 'mens' && userGender !== 'male') {
      return
    }
    if (boardType === 'womens' && userGender !== 'female') {
      return
    }
    setCurrentBoardType(boardType)
    setCurrentView('board')
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleClosePostDetail = () => {
    setSelectedPost(null)
  }

  const handleNewPost = () => {
    setShowNewPostModal(true)
  }

  const handleSubmitPost = (newPostData: { title: string; content: string; batch?: string; images: string[] }) => {
    const newPost: Post = {
      id: `${currentBoardType}-${Date.now()}`,
      author: currentBoardType === 'announcements' ? 'Admin' : 'Anonymous',
      avatar: currentBoardType === 'announcements' ? '📢' : '👤',
      title: newPostData.title,
      content: newPostData.content,
      timestamp: new Date().toLocaleString(),
      reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
      comments: [],
      images: newPostData.images,
      isBookmarked: false,
      batch: newPostData.batch || 'N/A'
    }

    setPosts(prev => ({
      ...prev,
      [currentBoardType]: [newPost, ...prev[currentBoardType]]
    }))

    setShowNewPostModal(false)
  }

  const handleReaction = (postId: string, reactionType: string) => {
    setPosts(prev => {
      const updatedPosts = { ...prev }
      Object.keys(updatedPosts).forEach(boardType => {
        updatedPosts[boardType] = updatedPosts[boardType].map(post => {
          if (post.id === postId) {
            return {
              ...post,
              reactions: {
                ...post.reactions,
                [reactionType]: post.reactions[reactionType] + 1
              }
            }
          }
          return post
        })
      })
      return updatedPosts
    })
  }

  const handleBookmark = (postId: string) => {
    setPosts(prev => {
      const updatedPosts = { ...prev }
      Object.keys(updatedPosts).forEach(boardType => {
        updatedPosts[boardType] = updatedPosts[boardType].map(post => {
          if (post.id === postId) {
            const updatedPost = { ...post, isBookmarked: !post.isBookmarked }
            if (updatedPost.isBookmarked) {
              setBookmarkedPosts(prevBookmarks => [...prevBookmarks, updatedPost])
            } else {
              setBookmarkedPosts(prevBookmarks => prevBookmarks.filter(p => p.id !== postId))
            }
            return updatedPost
          }
          return post
        })
      })
      return updatedPosts
    })
  }

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${post.title}\n${post.content}\n${window.location.href}`)
    }
  }

  const handleReport = (postId: string, reason: string) => {
    console.log(`Reported post ${postId} for: ${reason}`)
  }

  const handleDeletePost = (postId: string) => {
    setPosts(prev => {
      const updatedPosts = { ...prev }
      Object.keys(updatedPosts).forEach(boardType => {
        updatedPosts[boardType] = updatedPosts[boardType].filter(post => post.id !== postId)
      })
      return updatedPosts
    })
    setBookmarkedPosts(prev => prev.filter(post => post.id !== postId))
  }

  // Loading screen
  if (authState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  // Login screen
  if (authState === 'login') {
    return (
      <LoginScreen
        onLoginComplete={handleLoginComplete}
        onGoToRegistration={handleGoToRegistration}
      />
    )
  }

  // Registration screen
  if (authState === 'registration') {
    return (
      <RegistrationScreen
        onRegistrationComplete={handleRegistrationComplete}
        onBackToLogin={handleBackToLogin}
      />
    )
  }

  // Main App Routing
  const renderCurrentView = () => {
    switch (currentView) {
      case 'matching':
        return <MatchingApp onBackToHome={handleBackToHome} />
      case 'messages':
        return <MessagingApp onBackToHome={handleBackToHome} />
      case 'profile':
        return <ProfileApp onBackToHome={handleBackToHome} />
      case 'counselling':
      case 'cart':
        return <CounsellingCartApp onBackToHome={handleBackToHome} />
      case 'board':
        return (
          <CommunityBoard
            boardType={currentBoardType}
            posts={posts[currentBoardType] || []}
            onPostClick={handlePostClick}
            onBackToHome={handleBackToHome}
            onNewPost={handleNewPost}
            onReaction={handleReaction}
            onBookmark={handleBookmark}
            onShare={handleShare}
            onReport={handleReport}
            onDeletePost={handleDeletePost}
            currentUser={currentUser}
            userGender={userGender}
          />
        )
      case 'bookmarks':
        return (
          <BookmarksPage
            bookmarkedPosts={bookmarkedPosts}
            onPostClick={handlePostClick}
            onBackToBoard={() => setCurrentView('board')}
            onReaction={handleReaction}
            onBookmark={handleBookmark}
            onShare={handleShare}
            onReport={handleReport}
            onDeletePost={handleDeletePost}
            currentUser={currentUser}
            onBackToHome={handleBackToHome}
          />
        )
      case 'home':
      default:
        return (
          <HomePage
            currentUser={currentUser}
            userGender={userGender}
            userAvatar={userAvatar}
            onNavigateToBoard={handleNavigateToBoard}
            onNavigateToApp={handleNavigateToApp}
            onNavigateToMessages={() => handleNavigateToApp('messages')}
          />
        )
    }
  }

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      
      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={handleClosePostDetail}
          onReaction={handleReaction}
          onBookmark={handleBookmark}
          onShare={handleShare}
          onReport={handleReport}
          onDeletePost={handleDeletePost}
          currentUser={currentUser}
        />
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <NewPostModal
          boardType={currentBoardType}
          onClose={() => setShowNewPostModal(false)}
          onSubmit={handleSubmitPost}
        />
      )}
    </div>
  )
}

export default App
