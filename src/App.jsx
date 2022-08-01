import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import Image from './components/Image'
import Header from './components/Header'

import { copy } from './helpers'

function App () {
  const [images, setImages] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/images')
      .then(resp => resp.json())
      .then(imagesFromServer => setImages(imagesFromServer))
  }, [])

  function likeImage (image) {
 
    fetch(`http://localhost:3001/images/${image.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: image.likes + 1 })
    })


    const updatedImages = copy(images)
    const match = updatedImages.find(target => target.id === image.id)
    match.likes++
    setImages(updatedImages)
  }

 

  function deleteComment (comment) {
  
    fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: 'DELETE'
    })

    
    const imagesCopy = copy(images)

    
    const imageToChange = imagesCopy.find(image => image.id === comment.imageId)
    imageToChange.comments = imageToChange.comments.filter(
      targetComment => targetComment.id !== comment.id
    )

   
    setImages(imagesCopy)
  }
  function createComment (content, imageId) {
   
    fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, imageId })
    })
      .then(resp => resp.json())
      .then(newComment => {
        
        const imagesCopy = copy(images)

        
        const imageToChange = imagesCopy.find(image => image.id === imageId)
        imageToChange.comments.push(newComment)

        
        setImages(imagesCopy)
      })
  }

  const searchedImages = images.filter(image =>
    image.title.toUpperCase().includes(search.toUpperCase())
  )

  return (
    <div className='App'>
      <Header />
      <section className='image-container'>
        {searchedImages.map(image => (
          <Image
            key={image.id}
            image={image}
            likeImage={likeImage}
            createComment={createComment}
            deleteComment={deleteComment}
          />
        ))}
      </section>
    </div>
  )
}

export default App
