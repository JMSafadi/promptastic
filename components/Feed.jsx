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

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const handleSearchChange = (e) => {
    const text = e.target.value
    setSearchText(text)

    const filteredPosts = posts.filter(post => {
      const promptMatches = post.prompt.toLowerCase().includes(text.toLowerCase())
      const tagsArray = post.tag.split('#').filter(tag => tag.trim() !== '')
      const tagsMatch = tagsArray.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
      return promptMatches || tagsMatch
    })
    setFilteredPosts(filteredPosts)
  }

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      const sotredPosts = data.sort((a, b) => b.likes - a.likes)
      setPosts(sotredPosts)
      setLoading(false)
    }
    fetchPosts()
  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flexcenter">
        <input
          type="text"
          autoFocus
          placeholder="Search for a key word or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {
        loading 
        ?
        <LoadingSpinner/>
        :
        <>
          {searchText ? 
          (filteredPosts.length > 0 ? 
            (
              // If exits an user search, and there are matches with a post: render filtered posts.
              <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
              ) : 
              // If exists an user search, and there are not matches with a post: render 'there are no matches'.
              <p className="my-10 font-satoshi font-semibold text-sm">Unfortunately there are no matches with your search.</p>
              )
              : 
              (
            // If doesn't exists an user search: render all posts.
            <PromptCardList data={posts} handleTagClick={() => {}} />
          )
          }
        </>
      }
    </section>
  )
}

export default Feed