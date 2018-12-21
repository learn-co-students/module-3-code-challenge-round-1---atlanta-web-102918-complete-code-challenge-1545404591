document.addEventListener('DOMContentLoaded', initPage())

  let imageId = 1747

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

function initPage(){
  fetchImageObject()
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
