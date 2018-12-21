document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1747

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

function getImage(){
  return fetch('https://randopic.herokuapp.com/images/1747').then(function (res) {
    return res.json()
    .then(image => renderImage(image))}
  })
}

function renderImage(){
  let html = imageCardHtml(image)
  let container = document.querySelector('.container')
  container.innerHTML += html
  let title = document.querySelector('#name')
  title.innerHTML += ${image.name}
  debugger
}
//fuck. My brain isnt working.
