$(document).ready(function(){
    $('.carousel').carousel();
  });

  

  const apiLoadFirst = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=peliculas`, )
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

apiLoadFirst()

const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementsByClassName('response-container');
const carCounter = document.getElementById('items-counter');
let counter = 0;

// function button fixed shop

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

// end function button fixed shop

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
//console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

apiMercadolibre();

form.addEventListener('keyup', function(e){
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


let productsArray = [];
const addToCar = (id, title, price) => {
    let product = {
        productId: id,
        productName: title,
        productPrice: price
    }

    let productDetails = product;
    console.log(productDetails);
    productsArray.push(productDetails);
    console.log(productsArray);
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
        templateProducts += `<div class="col-md-3 product-left"> 
        <div class="p-one simpleCart_shelfItem">							
                <a href="single.html">
                    <img src="${image}" alt="" />
                    <div class="mask">
                        <span>Quick View</span>
                    </div>
                </a>
            <h4 class="short-text">${item.title}</h4>
            <p><a href="#"><i></i> <span class="item_price">${item.price} MXN</span></a></p>
            <button class="item_add single-but" data-id="${id}" data-title="${item.title}" data-price="${item.price}" onclick="changeButtonStatus(event)" type="" name="action">Agregar a carrito</button>
        </div>
    </div>
        `
    //     `<div class="col s12 m3">
    //     <div class="card">
    //         <div class="card-image">
    //             <img src="${image}">
    //         </div>
    //         <div class="card-content">
    //             <p class="card-title short-text">${item.title}</p>
    //             <p class="">${item.price} MXN</p>
    //         </div>
    //         <div class="card-action">
    //             <button data-id="${id}" data-title="${item.title}" data-price="${item.price}" onclick="changeButtonStatus(event)" class="btn waves-effect" type="" name="action">Agregar a carrito</button>
    //         </div>
    //     </div>
    // </div>`
    
//console.log(available);
         
     });

     containerProducts.innerHTML = templateProducts;
    
}


const categoriesCall = (category) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?category=${category}`)
        .then(function(response) {
            response.json().then(function(result) {
                paintItems(result.results)
                // console.log("hola");
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

   const codeBooks="MLM1196"
   const books=document.getElementById("books").addEventListener("click", function(e){
       
      categoriesCall(codeBooks);
    })

    const codeComics="MLM3043"
    const comics=document.getElementById("comics").addEventListener("click", function(e){
        
       categoriesCall(codeComics);
     })
     
     const codeMag="MLM8227"
     const magazines=document.getElementById("mag").addEventListener("click", function(e){
         
        categoriesCall(codeMag);
      })




//https://api.mercadolibre.com/sites/MLM/search?category=MLM7841   peliculas
//https://api.mercadolibre.com/sites/MLM/search?category=MLM6217 series
// https://api.mercadolibre.com/sites/MLM/search?category=MLM7809 musica