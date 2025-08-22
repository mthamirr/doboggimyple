import React, { useState } from 'react'
import { X, Upload } from 'lucide-react'

interface NewPostModalProps {
  onClose: () => void
  onSubmit: (post: { title: string; content: string; batch?: string; images: string[] }) => void
  boardType?: string
  subboards?: string[]
}

const NewPostModal: React.FC<NewPostModalProps> = ({ onClose, onSubmit, boardType = 'batch', subboards = ['B21', 'B22', 'B23', 'B24', 'B25'] }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedBatch, setSelectedBatch] = useState(subboards[0] || '')
  const [selectedAvatar, setSelectedAvatar] = useState('🎮')
  const [images, setImages] = useState<string[]>([])

  const avatars = ['🎮', '📚', '🚀', '🎯', '🔥', '💎', '⚡', '🌟', '🎨', '🍕']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      batch: boardType === 'batch' ? selectedBatch : 'N/A',
      images
    })

    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const getModalTitle = () => {
    if (boardType === 'announcements') {
      return 'CREATE ADMIN ANNOUNCEMENT'
    }
    return 'CREATE ANONYMOUS POST'
  }

  const getSubmitButtonText = () => {
    if (boardType === 'announcements') {
      return 'POST AS ADMIN'
    }
    return 'POST ANONYMOUSLY'
  }

  return (
    <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-cloud-dancer border-4 border-darkest-hour shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-darkest-hour bg-darkest-hour">
          <h2 className="pixel-text text-cloud-dancer font-black text-center flex-1">{getModalTitle()}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-exuberant-orange border-2 border-darkest-hour flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
          >
            <X size={14} className="text-cloud-dancer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Selection - Only show for non-announcement boards */}
          {boardType !== 'announcements' && (
            <div>
              <label className="block pixel-text text-darkest-hour font-black mb-3 text-center">CHOOSE ANONYMOUS AVATAR</label>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-12 h-12 border-2 border-darkest-hour flex items-center justify-center text-xl transition-none ${
                      selectedAvatar === avatar
                        ? 'bg-sun-glare'
                        : 'bg-blue-violet hover:bg-exuberant-orange'
                    }`}
                  >
                    <span className="flex items-center justify-center w-full h-full">{avatar}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Batch Selection - Only for batch board */}
          {boardType === 'batch' && (
            <div>
              <label className="block pixel-text text-darkest-hour font-black mb-3 text-center">SELECT BATCH</label>
              <div className="grid grid-cols-5 gap-2">
                {subboards.map((batch) => (
                  <button
                    key={batch}
                    type="button"
                    onClick={() => setSelectedBatch(batch)}
                    className={`px-2 py-1 text-xs font-black border-2 border-darkest-hour transition-none flex items-center justify-center ${
                      selectedBatch === batch
                        ? 'bg-sun-glare text-darkest-hour'
                        : 'bg-blue-violet text-cloud-dancer hover:bg-exuberant-orange'
                    }`}
                  >
                    <span className="text-center">{batch}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FIXED: Title Input - Proper Containment */}
          <div>
            <label className="block pixel-text text-darkest-hour font-black mb-3 text-center">TITLE</label>
            <div className="relative border-4 border-darkest-hour bg-cloud-dancer overflow-hidden">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ENTER POST TITLE..."
                className="w-full p-3 border-none outline-none pixel-text text-darkest-hour font-black bg-transparent text-center"
                maxLength={100}
                required
                style={{ maxWidth: '100%' }}
              />
            </div>
            <div className="pixel-text text-darkest-hour opacity-75 text-xs mt-1 text-center">{title.length}/100 CHARACTERS</div>
          </div>

          {/* FIXED: Content Textarea - Proper Containment */}
          <div>
            <label className="block pixel-text text-darkest-hour font-black mb-3 text-center">CONTENT</label>
            <div className="relative border-4 border-darkest-hour bg-cloud-dancer overflow-hidden">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="WHAT'S ON YOUR MIND?"
                className="w-full p-3 border-none outline-none resize-none pixel-text text-darkest-hour font-black bg-transparent"
                rows={5}
                maxLength={1000}
                required
                style={{ maxWidth: '100%' }}
              />
            </div>
            <div className="pixel-text text-darkest-hour opacity-75 text-xs mt-1 text-center">{content.length}/1000 CHARACTERS</div>
          </div>

          {/* Images */}
          <div>
            <label className="block pixel-text text-darkest-hour font-black mb-3 text-center">IMAGES (OPTIONAL)</label>
            <div className="grid grid-cols-1 gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="bg-blue-violet hover:bg-exuberant-orange border-4 border-darkest-hour text-cloud-dancer p-4 text-center transition-none flex flex-col items-center justify-center">
                  <Upload size={20} className="mb-2" />
                  <span className="pixel-text font-black text-center">UPLOAD FROM LIBRARY</span>
                </div>
              </label>
            </div>
            
            {/* Display uploaded images */}
            {images.length > 0 && (
              <div className="mt-3 space-y-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover border-2 border-darkest-hour" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-6 h-6 bg-exuberant-orange border border-darkest-hour flex items-center justify-center"
                    >
                      <X size={12} className="text-cloud-dancer" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="w-full bg-sun-glare hover:bg-exuberant-orange hover:text-cloud-dancer border-4 border-darkest-hour text-darkest-hour py-3 pixel-text font-black transition-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span className="text-center">{getSubmitButtonText()}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPostModal
