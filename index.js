const initApp = async () => {
  const cards = await fetchCards();
  renderCards(cards, currentPage);
  listenForLikes();
};

let dataLength;
let currentPage = 1;
let cardIncrease = 4;
const pageCount = Math.ceil(dataLength / cardIncrease);

document.addEventListener("DOMContentLoaded", initApp);

const loadButton = document.querySelector(".button-main");

// fetch
const fetchCards = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  dataLength = data.length;
  return data;
};
// load more items
const loadItems = async () => {
  const cards = await fetchCards();
  renderCards(cards, currentPage + 1);
};
loadButton.addEventListener("click", loadItems);

const handleButtonStatus = () => {
  if (pageCount === currentPage) {
    loadButton.classList.add("disabled");
    loadButton.setAttribute("disabled", true);
  }
};

// cards
const renderCards = (cards, pageIndex) => {
  currentPage = pageIndex;
  handleButtonStatus();
  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cards.length : pageIndex * cardIncrease;

  const layout = document.getElementById("layout");
  const cardsArray = [];

  for (let i = startRange + 1; i <= endRange; i++) {
    // card elements
    const elementObject = createCardElements();
    // single card
    const cardItem = createSingleCard(elementObject, cards[i]);
    // push each card to arrat
    cardsArray.push(cardItem);
  }
  cardsArray.forEach((i) => {
    layout.appendChild(i);
  });
};

//create card
const createCardElements = () => {
  let cardContainer = document.createElement("div");
  let top = document.createElement("div");
  let userDetails = document.createElement("div");
  let profileImageBox = document.createElement("div");
  let profileImg = document.createElement("img");
  let cardName = document.createElement("h3");
  let newRow = document.createElement("br");
  let cardSpan = document.createElement("span");
  let socialImage = document.createElement("img");
  let mainImageDiv = document.createElement("div");
  let mainImage = document.createElement("img");
  let caption = document.createElement("div");
  let description = document.createElement("p");
  let rulter = document.createElement("div");
  let actionButtons = document.createElement("div");
  let heart = document.createElement("img");
  let likesNum = document.createElement("span");

  return {
    cardContainer,
    top,
    userDetails,
    profileImageBox,
    profileImg,
    cardName,
    newRow,
    cardSpan,
    socialImage,
    mainImageDiv,
    mainImage,
    caption,
    description,
    rulter,
    actionButtons,
    heart,
    likesNum,
  };
};

const createSingleCard = (elementObject, item) => {
  const {
    cardContainer,
    top,
    userDetails,
    profileImageBox,
    profileImg,
    cardName,
    cardSpan,
    newRow,
    socialImage,
    mainImageDiv,
    mainImage,
    caption,
    description,
    rulter,
    actionButtons,
    heart,
    likesNum,
  } = elementObject;

  cardContainer.className = "card";
  top.className = "card__top";
  userDetails.className = "card__userDetails";
  profileImageBox.className = "card__profile-image";
  profileImg.className = "card__image--cover";
  profileImg.src = item.profile_image;
  cardName.className = "card__name";
  cardName.innerText = item.name;
  cardSpan.className = "card__date";
  cardSpan.innerText = item.date;
  socialImage.src = `/icons/${item.source_type}.svg`;
  mainImageDiv.className = "card__image";
  mainImage.className = "card__image--cover";
  mainImage.src = item.image;
  caption.className = "card__caption";
  description.innerText = item.caption;
  rulter.className = "card__rouler";
  actionButtons.className = "card__action-button";
  heart.className = "card__action-button--image";
  heart.src = "icons/heart.svg";
  heart.classList.add("card__action-button--image", "like", "like-no");
  likesNum.className = "card__likes";
  likesNum.innerText = item.likes;

  cardContainer.appendChild(top);
  top.appendChild(userDetails);
  profileImageBox.appendChild(profileImg);
  userDetails.appendChild(profileImageBox);
  userDetails.appendChild(cardName);
  cardName.appendChild(newRow);
  cardName.appendChild(cardSpan);
  top.appendChild(socialImage);
  mainImageDiv.appendChild(mainImage);
  cardContainer.appendChild(mainImageDiv);
  cardContainer.appendChild(caption);
  caption.appendChild(description);
  cardContainer.appendChild(rulter);
  cardContainer.appendChild(actionButtons);
  actionButtons.appendChild(heart);
  actionButtons.appendChild(likesNum);
  return cardContainer;
};

// Likes

const listenForLikes = () => {
  const likes = document.querySelectorAll(".card__action-button--image");
  likes.forEach((like) => {
    like.addEventListener("click", (e) => {
      e.target.classList.toggle("like-no");
      e.target.classList.toggle("like-yes");
      let result = e.target.nextElementSibling;
      let value = parseInt(e.target.nextElementSibling.innerText);
      if (e.target.classList.contains("like-yes")) {
        value += 1;
      } else {
        value -= 1;
      }
      result.innerText = value;
    });
  });
};

// Filter 1 -- Number of Columns
const getBackgroundInput = document.getElementById("cardBackgroundColor");
const getNumberOfColumns = document.getElementById("numberOfColumns");
const itemsContainer = document.getElementById("layout");

function changeColumns() {
  let value = getNumberOfColumns.selectedOptions[0].value;
  switch (value) {
    case "1":
      itemsContainer.style.gridTemplateColumns = "repeat(1, 1fr)";
      break;
    case "2":
      itemsContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
      break;
    case "3":
      itemsContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      break;
    case "4":
      itemsContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
      break;
    case "5":
      itemsContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
      break;
    default:
      itemsContainer.style.gridTemplateColumns =
        "repeat(auto-fill, minmax(360px, 1fr))";
      break;
  }
}

getNumberOfColumns.addEventListener("change", changeColumns);

// Filter 3 - Cards Space Between
function changeSpace(e) {
  e.preventDefault();
  let value = document.getElementById("cardSpaceBetween").value;
  if (value == "") {
    itemsContainer.style.gap = "10px";
  } else {
    itemsContainer.style.gap = value;
  }
}

document
  .getElementById("cardSpaceBetween")
  .addEventListener("keyup", changeSpace);
//--------------------------------------

// Filter 4 -Theme Color

function setTheme(theme) {
  console.log(theme);
  const rootElement = document.body;
  console.log(rootElement);
  if (theme === "darkTheme") {
    rootElement.classList.add(theme);
  } else if (theme === "lightTheme") {
    rootElement.classList.remove("darkTheme");
  }
}

const radioGroup = document.getElementsByName("theme");
radioGroup.forEach((radio) => {
  radio.addEventListener("change", () => {
    setTheme(radio.value);
  });
});
