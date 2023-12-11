'use client'

import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { Router } from "next/router"
import { useEffect, useState } from "react"

const LikeButton = ({ post }) => {

  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(() => {
    const storedIsLiked = JSON.parse(window.localStorage.getItem(`isLiked_${post._id}`))
    return storedIsLiked != null ? storedIsLiked : false
  })
  const [likes, setLikes] = useState(post.likes)

  useEffect(() => {
    const storedIsLiked = JSON.parse(window.localStorage.getItem(`isLiked_${post._id}`))
    if (storedIsLiked === null) {
      window.localStorage.setItem(`isLiked_${post.id}`, JSON.stringify(true))
      setIsLiked(true)
    }
    if(!session) {
      setIsLiked(false)
    }
  }, [])

  const handleLikeClick = async () => {
    if (!session) {
      signIn()
      return
    }
    try {
      if (!isLiked) {
        const response = await fetch(`/api/prompt/${post._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            likes: post.likes + 1
          })
        }
      )
      setIsLiked(prevIsLiked => ! prevIsLiked)
      setLikes((prevLikes) => prevLikes + 1)
      window.localStorage.setItem(`isLiked_${post._id}`, JSON.stringify(true))
      } else {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            likes: post.likes - 1
          })
        })
      setIsLiked(prevIsLiked => ! prevIsLiked)
      setLikes((prevLikes) => prevLikes - 1)
      window.localStorage.setItem(`isLiked_${post._id}`, JSON.stringify(false))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex cursor-pointer gap-2">
      <Image 
        src={isLiked ? '/assets/icons/love-like-black.svg' : '/assets/icons/love-like.svg'}
        width={15} 
        height={15}
        alt="like-button"
        onClick={handleLikeClick}
        />
      <p>{likes}</p>
    </div>
  )
}

export default LikeButton