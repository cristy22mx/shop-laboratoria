$(document).ready(function(){
    $('.carousel').carousel();
  });

const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementsByClassName('response-container');


const apiMercadolibre = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/users/306970587/`)
        .then(function(response) {
            response.json().then(function(result) {
//console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

apiMercadolibre();

form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML="";
    searchedForText=searchField.value;
   apiLoad();
})
const apiLoad = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`, )
        .then(function(response) {
            response.json().then(function(result) {
               // console.log(result.results);
                paintItems(result.results)

        });
    })
        .catch(function(err) {
            console.log(err);
        });
};



const categoriesCall = (category) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?category=${category}`)
        .then(function(response) {
            response.json().then(function(result) {
                paintItems(result.results)
                console.log("hola");
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

const codeAccion="MLM3422";
const action=document.getElementById("actionFigures").addEventListener("click", function(e){
   
  categoriesCall(codeAccion);
})

const codeHotWheels="MLM3398";
const hot=document.getElementById("tazos").addEventListener("click", function(e){
    
   categoriesCall(codeHotWheels);
 })

const codeStarWars="MLM2661";
const star=document.getElementById("starWars").addEventListener("click", function(e){
    
   categoriesCall(codeStarWars);
 })

const codeMusic="MLM7809"
const musica=document.getElementById("musica").addEventListener("click", function(e){
    
   categoriesCall(codeMusic);
 })

 const codeMovies="MLM7841"
 const movies=document.getElementById("movies").addEventListener("click", function(e){
     
    categoriesCall(codeMovies);
  })

  const codeSeries="MLM6217"
  const series=document.getElementById("series").addEventListener("click", function(e){
      
     categoriesCall(codeSeries);
   })
 





const increaseCounter = () => {
  counter += 1;
  carCounter.innerText = counter;
  console.log(counter);
}

const decreaseCounter = () => {
  counter -= 1;
  carCounter.innerText = counter;
  console.log(counter);
}

const changeButtonStatus = event => {
    let element = event.target
    let buttonText = element.firstChild.data;

    if(buttonText === "Agregar a carrito") {
        element.innerText = "Remover del carrito";
        increaseCounter();
    } else {
        element.innerText = "Agregar a carrito";
        decreaseCounter();
    }
}

const paintItems = (result) => {
    
    
    let containerProducts = document.getElementById('site-container');
    let templateProducts = ``;
   
     result.forEach((item) => {
        
        const addres=item.address.state_name;
         const image=item.thumbnail;
        templateProducts += `<div class="col s12 m3">
        <div class="card">
            <div class="card-image">
                <img src="${image}">
            </div>
            <div class="card-content">
                <p class="card-title short-text">${item.title}</p>
                <p class="">${item.price} MXN</p>
            </div>
            <div class="card-action">
                <button id="" onclick="changeButtonStatus(event)" class="btn waves-effect" type="" name="action">Agregar a carrito</button>
            </div>
        </div>
    </div>`
    
//console.log(available);
         
     });

     containerProducts.innerHTML = templateProducts;
    
}


//https://api.mercadolibre.com/sites/MLM/search?category=MLM7841   peliculas
//https://api.mercadolibre.com/sites/MLM/search?category=MLM6217 series
// https://api.mercadolibre.com/sites/MLM/search?category=MLM7809 musica