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
  addCommentHandler()
}

function addLikesHandler(){
  let likeBtn = document.querySelector("#like_button")
  likeBtn.addEventListener('click', processLike)
}

function processLike(event){
  //why is this a post request.  Seems like it should be a patch.
  event.preventDefault()
  let likesId = event.target.parentNode.querySelector("#likes")
  let likesNum = parseInt(likesId.innerHTML)
  likesNum += 1
  likesId.innerHTML = likesNum

  let request = new Request(likeURL)
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 1746,
      like_count: likesNum
    })
  }
  fetch(request, options)
}

function addCommentHandler(){
  //finds comment form
  let form = document.querySelector("#comment_form")
  form.addEventListener("submit", processComment)
}

function processComment(event){
  //what does this do?  explain it to me again please
event.preventDefault
  //refactor search?
  let comment = event.target.querySelector("#comment_input").value
  let commentContainer = document.querySelector("#comments")
  commentContainer.innerHTML += `<li>${comment}</li>`

}

// 1746
// https://randopic.herokuapp.com/images/1746
