$(document).ready(function(){
    $('.carousel').carousel();
  });

const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementsByClassName('response-container');
const carCounter = document.getElementById('items-counter');
let counter = 0;
/*
const apiArtesania = () => {
    fetch(`https://api.mercadolibre.com/sites/MLM/trends/search?category=MLM1574`)
        .then(function(response) {
            response.json().then(function(result) {
                console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};


apiArtesania();
*/


const apiMercadolibre = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/users/306970587/`)
        .then(function(response) {
            response.json().then(function(result) {
                console.log(result);
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
                console.log(result.results);
                paintItems(result.results)

        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

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
                <h3 class="card-title">${item.title}</h3>
                <p>${item.price} MXN</p>
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

