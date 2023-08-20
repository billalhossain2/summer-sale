//select element
function getElementById(id){
  return document.getElementById(id)
}

//set innerText
function setInnerTextElement(id, value){
  document.getElementById(id).innerText = value;
}

// calculate discount and show in the UI 
function calculateDiscount() {
    //validate coupon input field
    const couponCode = getElementById("coupon-input-field").value;
    if(!couponCode){
      return alert("Please provide the coupon code")
    }else if(couponCode !== "SELL200"){
      return alert("Please provide a valid coupon code")
    }

    //calculate discount amount
  const totalPrice = parseFloat(getElementById("total-price").innerText);
  const discount = (totalPrice * 20) / 100; //20% discount
  setInnerTextElement("discount-span", discount.toFixed(2));

  //calculate toal after discount
  const total = totalPrice - discount;
  setInnerTextElement("total-span", total.toFixed(2));
}

//Reset all displayed data
function resetAll(){
getElementById("coupon-input-field").value = "";

setInnerTextElement("total-price", "00");
setInnerTextElement("discount-span", "00");
setInnerTextElement("total-span", "00");
setInnerTextElement("products-titles-container", "")

getElementById("apply-btn").setAttribute("disabled", "true")
getElementById("make-purchase-btn").setAttribute("disabled", "true")
}

//Event handler for product item
function addtoCart(targetProductElement) {
  const title = targetProductElement.children[1].children[1].innerText;
  const price = parseFloat(
    targetProductElement.children[1].children[2].innerText.split(" ")[0]
  );

  const currentTotalPrice = parseFloat(getElementById("total-price").innerText);

  //calculate toal price
  const totalPrice = currentTotalPrice + price;
  setInnerTextElement("total-price", totalPrice.toFixed(2));

  //enable purchage button
  if (totalPrice > 0) {
    getElementById('make-purchase-btn').removeAttribute("disabled");
  }else{
    getElementById('make-purchase-btn').setAttribute("disabled", "true");
  }

  //enable apply button
  if(totalPrice >= 200){
    getElementById("apply-btn").removeAttribute('disabled')
  }else{
    getElementById("apply-btn").setAttribute('disabled', 'true')
  }

  //create dynamic element for product title
  const p = document.createElement("p");
  p.classList.add("font-medium", "text-2xl");
  const serialNum = getElementById("products-titles-container").childElementCount + 1;
  p.innerHTML = `${serialNum}. ${title}`;
  getElementById("products-titles-container").appendChild(p);

}
