import React, { useState } from 'react'
import { ArrowLeft, Upload } from 'lucide-react'
import { Post } from '../types'

interface NewPostPageProps {
  onClose: () => void
  onSubmit: (post: Omit<Post, 'id'>) => void
}

const avatars = ['🌟', '🎮', '📚', '⚡', '🎯', '🎨', '🚀', '💎', '🔥', '🎪']
const batches = ['B21', 'B22', 'B23', 'B24', 'B25']

const NewPostPage: React.FC<NewPostPageProps> = ({ onClose, onSubmit }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('🌟')
  const [selectedBatch, setSelectedBatch] = useState('B21')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const newPost: Omit<Post, 'id'> = {
      author: 'Anonymous',
      avatar: selectedAvatar,
      title: title.trim(),
      content: content.trim(),
      timestamp: new Date().toLocaleString('en-GB', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5'),
      images,
      reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0, confused: 0, cheer: 0 },
      comments: 0,
      batch: selectedBatch,
      isBookmarked: false,
      userReaction: null
    }

    onSubmit(newPost)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  return (
    <div className="min-h-screen bg-green-100 font-mono">
      {/* Status Bar Spacer */}
      <div className="h-12 bg-black"></div>
      
      {/* Header */}
      <div className="bg-yellow-300 border-b-4 border-black p-3 sm:p-4 sticky top-0 z-40">
        <div className="flex items-center justify-center relative">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 border-4 border-black text-black p-2 sm:p-3 rounded-none transition-colors absolute left-0"
          >
            <ArrowLeft size={16} />
          </button>
          {/* FIXED: Larger font size */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-black text-black pixel-text text-center">
            🎮 CREATE NEW POST 🎮
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 max-w-2xl mx-auto">
        {/* Avatar Selection */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-black text-black mb-3">Choose Avatar</h3>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={`aspect-square border-4 border-black text-base sm:text-lg flex items-center justify-center transition-all duration-200 ${
                  selectedAvatar === avatar
                    ? 'bg-blue-400 shadow-lg transform scale-105'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Selection */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-black text-black mb-3">Select Batch</h3>
          <div className="flex justify-center">
            <div className="flex gap-2 sm:gap-3">
              {batches.map((batch) => (
                <button
                  key={batch}
                  type="button"
                  onClick={() => setSelectedBatch(batch)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 border-4 border-black font-black text-sm sm:text-base transition-all duration-200 flex items-center justify-center min-w-[60px] sm:min-w-[70px] ${
                    selectedBatch === batch
                      ? 'bg-red-400 text-black shadow-lg transform scale-105'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {batch}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-black text-black mb-3">Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full p-3 sm:p-4 border-4 border-black font-bold text-sm sm:text-base focus:outline-none"
            maxLength={100}
            required
          />
          <div className="text-xs sm:text-sm text-gray-600 font-bold mt-1">
            {title.length}/100 characters
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-black text-black mb-3">Content</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 sm:p-4 border-4 border-black font-bold text-sm sm:text-base focus:outline-none resize-none"
            rows={6}
            maxLength={1000}
            required
          />
          <div className="text-xs sm:text-sm text-gray-600 font-bold mt-1">
            {content.length}/1000 characters
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <h3 className="text-base sm:text-lg font-black text-black mb-3">Add Images (Optional)</h3>
          <label className="block">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="border-4 border-dashed border-black p-6 sm:p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
              <Upload size={24} className="mx-auto mb-2" />
              <p className="font-black text-sm sm:text-base text-black">Click to upload images</p>
              <p className="text-xs sm:text-sm text-gray-600 font-bold mt-1">PNG, JPG up to 5MB each</p>
            </div>
          </label>
          
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 sm:h-32 object-cover border-2 border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-400 hover:bg-red-500 border-2 border-black text-black w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-black text-xs sm:text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-black text-black px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            🚀 POST TO BOARD 🚀
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPostPage
