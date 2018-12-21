document.addEventListener('DOMContentLoaded', initPage)
 // () => {
 //  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1746 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


function initPage(){
  fetchImage()
}

function fetchImage(){
  fetch(imageURL)
  .then(res => res.json())
  .then(json => renderImage(json))
}

function renderImage(json){
  let commentsHTML = ""
  json.comments.forEach(function (comment){
    commentsHTML += `<li id="comment-${comment.id}">${comment.content}</li>`
  })
  document.querySelector("#image").src = json.url
  document.querySelector("#name").innerHTML = json.name
  document.querySelector("#likes").innerHTML = json.like_count
  document.querySelector("#comments").innerHTML = commentsHTML
  addLikesHandler()
}

function addLikesHandler(){
  let likeBtn = document.querySelector("#like_button")
  likeBtn.addEventListener('click', processLike)
}

function processLike(event){
  event.preventDefault()
  let likesId = event.target.parentNode.querySelector("#likes")
  let likesNum = parseInt(likesId.innerHTML)
  likesNum += 1
  likesId.innerHTML = likesNum
}

// 1746
// https://randopic.herokuapp.com/images/1746
