import { Post } from '../types'

const getRandomTimestamp = () => {
  const now = new Date()
  const randomHours = Math.floor(Math.random() * 72) // Random hours within last 3 days
  const randomDate = new Date(now.getTime() - randomHours * 60 * 60 * 1000)
  
  return randomDate.toLocaleString('en-GB', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5')
}

const getRandomReactions = () => {
  // UPDATED: Only 3 reactions now
  return {
    thumbsUp: Math.floor(Math.random() * 25),
    thumbsDown: Math.floor(Math.random() * 8),
    heart: Math.floor(Math.random() * 15)
  }
}

const getRandomComments = () => Math.floor(Math.random() * 20)

const batchPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'B23 Study Group Formation',
    content: 'Looking for serious study partners for upcoming finals. Let\'s form a group and conquer these exams together! Drop your subjects below.',
    images: [],
    batch: 'B23'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'B24 Orientation Week Memories',
    content: 'Just finished orientation week and wow! The seniors were amazing. Special thanks to all B21 and B22 students who helped us settle in.',
    images: ['https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'B24'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'B22 Internship Opportunities',
    content: 'Found some great internship openings at local tech companies. DM me if you\'re interested in the details. Let\'s help each other grow!',
    images: [],
    batch: 'B22'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'B21 Final Year Project Showcase',
    content: 'Our FYP showcase is next month! Come support your seniors and get inspired for your own projects. Innovation starts here!',
    images: ['https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'B21'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'B25 New Student Questions',
    content: 'Hi everyone! Just enrolled and feeling a bit overwhelmed. Any tips for surviving the first semester? What should I expect?',
    images: [],
    batch: 'B25'
  }
]

const majorPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'IT Students: Programming Bootcamp',
    content: 'Organizing a weekend coding bootcamp for IT students. We\'ll cover React, Node.js, and database fundamentals. Who\'s interested?',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Engineering Lab Equipment Update',
    content: 'Great news! The engineering lab just got new equipment. The 3D printers and CNC machines are now available for student projects.',
    images: ['https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Life Science Field Trip',
    content: 'Upcoming field trip to the marine research center! Limited spots available. Sign up at the faculty office by Friday.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Animation Showcase Event',
    content: 'Animation students are hosting a showcase of their latest works. Come see some amazing 2D and 3D animations this Thursday!',
    images: ['https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Arts Exhibition Opening',
    content: 'The annual arts exhibition opens next week! Featuring paintings, sculptures, and digital art from our talented students.',
    images: [],
    batch: 'N/A'
  }
]

const fashionPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Thrift Shopping Tips',
    content: 'Found amazing vintage pieces at the weekend market! Here are my top tips for thrift shopping on a student budget.',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'DIY Fashion Workshop',
    content: 'Hosting a DIY fashion workshop this weekend! Learn to upcycle old clothes and create unique pieces. Bring your old t-shirts!',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Sustainable Fashion Movement',
    content: 'Let\'s talk about sustainable fashion! Share your favorite eco-friendly brands and tips for building a conscious wardrobe.',
    images: [],
    batch: 'N/A'
  }
]

const religionPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Interfaith Dialogue Session',
    content: 'Join us for an interfaith dialogue session this Friday. Let\'s learn about different religious perspectives and build understanding.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Prayer Room Schedule',
    content: 'Updated prayer room schedule is now available. Please be mindful of the allocated times for different religious practices.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Religious Festival Celebration',
    content: 'Planning a multicultural religious festival celebration. All students welcome to participate and share their traditions!',
    images: ['https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  }
]

const musicPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Campus Band Auditions',
    content: 'The campus band is looking for new members! We need a drummer and a bassist. Auditions are next Tuesday at the music room.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'K-Pop Dance Cover Group',
    content: 'Starting a K-Pop dance cover group! Looking for dancers of all levels. Let\'s learn some choreos and have fun together!',
    images: ['https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Open Mic Night',
    content: 'Monthly open mic night is coming up! Sign up to perform your original songs, covers, or poetry. All talents welcome!',
    images: [],
    batch: 'N/A'
  }
]

const moviePosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Movie Night: Horror Marathon',
    content: 'Horror movie marathon this Saturday! Bringing classic and modern horror films. Popcorn and screams guaranteed!',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Student Film Festival',
    content: 'Submit your short films for our annual student film festival! Deadline is next month. Cash prizes for winners!',
    images: ['https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Cinema Club Discussion',
    content: 'This week we\'re discussing the cinematography in recent blockbusters. Join us for coffee and film analysis!',
    images: [],
    batch: 'N/A'
  }
]

const sportsPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Inter-Faculty Football Tournament',
    content: 'Registration is open for the inter-faculty football tournament! Form your teams and let\'s see who rules the field!',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Swimming Pool Schedule',
    content: 'New swimming pool schedule is out! More evening slots available for students. Don\'t forget to bring your student ID.',
    images: ['https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'E-Sports Tournament',
    content: 'Mobile Legends and PUBG tournament next week! Register your teams now. Gaming setup provided in the computer lab.',
    images: [],
    batch: 'N/A'
  }
]

const mensPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Men\'s Grooming Workshop',
    content: 'Learn the basics of men\'s grooming and skincare. Professional barber will teach us proper shaving techniques and hair care.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Brotherhood Bonding Session',
    content: 'Monthly brotherhood session this weekend. Let\'s discuss career goals, relationships, and support each other\'s growth.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Fitness Challenge',
    content: '30-day fitness challenge starting Monday! Let\'s motivate each other to stay healthy and build good habits together.',
    images: ['https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  }
]

const womensPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Women\'s Empowerment Workshop',
    content: 'Join us for a workshop on leadership, confidence building, and career development. Guest speaker from a Fortune 500 company!',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Self-Care Sunday',
    content: 'Monthly self-care session with face masks, meditation, and positive affirmations. Let\'s prioritize our mental health together!',
    images: ['https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800'],
    batch: 'N/A'
  },
  {
    author: 'Anonymous',
    avatar: '🎮',
    title: 'Sister Circle Discussion',
    content: 'Safe space to discuss challenges, celebrate achievements, and support each other. All women welcome to share and listen.',
    images: [],
    batch: 'N/A'
  }
]

const announcementPosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = [
  {
    author: 'Admin',
    avatar: '👨‍💼',
    title: 'Library Extended Hours',
    content: 'The library will now be open 24/7 during exam period. Additional study spaces and computer terminals have been set up.',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Admin',
    avatar: '👨‍💼',
    title: 'Campus WiFi Upgrade',
    content: 'Campus-wide WiFi upgrade completed! Faster speeds and better coverage throughout all buildings. New password: MYPLE2025',
    images: [],
    batch: 'N/A'
  },
  {
    author: 'Admin',
    avatar: '👨‍💼',
    title: 'Scholarship Applications Open',
    content: 'Merit-based scholarship applications are now open! Deadline is end of this month. Check the student portal for details.',
    images: [],
    batch: 'N/A'
  }
]

export const generateMockPosts = (boardType: string): Post[] => {
  let basePosts: Omit<Post, 'id' | 'timestamp' | 'reactions' | 'comments' | 'isBookmarked' | 'userReaction'>[] = []
  
  switch (boardType) {
    case 'batch':
      basePosts = batchPosts
      break
    case 'major':
      basePosts = majorPosts
      break
    case 'fashion':
      basePosts = fashionPosts
      break
    case 'religion':
      basePosts = religionPosts
      break
    case 'music':
      basePosts = musicPosts
      break
    case 'movie':
      basePosts = moviePosts
      break
    case 'sports':
      basePosts = sportsPosts
      break
    case 'mens':
      basePosts = mensPosts
      break
    case 'womens':
      basePosts = womensPosts
      break
    case 'announcements':
      basePosts = announcementPosts
      break
    default:
      basePosts = batchPosts
  }

  return basePosts.map((post, index) => ({
    ...post,
    id: `${boardType}-${index}`,
    timestamp: getRandomTimestamp(),
    reactions: getRandomReactions(),
    comments: getRandomComments(),
    isBookmarked: false,
    userReaction: null
  }))
}
