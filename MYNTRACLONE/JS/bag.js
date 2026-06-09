const Convenience_fee = 99;
let bagItemObjects;

LoadPage();
function LoadPage() {
  loadBagItemObjects();

  displayBagItem();
  DisplayBagItemDetail();
}

function loadBagItemObjects() {
  // console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < item.length; i++) {
      if (itemId == item[i].id) {
        return item[i];
      }
    }
  });
  console.log(bagItemObjects);
}

//display bag container items................................
function displayBagItem() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((item) => {
    innerHTML += generateBagItemHTML(item);
  });

  containerElement.innerHTML = innerHTML;
}

//Remove from bag............................................
function RemoveFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItem();
  DisplayBagItemDetail();
}
// generate html of bag dynamically
function generateBagItemHTML(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
           </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">
                ${item.item_name}
              </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
              <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
            
            <div class="remove-from-cart" onclick='RemoveFromBag(${item.id})'> X</div>
          </div>`;
}

//display bag container items details...................
function DisplayBagItemDetail() {
  let containerElementDetail = document.querySelector(".bag-details-container");

  let TotalItem = bagItemObjects.length;
  let TotalMrp = 0;
  let TotalDiscount = 0;
  let FinalPayment = 0;

  bagItemObjects.forEach((bagItem) => {
    TotalMrp += bagItem.original_price;
    TotalDiscount += bagItem.original_price - bagItem.current_price;
    FinalPayment = TotalMrp - TotalDiscount + Convenience_fee;
  });

  containerElementDetail.innerHTML = `<div class="price-header">PRICE DETAILS (${TotalItem}Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value"> रु ${TotalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >रु ${TotalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">रु 99</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> रु ${FinalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>`;
}
