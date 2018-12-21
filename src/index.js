document.addEventListener('DOMContentLoaded', initPage())

  let imageId = 1747

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

function initPage(){
  fetchImageObject()
  likeHandler()
  addFormHandler()
}

function fetchImageObject(){
  return fetch(`https://randopic.herokuapp.com/images/1747`)
  .then(function(resp)  {return resp.json()})
  .then(function (data) {return renderData(data)})
}

function renderData(data){
  document.querySelector('#image').src = data.url
  document.querySelector('#name').innerText = data.name
  document.querySelector('#likes').innerText = data.like_count
  let commentContainer = document.querySelector('#comments')

  let comments = data.comments

  comments.forEach(function(comment){
  let contentHtml = `<li>${comment.content}</li>`
  commentContainer.innerHTML += contentHtml
  })
}

function likeHandler(){
  var likeButton = document.querySelector('#like_button')
  likeButton.addEventListener('click', incrementLikes)
}

function incrementLikes(event){
  event.preventDefault()
  let likeCount = parseInt(document.querySelector('#likes').innerText)
  likeCount += 1
  document.querySelector('#likes').innerText = likeCount


  let request = new Request(likeURL)
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      like_count: likeCount
    })
  }
  fetch(request, options)
}

function addFormHandler(){
  let form = document.querySelector('#comment_form')
  form.addEventListener("submit", processComment)
}

function processComment(event){
  event.preventDefault()
  let commentValue = event.target.comment.value
  let comments = document.querySelector('#comments')
  comments.innerHTML += `<li>${commentValue}</li>`
}
