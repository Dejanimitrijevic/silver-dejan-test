document.querySelectorAll('cart-remove-button').forEach((item)=> {
    item.addEventListener('click', (event)=> {
        event.preventDefault();
        const itemId = item.getAttribute('data-id');
        console.log("itemId==>", itemId);
        const cartProductRemove = {
            'id': itemId,
            'quantity': 0
        }
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'dataType': 'json'
            },
            body: JSON.stringify(cartProductRemove)
        })
        .then(res => res.text())
        .then(text => {
            const response = JSON.parse(text);
            console.log("text==>", JSON.parse(text));

            item.closest('.cart-item').remove();
            if (response.items.length === 0) {
                document.querySelector('cart-items').classList.add('is-empty');
                document.querySelector('#main-cart-footer').classList.add('is-empty');
            } else {
                document.querySelector('cart-items').classList.remove('is-empty');
                document.querySelector('#main-cart-footer').classList.remove('is-empty');
                document.querySelector(".cart-count-bubble > span:first-child").innerHTML = response.items.length;
                document.querySelector(".cart-count-bubble > span:last-child").innerHTML = response.items.length;
            }
        })
        .catch(err => console.log('error==>', err));
    })
})