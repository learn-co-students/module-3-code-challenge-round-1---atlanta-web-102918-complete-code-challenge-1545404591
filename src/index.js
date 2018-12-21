document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1745 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL)
})

//set up function fetch to get image.

function fetchImage(imageURL) {
return fetch(imageURL).then(resp => resp.json())
}
//fetch just would not work for me :(


function addImage(pic){
  let imageArea = document.querySelector("#image")

  let imageHTML = `
  <img src="${pic.url}" id="image" data-id=""/>
  `

  imageArea.innerHTML += imageHTML
}

function addName(site) {
  let nameArea = document.querySelector("#name")

  let nameHTML = `
  <img src="${site.name}" id="image" data-id=""/>
  `

  nameArea.innerHTML += nameHTML
}
