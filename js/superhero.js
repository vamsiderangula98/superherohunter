// accessToken for Api
let accessToken = '1339275583167650';
//api url
let url =  `https://www.superheroapi.com/api.php/${accessToken}/`;
 


async function getSuperHeroData(){
    //get heroId from Url
    let heroId = await getHeroId();
    //call fetchData function
    await fetchData(heroId);

}

let getHeroId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}

//fetch data for the superhero page
let fetchData = async (heroId)=>{
    await fetch(url+heroId)
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(error => console.log(error));
}
let renderData = (hero) => {


//render superher biography
let bioContainer = document.querySelector('.shero-bio');
renderSubData(bioContainer,hero.biography);
//render superhero image and name
document.querySelector('.shero-iname').innerHTML =`
<div class="imagecard">
  <img src="${hero.image.url}" class="shero-image" alt="Avatar" style="width:100%">
  <div class="hero-container" >
    <h4><b>${hero.name}</b></h4>
    <p>SuperHero</p> 
  </div>
</div>
`;
//render hero appearance
let appContainer = document.querySelector('.shero-appearance');
renderSubData(appContainer,hero.appearance);
//render powerstats
let pStatsContainer = document.querySelector('.shero-powerstats');
renderSubData(pStatsContainer,hero.powerstats);


//render hero Connections
let conContainer = document.querySelector('.shero-connections');
renderSubData(conContainer,hero.connections);
//render hero Occupation
let workContainer = document.querySelector('.shero-work');
renderSubData(workContainer,hero.work);
}

let renderSubData = (container,data)=>{

    for(let key in data){
        container.innerHTML += `
        <div class="api-data">
        <div class="key">
        <p >${key}</p>
        </div>  
        <div class="value">
        <p>
        ${data[key]=='-'
        ?'Information not Available' 
        : data[key]}
        </p>

        </div>
        </div>
        `;
     }
}
//Handle Events
document.addEventListener('DOMContentLoaded',getSuperHeroData());