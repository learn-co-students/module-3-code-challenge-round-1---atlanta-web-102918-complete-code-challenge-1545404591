document.addEventListener('DOMContentLoaded', init())

let imageId = 2357

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

function init() {
  console.log('init')
  fetchImage()
  addSubmitHandler()

}

function fetchImage() {
  fetch("https://randopic.herokuapp.com/images/2357")
    .then(function (response) { return response.json() })
    .then(function (data) { renderImage(data) })
}

function renderImage(data) {
  let img = document.querySelector('#image')
  img.dataId = data.id
  img.dataImg = data
  img.src = data.url
  let title = document.querySelector('#name')
  title.innerText = data.name
  let likes = document.querySelector('#likes')
  likes.innerText = data['like_count']
  data.comments.forEach(renderComment)
  console.log(data)
}

function renderComment(comment) {
  let html = `<li id=${comment.id}>${comment.content || comment}<button data-id=${comment.id} class="button" >Delete</button></li>`
  let commentsContainer = document.querySelector('#comments')
  commentsContainer.innerHTML += html
  let deleteButtons = document.querySelectorAll(`.button`)
  console.log(deleteButtons)
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', deleteTodoItem)
  })
}

function deleteTodoItem(event) {
  event.preventDefault();
  let commentId = event.target.dataset['id']
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
  let comment = document.getElementById(`${commentId}`)
  comment.remove()

}

function addSubmitHandler() {
  let form = document.querySelector('#comment_form')
  form.addEventListener('submit', proccessCommentForm)
}

function proccessCommentForm(e) {
  e.preventDefault();
  let comment = e.target.comment.value
  let img = document.querySelector('#image')
  console.log('inside proccessCommentForm', comment)
  renderComment(comment)
  e.target.reset()
  console.log(img['dataId'])
  let data = { content: comment, image_id: img['dataId'] }
  fetch(commentsURL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });

}