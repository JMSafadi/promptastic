'use client'
import { useState, useEffect, Suspense } from "react"
import PromptCard from "./PromptCard"
import LoadingSpinner from "./LoadingSpinner"

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      { data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )) }
    </div>
  )
}

const Feed = () => {

  // const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // const handleSearchChange = (e) => {

  // }

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      const sotredPosts = data.sort((a, b) => b.likes - a.likes)
      setPosts(sotredPosts)
      console.log(posts)
      setLoading(false)
    }
    fetchPosts()
  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flexcenter">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          // value={searchText}
          // onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {
        loading 
        ?
        <LoadingSpinner/> 
        :
        <PromptCardList
          data={posts}
          handleTagClick={() => {}}
        />
      }
    </section>
  )
}

export default Feed