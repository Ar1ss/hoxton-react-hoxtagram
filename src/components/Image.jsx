import React from 'react'
import './Image.css'

function Image (props) {
  function handleSubmit (event) {
    event.preventDefault()
    const formEl = event.target
    const content = formEl.comment.value
    props.createComment(content, props.image.id)
    formEl.reset()
  }

  return (
    <article className='image-card'>
      <h2 className='title'>{props.image.title}</h2>
      <img src={props.image.image} className='image' alt={props.image.title} />

      <div className='likes-section'>
        <span className='likes'>{props.image.likes} likes</span>
        <button
          className='like-button'
          onClick={() => {
            props.likeImage(props.image)
          }}
        >
          ♡
        </button>
      </div>
      <ul className='comments'>
        {props.image.comments.map(comment => (
          <li key={comment.id}>
            {comment.content}{' '}
            <button
            className='delete-button'
              onClick={function () {
                props.deleteComment(comment)
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form className='comment-form' onSubmit={handleSubmit}>
        <input
          className='comment-input'
          type='text'
          name='comment'
          placeholder='Add a comment...'
          required
        />
        <button className='comment-button' type='submit'>
          Post
        </button>
      </form>
    </article>
  )
}

export default Image
