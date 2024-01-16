import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-335e4-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shopingListInDB = ref(database, "shopingList");

const UlEl = document.getElementById("shopping-list");

//Reference to the button
const addBtnEl = document.getElementById("add-button");

const inputEl = document.getElementById("input-field");
const containerEl = document.getElementById("container");

const resetField = function () {
  inputEl.value = "";
};

onValue(shopingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    //clear the field
    clearShoppingListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      //variables declaration
      let currentItemID;
      let currentItemValue;

      currentItemID = currentItem[0];
      currentItemValue = currentItem[1];

      formatEl(currentItem);
    }
  } else {
    UlEl.innerHTML = "No items here ... yet";
  }
});

function clearShoppingListEl() {
  UlEl.innerHTML = "";
}

//fuction
addBtnEl.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(shopingListInDB, inputValue);
  resetField();
  //formatEl(inputValue);
});

function formatEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  //UlEl.innerHTML += `<li>${itemValue}</li>`;
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  UlEl.append(newEl);
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shopingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}
