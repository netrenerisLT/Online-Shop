const addToCartButton = document.querySelector("#product-details button");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart(params) {
  const productId = addToCartButton.dataset.productid;
  const csrfToken = addToCartButton.dataset.csrf;
  let respons;
  try {
    respons = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something wrong..");
    return;
  }

  if (!respons.ok) {
    alert("something wrong!");
    return;
  }

  const responsData = await respons.json();
  const newTotalQuantity = responsData.newTotalItems;

  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButton.addEventListener("click", addToCart);
