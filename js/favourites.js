let heroesArray = JSON.parse(localStorage.getItem('favsuperheroes'));
console.log(heroesArray);
let accessToken = '1339275583167650';
let url = `https://superheroapi.com/api.php/${accessToken}/`;
let favHeroes = document.querySelector('.fav-heroes');


let getSuperHeroData = () => {
if(heroesArray.length==0){
    favHeroes.innerHTML = '<h2>No favourite Superheroes found...</h2>';
}else{
    favHeroes.innerHTML = ' ';
    heroesArray.forEach((id) => {
        fetchData(id);
       
    })
}
}
//fetch data for the fav superhero page
let fetchData = async (heroId)=>{
    await fetch(url+heroId)
    .then(res=> res.json())
    .then(data => renderData(data))
    .catch(error => console.log(error));
}
let renderData = (hero)=> {
    
    let newDiv = document.createElement('div');
    newDiv.className = 'results col-lg-3 col-md-4 col-sm-6';
    newDiv.id = hero.id;
  //   check id in local storage
  let isFav ;
  if(heroesArray.indexOf(hero.id) != -1){
      isFav = true;
  }else{
      isFav = false;
  }
    newDiv.innerHTML =
    `
    
    <div class="hero-info m-1">
    <div class="hero-pic">
    <img src="${hero.image.url}">
    </div>
    <div class="hero-details" > 
    <div id=${hero.id}>
    <p class="get-details wdiv text-center mt-1">${hero.name}</p>
    <p class="get-details wdiv text-center mt-1">${hero.appearance.gender}</p>
    </div>
    <div class="text-center wdiv mb-1">
    <i id=likeable class="${isFav ? 'fas' : 'far'} fa-heart fa-2x fav-btn"></i>
    </div>
    </div>
    <div>
    <a id="morebtn" href="superhero.html?id=${hero.id}">more ></b></a>
</div>
    </div>
    `;
    favHeroes.appendChild(newDiv);
}

//Handle Events

//Event listener on the SuperHero name and fav button
favHeroes.addEventListener('click',(e)=>{
    console.log(e.target.parentNode.id);
        if(e.target.classList.contains('get-details')){
            let heroId= e.target.parentNode.id;
            window.open(`superhero.html?id=${heroId}`);
        }else if(e.target.classList.contains('fav-btn')){
            let heroId =  e.target.parentNode.previousElementSibling.id;
           
            // if id already exists in localStorage
            if(heroesArray.indexOf(heroId) != -1){
                //remove the id
                heroesArray = heroesArray.filter((item) => item != heroId);
                localStorage.setItem('favsuperheroes',JSON.stringify(heroesArray));
                e.target.classList.remove('fas');
                e.target.classList.add('far');
                // call the loading function again
                getSuperHeroData();
                alert('Removed from favourites');
            }
        }
    })
    

//content load event
document.addEventListener('DOMContentLoaded',getSuperHeroData());
