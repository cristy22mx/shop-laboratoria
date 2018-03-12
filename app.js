const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementById('response-container');

const booksCall = () => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?category=MLM3025`)
        .then(function(response) {
            response.json().then(function(result) {
                console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};


booksCall();


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
    fetch(`https://api.mercadolibre.com/users/306970587/`)
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
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`, )
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

const paintItems = (result) => {
    
    
    let containerProducts = document.getElementById('site-container');
    let templateProducts = ``;
   
     result.forEach((item) => {
        
        const addres=item.address.state_name;
         const image=item.thumbnail;
        templateProducts += `<div class="col s6 m3" data-url="">
        <div class="card waves">
            <div class= "card-content center-align circle">
                <h1 > ${item.title}</h1>
                <img class="responsive-img center" src="${image}">
                <p>Price: ${item.price} MXN</p>
                <p>Place: ${addres}</p>
                <p>Available cuantity: ${item.available_quantity}</p>
                <p>Seller status: ${item.seller.power_seller_status}</p>
               
            </div>
        </div>`; 
    
//console.log(available);
         
     });

     containerProducts.innerHTML = templateProducts;
    
}

