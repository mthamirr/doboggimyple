import React, { useState } from 'react'
import { ArrowLeft, ShoppingCart, Search, Filter, Star, Heart, Share2, Calendar, Clock, User, Phone, Video } from 'lucide-react'

interface CounsellingCartAppProps {
  onBackToHome: () => void
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  seller: string
  rating: number
  isInCart: boolean
  additionalImages?: string[]
  description?: string
}

const CounsellingCartApp: React.FC<CounsellingCartAppProps> = ({ onBackToHome }) => {
  const [currentView, setCurrentView] = useState<'main' | 'cart' | 'counseling' | 'product'>('main')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Best Match')

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Korean Textbook Set',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
      category: 'Books',
      seller: 'Ahmad Zikri',
      rating: 4.8,
      isInCart: false,
      description: 'Complete Korean language learning textbook set for beginners to intermediate level.'
    },
    {
      id: 2,
      name: 'Scientific Calculator',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop',
      category: 'Electronics',
      seller: 'Siti Nurhaliza',
      rating: 4.5,
      isInCart: false,
      description: 'Professional scientific calculator for engineering and math courses.'
    }
  ])

  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    studentNo: '',
    major: '',
    concern: '',
    meetingType: 'online',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  })

  const counselingConcerns = [
    "I'm feeling overwhelmed with academic pressure",
    "I'm having trouble adjusting to life in Korea",
    "I'm experiencing anxiety or stress",
    "I'm having difficulty with relationships",
    "I'm struggling with homesickness",
    "I need help with time management and study skills",
    "I'm dealing with cultural adjustment issues",
    "I'm having trouble sleeping",
    "I'm feeling isolated or lonely",
    "Something else"
  ]

  const toggleCart = (productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isInCart: !p.isInCart } : p
    ))
  }

  const cartItems = products.filter(p => p.isInCart)
  const cartCount = cartItems.length

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`
  }

  const handleConcernChange = (concern: string) => {
    setAppointmentForm(prev => ({
      ...prev,
      concern
    }))
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-cloud-dancer">
      {/* Header */}
      <div className="bg-darkest-hour text-cloud-dancer p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-blue-violet rounded transition-colors mr-3"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold pixel-text">
            {currentView === 'counseling' ? 'COUNSELLING' : currentView === 'cart' ? 'SHOPPING CART' : 'ADD2CART'}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentView('counseling')}
            className={`px-4 py-2 rounded pixel-text font-bold border-2 border-cloud-dancer transition-colors ${
              currentView === 'counseling' ? 'bg-exuberant-orange text-cloud-dancer' : 'bg-cloud-dancer text-darkest-hour hover:bg-sun-glare'
            }`}
          >
            COUNSELLING
          </button>
          <button
            onClick={() => setCurrentView('cart')}
            className="relative bg-exuberant-orange text-cloud-dancer px-4 py-2 rounded pixel-text font-bold border-2 border-cloud-dancer hover:bg-sun-glare hover:text-darkest-hour transition-colors"
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            CART
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-violet text-cloud-dancer text-xs w-5 h-5 flex items-center justify-center pixel-text font-bold border border-cloud-dancer rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Shopping View */}
      {currentView === 'main' && (
        <div className="p-4">
          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkest-hour w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour placeholder-darkest-hour/60 pixel-text font-bold focus:outline-none focus:border-blue-violet"
              />
            </div>

            <button
              onClick={() => setCurrentView('cart')}
              className="relative bg-blue-violet text-cloud-dancer px-4 py-3 border-4 border-darkest-hour pixel-text font-bold hover:bg-darkest-hour transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-darkest-hour" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-exuberant-orange text-cloud-dancer text-xs w-5 h-5 flex items-center justify-center pixel-text font-bold border-2 border-darkest-hour">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-exuberant-orange text-cloud-dancer px-4 py-3 border-4 border-darkest-hour appearance-none pr-8 focus:outline-none pixel-text font-bold"
              >
                <option value="Best Match">Best Match</option>
                <option value="Price Low">Price Low</option>
                <option value="Price High">Price High</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-cloud-dancer border-4 border-darkest-hour cursor-pointer hover:border-blue-violet transition-colors"
                onClick={() => {
                  setSelectedProduct(product)
                  setCurrentView('product')
                }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Star className="w-4 h-4 fill-sun-glare text-sun-glare" />
                    <span className="pixel-text text-xs font-bold text-darkest-hour bg-cloud-dancer px-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="pixel-text font-bold text-darkest-hour mb-2 truncate">{product.name}</h3>
                  <p className="pixel-text text-darkest-hour/70 text-sm mb-2">by {product.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="pixel-text font-bold text-darkest-hour text-lg">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCart(product.id)
                      }}
                      className={`w-8 h-8 flex items-center justify-center text-cloud-dancer border-2 border-darkest-hour ${
                        product.isInCart ? 'bg-exuberant-orange' : 'bg-blue-violet hover:bg-exuberant-orange'
                      } transition-colors`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart View */}
      {currentView === 'cart' && (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('main')}
            className="mb-4 flex items-center text-darkest-hour hover:text-blue-violet transition-colors pixel-text font-bold"
          >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO SHOPPING
          </button>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-darkest-hour/50" />
              <h3 className="pixel-text font-bold text-darkest-hour text-xl mb-2">YOUR CART IS EMPTY</h3>
              <p className="pixel-text text-darkest-hour/70 mb-6">Add some items to get started!</p>
              <button
                onClick={() => setCurrentView('main')}
                className="bg-exuberant-orange text-cloud-dancer px-6 py-3 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-cloud-dancer border-4 border-darkest-hour p-4 flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border-2 border-darkest-hour" />
                  <div className="flex-1">
                    <h3 className="pixel-text font-bold text-darkest-hour">{item.name}</h3>
                    <p className="pixel-text text-darkest-hour/70 text-sm">by {item.seller}</p>
                    <p className="pixel-text font-bold text-darkest-hour">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => toggleCart(item.id)}
                    className="bg-exuberant-orange text-cloud-dancer p-2 border-2 border-darkest-hour hover:bg-sun-glare hover:text-darkest-hour transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="bg-cloud-dancer border-4 border-darkest-hour p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="pixel-text font-bold text-darkest-hour text-xl">TOTAL:</span>
                  <span className="pixel-text font-bold text-darkest-hour text-xl">
                    {formatPrice(cartItems.reduce((total, item) => total + item.price, 0))}
                  </span>
                </div>
                <button className="w-full bg-exuberant-orange text-cloud-dancer py-3 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Detail View */}
      {currentView === 'product' && selectedProduct && (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('main')}
            className="mb-4 flex items-center text-darkest-hour hover:text-blue-violet transition-colors pixel-text font-bold"
          >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO PRODUCTS
          </button>

          <div className="bg-cloud-dancer border-4 border-darkest-hour p-6">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover border-4 border-darkest-hour mb-4"
            />

            <div className="flex items-center justify-between mb-6 p-4 border-4 border-darkest-hour bg-cloud-dancer">
              <div>
                <h1 className="pixel-text font-bold text-darkest-hour text-2xl mb-2">{selectedProduct.name}</h1>
                <p className="pixel-text text-darkest-hour/70">by {selectedProduct.seller}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="w-4 h-4 fill-sun-glare text-sun-glare" />
                  <span className="pixel-text font-bold text-darkest-hour">{selectedProduct.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl pixel-text font-bold text-darkest-hour mb-4">
                  {formatPrice(selectedProduct.price)}
                </div>
                <button
                  onClick={() => toggleCart(selectedProduct.id)}
                  className={`px-6 py-3 text-cloud-dancer border-4 border-darkest-hour pixel-text font-bold transition-colors ${
                    selectedProduct.isInCart ? 'bg-exuberant-orange hover:bg-sun-glare hover:text-darkest-hour' : 'bg-blue-violet hover:bg-exuberant-orange'
                  }`}
                >
                  {selectedProduct.isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
                </button>
              </div>
            </div>

            {selectedProduct.description && (
              <div className="mb-6">
                <h3 className="pixel-text font-bold text-darkest-hour mb-2">DESCRIPTION</h3>
                <p className="pixel-text text-darkest-hour leading-relaxed">{selectedProduct.description}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-violet text-cloud-dancer py-3 border-4 border-darkest-hour pixel-text font-bold hover:bg-darkest-hour transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                SHARE
              </button>
              <button className="flex-1 bg-exuberant-orange text-cloud-dancer py-3 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors">
                <Heart className="w-4 h-4 inline mr-2" />
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Counselling View */}
      {currentView === 'counseling' && (
        <div className="p-4">
          <div className="bg-cloud-dancer border-4 border-darkest-hour p-6 mb-6">
            <h2 className="pixel-text font-bold text-darkest-hour text-2xl mb-4">STUDENT COUNSELLING SERVICE</h2>
            <p className="pixel-text text-darkest-hour leading-relaxed mb-6">
              Our counselling service provides support for Malaysian students studying in Korea. 
              We offer confidential, professional counselling to help you navigate academic, 
              personal, and cultural challenges.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-violet text-cloud-dancer p-4 border-2 border-darkest-hour">
                <Phone className="w-8 h-8 mb-2" />
                <h3 className="pixel-text font-bold mb-2">PHONE COUNSELLING</h3>
                <p className="pixel-text text-sm">Available 24/7 for urgent support</p>
              </div>
              <div className="bg-exuberant-orange text-cloud-dancer p-4 border-2 border-darkest-hour">
                <Video className="w-8 h-8 mb-2" />
                <h3 className="pixel-text font-bold mb-2">VIDEO COUNSELLING</h3>
                <p className="pixel-text text-sm">Face-to-face sessions online</p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="bg-cloud-dancer border-4 border-darkest-hour p-6">
            <h3 className="pixel-text font-bold text-darkest-hour text-xl mb-6">BOOK APPOINTMENT</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">FULL NAME</label>
                  <input
                    type="text"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                    placeholder="Enter your full name..."
                  />
                </div>
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">STUDENT NUMBER</label>
                  <input
                    type="text"
                    value={appointmentForm.studentNo}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, studentNo: e.target.value}))}
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                    placeholder="Enter student number..."
                  />
                </div>
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">MAJOR</label>
                <input
                  type="text"
                  value={appointmentForm.major}
                  onChange={(e) => setAppointmentForm(prev => ({...prev, major: e.target.value}))}
                  className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                  placeholder="Enter your major..."
                />
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">AREA OF CONCERN</label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {counselingConcerns.map((concern, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleConcernChange(concern)}
                      className={`p-3 text-left border-2 pixel-text transition-colors ${
                        appointmentForm.concern === concern
                          ? 'bg-blue-violet text-cloud-dancer border-darkest-hour'
                          : 'bg-cloud-dancer text-darkest-hour border-darkest-hour hover:bg-sun-glare'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">MEETING TYPE</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAppointmentForm(prev => ({...prev, meetingType: 'online'}))}
                    className={`p-4 border-4 border-darkest-hour pixel-text font-bold transition-colors ${
                      appointmentForm.meetingType === 'online'
                        ? 'bg-blue-violet text-cloud-dancer'
                        : 'bg-cloud-dancer text-darkest-hour hover:bg-sun-glare'
                    }`}
                  >
                    <Video className="w-6 h-6 mx-auto mb-2" />
                    ONLINE
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppointmentForm(prev => ({...prev, meetingType: 'in-person'}))}
                    className={`p-4 border-4 border-darkest-hour pixel-text font-bold transition-colors ${
                      appointmentForm.meetingType === 'in-person'
                        ? 'bg-blue-violet text-cloud-dancer'
                        : 'bg-cloud-dancer text-darkest-hour hover:bg-sun-glare'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    IN-PERSON
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">PREFERRED DATE</label>
                  <input
                    type="date"
                    value={appointmentForm.preferredDate}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, preferredDate: e.target.value}))}
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                  />
                </div>
                <div>
                  <label className="block pixel-text font-bold text-darkest-hour mb-2">PREFERRED TIME</label>
                  <select
                    value={appointmentForm.preferredTime}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, preferredTime: e.target.value}))}
                    className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet"
                  >
                    <option value="">Select time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block pixel-text font-bold text-darkest-hour mb-2">ADDITIONAL NOTES (OPTIONAL)</label>
                <textarea
                  rows={4}
                  value={appointmentForm.additionalNotes}
                  onChange={(e) => setAppointmentForm(prev => ({...prev, additionalNotes: e.target.value}))}
                  className="w-full px-4 py-3 border-4 border-darkest-hour bg-cloud-dancer text-darkest-hour pixel-text focus:outline-none focus:border-blue-violet resize-none"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-exuberant-orange text-cloud-dancer py-4 border-4 border-darkest-hour pixel-text font-bold hover:bg-sun-glare hover:text-darkest-hour transition-colors"
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                BOOK APPOINTMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CounsellingCartApp
