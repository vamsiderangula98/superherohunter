let searchInput = document.querySelector('#search-input');
let srHeading = document.querySelector('#search-results-heading');
let searchResults = document.querySelector('.search-results');
//variables for fav button
let ifFav = 'fas';
let ifNotFav = 'far';
// getting accessToken for Api
let accessToken = '1339275583167650';
// getting api url
let url =  `https://www.superheroapi.com/api.php/${accessToken}/search/`;

//Event listener on Input element for every letter typed
searchInput.addEventListener('keyup',(e)=>{

    let searchText = e.target.value;
  
    if(searchText.length < 2){
        srHeading.textContent = 'Enter Atleast 2 letters';
        searchResults.innerHTML = '';
    }else{
        srHeading.textContent = `Search Results for : ${searchText}` ;
        fetchData(searchText);
    }

});
//fetch data from Api
let fetchData = async (searchText) => {
    
    await fetch(url+searchText)
    .then(res => res.json())
    .then(data => renderData(data))
    .catch(error =>  searchResults.innerHTML = '<h3 class="mt-4 text-info">No Results Found!!!</h3>')
}
// initialize empty array for local storage

function initializeLocalstorage(){
    let localArray = [];
    if(localStorage.getItem('superheroes') == null){
        //create a new localStorage
        localStorage.setItem('superheroes',JSON.stringify(localArray));
    }
}

//Rendering Api data on to browser
let renderData = (data)=> {
    let localArray = JSON.parse(localStorage.getItem('superheroes'));
    if(data.length == 0){
        console.log('Results Not Found');
    }else{
        searchResults.innerHTML = '';
        for(let hero of data.results){
          let newDiv = document.createElement('div');
          newDiv.className = 'results col-lg-3 col-md-4 col-sm-6 ';
          newDiv.id = hero.id;
        //   check id in local storage
        let isFav ;
        if(localArray.indexOf(hero.id) != -1){
            isFav = true;
        }else{
            isFav = false;
        }
          newDiv.innerHTML =
          `
          <div class="hero-info">
         
          <div class="hero-details" id=${hero.id}>
                <p class="get-details wdiv text-center " >${hero.name}</p>
                <p class="get-details wdiv text-center " >${hero.appearance.gender}</p>
         <div class="text-center wdiv mt-1 mb-1">
          <i id="likeable" class="${isFav ? 'fas' : 'far'} fa-heart fa-2x fav-btn mb-1 "></i>
          </div>
          </div>
          <div class="hero-pic">
          <img src="${hero.image.url}">
          </div>
          
          </div>
          `;
          searchResults.appendChild(newDiv);
      }  
    }  
}

//Event listener on the SuperHero name and fav button
searchResults.addEventListener('click',(e)=>{
console.log(e.target.parentNode.id);
    if(e.target.classList.contains('get-details')){
        let heroId= e.target.parentNode.id;
        window.open(`superhero.html?id=${heroId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let heroId =  e.target.parentNode.previousElementSibling.id;
        let localArray = JSON.parse(localStorage.getItem('superheroes'));

        // if id already exists in localStorage
        if(localArray.indexOf(heroId) != -1){
            //remove the id
            localArray = localArray.filter((item) => item != heroId);
            localStorage.setItem('superheroes',JSON.stringify(localArray));
            e.target.classList.remove('fas');
            e.target.classList.add('far');
            alert('Removed from favourites...');
        }else{
            localArray.push(heroId);
            localStorage.setItem('superheroes',JSON.stringify(localArray));
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            alert('Added to favourites...');
        }
    }
})


//Event Listener for local storage initialization
document.addEventListener('DOMContentLoaded',initializeLocalstorage);