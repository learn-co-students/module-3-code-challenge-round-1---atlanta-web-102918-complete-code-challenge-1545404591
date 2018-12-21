document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1748 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL)
  likeHandler()
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
