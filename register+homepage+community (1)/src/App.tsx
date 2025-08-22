import React, { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import RegistrationScreen from './components/RegistrationScreen'
import LoginScreen from './components/LoginScreen'
import HomePage from './components/HomePage'
import CommunityBoard from './components/CommunityBoard'
import PostDetailModal from './components/PostDetailModal'
import BookmarksPage from './components/BookmarksPage'
import NewPostModal from './components/NewPostModal'
import { Post } from './types'
import { generateMockPosts } from './data/mockPosts'

type AuthState = 'loading' | 'login' | 'registration' | 'authenticated'
type AppView = 'home' | 'board' | 'bookmarks'

function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [currentBoardType, setCurrentBoardType] = useState<string>('batch')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [posts, setPosts] = useState<{[key: string]: Post[]}>({})
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([])
  
  const [currentUser, setCurrentUser] = useState<string>('')
  const [userGender, setUserGender] = useState<string>('')
  const [userAvatar, setUserAvatar] = useState<string>('')

  useEffect(() => {
    const boardTypes = ['batch', 'major', 'fashion', 'religion', 'music', 'movie', 'sports', 'mens', 'womens', 'announcements']
    const initialPosts: {[key: string]: Post[]} = {}
    
    boardTypes.forEach(boardType => {
      initialPosts[boardType] = generateMockPosts(boardType)
    })
    
    setPosts(initialPosts)
  }, [])

  const getBoardTitle = (boardType: string) => {
    switch (boardType) {
      case 'batch': return 'BATCH BOARD'
      case 'major': return 'MAJOR BOARD'
      case 'fashion': return 'FASHION BOARD'
      case 'religion': return 'RELIGION BOARD'
      case 'music': return 'MUSIC BOARD'
      case 'movie': return 'MOVIE BOARD'
      case 'sports': return 'SPORTS BOARD'
      case 'mens': return "MEN'S LOUNGE"
      case 'womens': return "WOMEN'S LOUNGE"
      case 'announcements': return 'ANNOUNCEMENTS'
      default: return 'COMMUNITY BOARD'
    }
  }

  const getSubboards = (boardType: string) => {
    switch (boardType) {
      case 'batch': return ['B21', 'B22', 'B23', 'B24', 'B25']
      case 'major': return ['IT', 'ENGINEERING', 'LIFE SCIENCE', 'ANIMATION', 'ARTS', 'BUSINESS']
      case 'fashion': return ['MENS FASHION', 'WOMENS FASHION']
      case 'religion': return ['ISLAM', 'CHRISTIAN', 'BUDDHA', 'HINDU']
      case 'music': return ['POP', 'ROCK', 'KPOP', 'JPOP', 'INDIE', 'JAZZ', 'CLASSICAL']
      case 'movie': return ['THRILLER', 'COMEDY', 'ROMCOM', 'ROMANCE', 'FAMILY', 'ACTION', 'HORROR', 'DRAMA']
      case 'sports': return ['WATER SPORT', 'LAND SPORT', 'TRACK & FIELD', 'E-SPORTS', 'FITNESS', 'MARTIAL ARTS']
      case 'mens': return ['LIFESTYLE', 'GROOMING', 'FITNESS', 'CAREER', 'RELATIONSHIPS']
      case 'womens': return ['LIFESTYLE', 'BEAUTY', 'FITNESS', 'CAREER', 'RELATIONSHIPS']
      case 'announcements': return ['ACADEMIC', 'EVENTS', 'FACILITIES', 'GENERAL', 'URGENT']
      default: return []
    }
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

  // Centralized home navigation handler
  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedPost(null)
  }

  // App navigation handlers
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
      avatar: currentBoardType === 'announcements' ? '👨‍💼' : '🎮',
      title: newPostData.title,
      content: newPostData.content,
      timestamp: new Date().toLocaleString('en-GB', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5'),
      images: newPostData.images,
      reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
      comments: 0,
      batch: newPostData.batch || 'N/A',
      isBookmarked: false,
      userReaction: null
    }

    setPosts(prevPosts => ({
      ...prevPosts,
      [currentBoardType]: [newPost, ...(prevPosts[currentBoardType] || [])]
    }))

    setShowNewPostModal(false)
  }

  const handleReaction = (postId: string, reactionType: string) => {
    setPosts(prevPosts => {
      const updatedPosts = { ...prevPosts }
      const boardPosts = updatedPosts[currentBoardType] || []
      
      updatedPosts[currentBoardType] = boardPosts.map(post => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions }
          const wasActive = post.userReaction === reactionType
          
          if (post.userReaction && post.userReaction in newReactions) {
            const currentCount = newReactions[post.userReaction as keyof typeof newReactions] || 0
            newReactions[post.userReaction as keyof typeof newReactions] = Math.max(0, currentCount - 1)
          }
          
          if (!wasActive && reactionType in newReactions) {
            const currentCount = newReactions[reactionType as keyof typeof newReactions] || 0
            newReactions[reactionType as keyof typeof newReactions] = currentCount + 1
          }
          
          return {
            ...post,
            reactions: newReactions,
            userReaction: wasActive ? null : reactionType
          }
        }
        return post
      })
      
      return updatedPosts
    })

    setBookmarkedPosts(prevBookmarked => 
      prevBookmarked.map(post => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions }
          const wasActive = post.userReaction === reactionType
          
          if (post.userReaction && post.userReaction in newReactions) {
            const currentCount = newReactions[post.userReaction as keyof typeof newReactions] || 0
            newReactions[post.userReaction as keyof typeof newReactions] = Math.max(0, currentCount - 1)
          }
          
          if (!wasActive && reactionType in newReactions) {
            const currentCount = newReactions[reactionType as keyof typeof newReactions] || 0
            newReactions[reactionType as keyof typeof newReactions] = currentCount + 1
          }
          
          return {
            ...post,
            reactions: newReactions,
            userReaction: wasActive ? null : reactionType
          }
        }
        return post
      })
    )
  }

  const handleBookmark = (postId: string) => {
    const currentBoardPosts = posts[currentBoardType] || []
    const post = currentBoardPosts.find(p => p.id === postId)
    
    if (!post) return

    setPosts(prevPosts => {
      const updatedPosts = { ...prevPosts }
      updatedPosts[currentBoardType] = (updatedPosts[currentBoardType] || []).map(p => 
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
      return updatedPosts
    })

    setBookmarkedPosts(prevBookmarked => {
      const isCurrentlyBookmarked = prevBookmarked.some(p => p.id === postId)
      
      if (isCurrentlyBookmarked) {
        return prevBookmarked.filter(p => p.id !== postId)
      } else {
        return [...prevBookmarked, { ...post, isBookmarked: true }]
      }
    })
  }

  const handleShare = (post: Post) => {
    const shareText = `Check out this post: "${post.title}" on ${getBoardTitle(currentBoardType)}`
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`)
    }
  }

  const handleReport = (postId: string, reason: string) => {
    console.log(`Reporting post ${postId} for: ${reason}`)
  }

  // RESTORED: Post deletion functionality for authors
  const handleDeletePost = (postId: string) => {
    const currentBoardPosts = posts[currentBoardType] || []
    const post = currentBoardPosts.find(p => p.id === postId)
    
    // Allow deletion if post author is Anonymous (user's posts)
    if (post && post.author === 'Anonymous') {
      setPosts(prevPosts => ({
        ...prevPosts,
        [currentBoardType]: (prevPosts[currentBoardType] || []).filter(p => p.id !== postId)
      }))

      setBookmarkedPosts(prevBookmarked => 
        prevBookmarked.filter(p => p.id !== postId)
      )
    }
  }

  const handleUpdateCommentCount = (postId: string, newCount: number) => {
    setPosts(prevPosts => {
      const updatedPosts = { ...prevPosts }
      updatedPosts[currentBoardType] = (updatedPosts[currentBoardType] || []).map(post => 
        post.id === postId ? { ...post, comments: newCount } : post
      )
      return updatedPosts
    })

    setBookmarkedPosts(prevBookmarked => 
      prevBookmarked.map(post => 
        post.id === postId ? { ...post, comments: newCount } : post
      )
    )
  }

  const handleViewBookmarks = () => {
    setCurrentView('bookmarks')
  }

  const currentBoardPosts = posts[currentBoardType] || []

  // Render auth screens
  if (authState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (authState === 'login') {
    return (
      <LoginScreen 
        onComplete={handleLoginComplete}
        onGoToRegistration={handleGoToRegistration}
      />
    )
  }

  if (authState === 'registration') {
    return (
      <RegistrationScreen 
        onComplete={handleRegistrationComplete}
        onBackToLogin={handleBackToLogin}
      />
    )
  }

  // Render main app
  return (
    <div className="App">
      {currentView === 'home' && (
        <HomePage 
          onNavigateToBatch={() => handleNavigateToBoard('batch')}
          onNavigateToBoard={handleNavigateToBoard}
          userGender={userGender}
          userAvatar={userAvatar}
          userName={currentUser}
        />
      )}
      
      {currentView === 'board' && (
        <CommunityBoard
          posts={currentBoardPosts}
          onPostClick={handlePostClick}
          onNewPost={handleNewPost}
          onBackToHome={handleBackToHome}
          onReaction={handleReaction}
          onBookmark={handleBookmark}
          onShare={handleShare}
          onReport={handleReport}
          onViewBookmarks={handleViewBookmarks}
          onDeletePost={handleDeletePost}
          bookmarkedCount={bookmarkedPosts.length}
          boardType={currentBoardType}
          boardTitle={getBoardTitle(currentBoardType)}
          subboards={getSubboards(currentBoardType)}
          currentUser={currentUser}
        />
      )}

      {currentView === 'bookmarks' && (
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
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={handleClosePostDetail}
          onReaction={handleReaction}
          onCommentReaction={() => {}}
          onShare={handleShare}
          onReport={handleReport}
          onUpdateCommentCount={handleUpdateCommentCount}
          currentUser={currentUser}
          boardType={currentBoardType}
        />
      )}

      {showNewPostModal && (
        <NewPostModal
          onClose={() => setShowNewPostModal(false)}
          onSubmit={handleSubmitPost}
          boardType={currentBoardType}
          subboards={getSubboards(currentBoardType)}
        />
      )}
    </div>
  )
}

export default App
