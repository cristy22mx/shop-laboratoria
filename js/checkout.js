let product = localStorage.getItem('productDetails');
productDetails= JSON.parse(product);

let itemContainer = document.getElementById('items');
let resume = document.getElementById('shopping-resume');


const removeCard = (event, id) => {
    console.log(event.target.parentNode.parentNode.parentNode.id);
    let cardToRemove = event.target.offsetParent.offsetParent.offsetParent;
    // console.log(id);
    cardToRemove.innerHTML = " ";
}

let totalPrice = 0;
let shippingCost = 3.76;
const showResume = total => {
    totalPrice = total;
    let resumeCard = ` `;
    resumeCard = `<thead>
                    <tr>
                        <th>
                            <h3>Resumen</h3>
                        </th>
                    </tr>
                </thead>
            
                <tbody>
                    <tr>
                        <td>SUBTOTAL:</td>
                        <td>$${totalPrice}</td>
                    </tr>
                    <tr>
                        <td>Costo de envío:</td>
                        <td>$${shippingCost}</td>
                    </tr>
                    <tr>
                        <td>TOTAL:</td>                        
                        <td>$${totalPrice + shippingCost}</td>
                    </tr>
                    <tr>
                        <td><div id="paypal-button"></div></td>                        
                        
                    </tr>
                </tbody>`
    resume.innerHTML = resumeCard;
}

const calculateTotal = productDetails => {
  let tableTemplate = ` `;
  let totalGap = ` `;

  productDetails.forEach(product => {
    totalPrice += parseInt(product.productPrice);
    
    tableTemplate += `<tr>
                        <td>
                            <div id="${product.productId}" class="card horizontal">
                                <div class="card-image">
                                    <img src="https://lorempixel.com/100/100/nature/6">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <h5 class="card-title">${product.productName}</h5>
                                        <p>Código del Artículo:</p>
                                        <p>Disponible:</p>
                                        <p>Precio: $ ${product.productPrice}</p>
                                    </div>
                                        <div class="card-action">
                                            <button class="bnt">Eliminar</button>
                                        </div>
                                </div>
                            </div>
                        </td>
                    </tr>`
    itemContainer.innerHTML = tableTemplate;
    })
    let boton = document.getElementsByClassName('bnt');
    let btnCollection = Array.from(boton);
    btnCollection.forEach(item => {
        item.addEventListener('click', removeCard);
    })

  showResume(totalPrice);
}



calculateTotal(productDetails);

// PAYPAL BUTTON
paypal.Button.render({
    
    env: 'sandbox',
    
    client: {
                sandbox:    'ARFR55shlOKXCT1VE6IHXqv3AZR587gFxu3TmQt17IsBrc02eHLQA8tpC1thuOTyING5EDOdMn5Bvlya',
                production: 'xxxxxxxxx'
            },
    
    commit: true, // Show a 'Pay Now' button
    
    payment: function(data, actions) {
        return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: totalPrice + shippingCost, currency: 'MXN' }
                        }
                    ]
                }
            });
    },
    
    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {
    
            alert ("The payment is complete!")
                    // You can now show a confirmation message to the customer
            });
        }
    
    }, '#paypal-button');