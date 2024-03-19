document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.querySelector(".cart-items");
    let cartTotal = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const productName = product.querySelector("h2").innerText;
            const productPrice = parseFloat(product.querySelector("p:nth-child(3)").innerText.replace("$", ""));
            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>${name} - $${price.toFixed(2)}</span>
            <button class="plus">+</button>
            <button class="minus">-</button>
            <button class="remove">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
        cartTotal += price;
        updateTotal();
        setupButtonListeners(cartItem, price);
    }

    function setupButtonListeners(item, price) {
        const plusButton = item.querySelector(".plus");
        const minusButton = item.querySelector(".minus");
        const removeButton = item.querySelector(".remove");

        plusButton.addEventListener("click", () => {
            cartTotal += price;
            updateTotal();
        });

        minusButton.addEventListener("click", () => {
            if (cartTotal >= price) {
                cartTotal -= price;
                updateTotal();
            }
        });

        removeButton.addEventListener("click", () => {
            cartTotal -= price;
            updateTotal();
            item.remove();
        });
    }

    function updateTotal() {
        document.querySelector(".cart-total").innerText = `$${cartTotal.toFixed(2)}`;
    }
});
