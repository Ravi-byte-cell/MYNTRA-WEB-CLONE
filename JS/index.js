let bagItems = [];
onLoad();
function onLoad() {
  let bagItemstr = localStorage.getItem("bagItems");
  bagItems = bagItemstr ? JSON.parse(bagItemstr) : [];
  DisplayItemOnHomepage();
  displayBagIcon();
}

//push item to bag after clicked on add to bag

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

// it display the number of added item in bag
function displayBagIcon() {
  // console.log(bagItems);
  let bag_Item_Count = document.querySelector(".bagitemCount");
  if (bagItems.length > 0) {
    bag_Item_Count.style.visibility = "visible";
    bag_Item_Count.innerText = bagItems.length;
  } else {
    bag_Item_Count.style.visibility = "hidden";
  }
}
// this contain generic html code for home page

function DisplayItemOnHomepage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  
  let innerHTML = "";
  item.forEach((item) => {
    innerHTML += `
    
  <div class="item-container">
    <img class="item-image" src="${item.image}" alt="" />
    <div class="rating">
      <span>${item.rating.stars}⭐ | </span>
      <span>${item.rating.count}</span>
    </div>
    <div class="item-company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>

    <div class="item-price">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="previous-price">
        <s>Rs${item.original_price}</s>
      </span>
      <span class="item-off">${item.discount_percentage}</span>
    </div>

    <button onclick="addToBag(${item.id})" class="bag-button">Add To Bag</button>
  </div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
