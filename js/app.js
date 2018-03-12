$(document).ready(function(){
    $('.carousel').carousel();
  });

const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');

const responseContainer=document.getElementsByClassName('response-container');
const carCounter = document.getElementById('items-counter');
let counter = 0;



const musicCall = () => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?category=MLM1168`)
    .then(function(response) {
        response.json().then(function(result) {
            console.log(result);
    });
})
    .catch(function(err) {
        console.log(err);
    });
};




musicCall();

const hobbiesCall = () => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?category=MLM1798`)
        .then(function(response) {
            response.json().then(function(result) {
                console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};


hobbiesCall();



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
               // console.log(result.results);
                paintItems(result.results)

        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

const addToCar = (id, title, price) => {
    let productsArray = [];
    let templateProduct = ` `; 
    templateProduct += `
    <tr>
        <td>
            <div class="card horizontal">
                <div class="card-image">
                    <img src="https://lorempixel.com/100/190/nature/6">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h5 class="card-title">${title}</h5>
                        <p>Código del Artículo:</p>
                        <p>Disponible:</p>
                        <p>Cantidad:</p>
                    </div>
                    <div class="card-action">
                        <a class="bnt" >Eliminar</a>
                        <a class="bnt" >Editar</a>
                    </div>
                </div>
            </div>
        </td>   
        <td class = "final-price right-align">${price}</td>
    </tr>`

    console.log(templateProduct);

    let productDetails = templateProduct;

    productsArray.push(productDetails);

    localStorage.setItem('productDetails', JSON.stringify(productsArray));
}

const increaseCounter = (id, title, price) => {
  counter += 1;
  carCounter.innerText = counter;
  console.log(counter);
  console.log(title, price);
  addToCar(id, title, price);
}

const decreaseCounter = () => {
  counter -= 1;
  carCounter.innerText = counter;
  console.log(counter);
}

const changeButtonStatus = event => {
    let element = event.target
    let buttonText = element.firstChild.data;
    let itemId = element.dataset.id;
    let itemTitle = element.dataset.title;
    let itemPrice = element.dataset.price;

    if(buttonText === "Agregar a carrito") {
        element.innerText = "Remover del carrito";
        increaseCounter(itemId, itemTitle, itemPrice);
    } else {
        element.innerText = "Agregar a carrito";
        decreaseCounter();
    }
}

const paintItems = (result) => {
    let containerProducts = document.getElementById('site-container');
    let templateProducts = ``;
   
     result.forEach((item) => {
        const id = item.id;
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
                <button data-id="${id}" data-title="${item.title}" data-price="${item.price}" onclick="changeButtonStatus(event)" class="btn waves-effect" type="" name="action">Agregar a carrito</button>
            }
            </div>
        </div>
    </div>`
    
//console.log(available);
         
     });

     containerProducts.innerHTML = templateProducts;
    
}

