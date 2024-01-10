const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-managament"
);

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrf = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrf,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("somethin went wrong with cart update.");
    return;
  }

  if (!response.ok) {
    alert("somethin went wrong with cart update.");
    return;
  }

  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
