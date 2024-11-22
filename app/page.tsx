"'use client'"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { VideoFeed } from "@/components/video-feed"

const LOADING_TIME = 2000 // 2 seconds

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, LOADING_TIME)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return <VideoFeed />
}

