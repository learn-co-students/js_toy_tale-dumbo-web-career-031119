// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    let addToy = false
    let bigDiv = document.getElementById('toy-collection')



    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
        // submit listener here
      } else {
        toyForm.style.display = 'none'
      }
    })


    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then((parsedResponse) => {
        parsedResponse.forEach(
          toy => {
            let toyDiv = document.createElement('div')
            toyDiv.innerHTML = `<div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button data-current-likes="${toy.likes}" data-index-number="${toy.id}" data-name="${toy.name}" class="like-btn" >Like <3</button>
          </div>`
            bigDiv.appendChild(toyDiv)
          }
        )
      })



    let toyButton = document.getElementsByClassName('submit')[0]

    toyButton.addEventListener('click', (event) => {
      let toyName = document.getElementById('name')
      let toyImage = document.getElementById('image')
      event.preventDefault()
      return fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              name: toyName.value,
              image: toyImage.value,
              likes: 0
            })
            //end of configobj
          }
          //end of fetch
        ).then(response => {
          return response.json()
        })
        .then(parsedResponse => {
          let div = document.createElement('div')
          let toyDiv = document.createElement('div')
          toyDiv.innerHTML = `<div class="card">
          <h2>${parsedResponse.name}</h2>
          <img src=${parsedResponse.image} class="toy-avatar" />
          <p>${parsedResponse.likes} Likes </p>
          <button data-current-likes="${parsedResponse.likes}" data-index-number="${parsedResponse.id}" data-name="${parsedResponse.name}" class="like-btn" >Like <3</button>
        </div>`
          bigDiv.prepend(toyDiv)
        })
    })

    bigDiv.addEventListener('click', (event) => {
      if (event.target.tagName == 'BUTTON') {
        // console.log(event.target.dataset.indexNumber)

        updateLikesOnServer(event.target.dataset.indexNumber, event.target.dataset.currentLikes).then(() => {
          let newLikes = (parseInt(event.target.dataset.currentLikes) + 1)
          event.target.parentElement.querySelector('p').innerText = `${newLikes} likes`
          event.target.dataset.currentLikes = newLikes
        })
      }
    })

    const updateLikesOnServer = (targetEle, currentLikes) => {
      return fetch(`http://localhost:3000/toys/${targetEle}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: (parseInt(currentLikes) + 1)
        })
      })
    }















    // end of DOM content loaded function
  }
  //end of dom content loaded parenthesis
)