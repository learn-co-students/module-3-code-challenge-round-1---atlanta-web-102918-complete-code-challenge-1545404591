document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1748 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL)
  likeHandler()
  formHandler()
})

function fetchImage(imageURL) {
  return fetch(imageURL)
    .then(res => res.json())
    // .then(console.log)
    .then(updateHTML)
}

function updateHTML(data) {
  console.log('From inside updateHTML():', data)

  let { name, like_count, comments } = data
  const imageTitle = document.querySelector('h4#name')
  const likes = document.querySelector('span#likes')
  let commentSection = document.querySelector('ul#comments')

  imageTitle.innerText = name
  likes.innerText = like_count.toString()
  comments.forEach(({ id, content }) => {
    commentSection.innerHTML += `
      <li id="${id}">${content}</li>
    `
  })
}

function likeHandler() {
  let likeButton = document.querySelector('#like_button')
  likeButton.addEventListener('click', increaseLikes)
}

function increaseLikes(e) {
  let likes = document.querySelector('#likes')
  likes.innerText = (parseInt(likes.innerText) + 1).toString()
  updateLikes(likes) 
}

function updateLikes(likes) {
  let intLikes = parseInt(likes.innerText)
  return fetch(`https://randopic.herokuapp.com/likes/`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      image_id: 1748, 
    })
  })
}

function formHandler() {
  let form = document.querySelector('#comment_form')
  form.addEventListener('submit', formSubmission)
}

function formSubmission(e) {
  e.preventDefault()
  let commentSection = document.querySelector('#comments')
  let comment = e.target.comment.value

  commentSection.innerHTML += `
    <li>${comment}</li>
  `
  updateComments(comment)
}

function updateComments(comment) {
  fetch(`https://randopic.herokuapp.com/comments`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      image_id: 1748, 
      content: comment
    })
  })
  .then(console.log)
}

