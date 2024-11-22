import { useState, useRef, useEffect } from "'react'"
import { Heart, MessageCircle, Share, Music, VolumeX, Volume2 } from "'lucide-react'"
import { motion, AnimatePresence } from "'framer-motion'"

interface VideoPost {
  id: string
  username: string
  description: string
  songName: string
  likes: number
  comments: number
  shares: number
  videoUrl: string
}

const SAMPLE_POSTS: VideoPost[] = [
  {
    id: "1",
    username: "@healthyliving",
    description: "Quick morning workout routine 💪 #fitness #health",
    songName: "Workout Mix - Trainer Joe",
    likes: 1234,
    comments: 123,
    shares: 45,
    videoUrl: "/video1.mp4",
  },
  {
    id: "2",
    username: "@foodlover",
    description: "Easy 5-minute recipe for busy days 🍳 #quickmeals #cooking",
    songName: "Kitchen Beats - Chef Maria",
    likes: 5678,
    comments: 456,
    shares: 89,
    videoUrl: "/video2.mp4",
  },
]

export function VideoFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({})

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "'0px'",
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          video.play().catch(error => console.error("'Error playing video:'", error))
        } else {
          video.pause()
        }
      })
    }, options)

    Object.values(videoRefs.current).forEach(video => {
      observer.observe(video)
    })

    return () => {
      Object.values(videoRefs.current).forEach(video => {
        observer.unobserve(video)
      })
    }
  }, [])

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleShare = async (postId: string) => {
    const shareUrl = `https://pumptok.com/video/${postId}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: "'Check out this PumpTok video!'",
          url: shareUrl
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert("'Link copied to clipboard!'")
      }
    } catch (error) {
      console.error("'Error sharing:'", error)
    }
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
    Object.values(videoRefs.current).forEach(video => {
      video.muted = !isMuted
    })
  }

  return (
    <div className="snap-y snap-mandatory h-[calc(100vh-8rem)] overflow-y-scroll">
      {SAMPLE_POSTS.map((post) => (
        <div
          key={post.id}
          className="snap-start relative h-[calc(100vh-8rem)] w-full bg-gray-900"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={el => { if (el) videoRefs.current[post.id] = el }}
              className="h-full w-full object-cover"
              src={post.videoUrl}
              loop
              muted={isMuted}
              playsInline
              onError={(e) => console.error("'Error loading video:'", e)}
            />
          </div>

          <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
            <div className="max-w-[80%]">
              <p className="font-semibold mb-2">{post.username}</p>
              <p className="text-sm mb-2">{post.description}</p>
              <div className="flex items-center text-sm">
                <Music className="w-4 h-4 mr-2" />
                <span>{post.songName}</span>
              </div>
            </div>
          </div>

          <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
            <button 
              className="flex flex-col items-center"
              onClick={() => handleLike(post.id)}
            >
              <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
                <AnimatePresence>
                  {likedPosts.has(post.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute"
                    >
                      <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Heart className={`w-6 h-6 ${likedPosts.has(post.id) ? "'text-red-500'" : "''"}`} />
              </div>
              <span className="text-xs mt-1">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">{post.comments}</span>
            </button>
            <button 
              className="flex flex-col items-center"
              onClick={() => handleShare(post.id)}
            >
              <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
                <Share className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">{post.shares}</span>
            </button>
            <button 
              className="flex flex-col items-center"
              onClick={toggleMute}
            >
              <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </div>
              <span className="text-xs mt-1">{isMuted ? "'Unmute'" : "'Mute'"}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

