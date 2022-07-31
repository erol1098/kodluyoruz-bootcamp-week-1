"use strict";
const cardBox = document.querySelector(".card-box");
const searchBar = document.querySelector(".search-bar");

const getData = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=50"
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

let photoList;
getData().then((res) => (photoList = res));

const renderCards = (list) => {
  cardBox.innerHTML = "";
  list.forEach((photo) => {
    const { albumId, id, title, thumbnailUrl } = photo;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<figure>
      <img src=${thumbnailUrl} alt="Photo ${albumId}/${id}" />
      <figcaption>${title}</figcaption></figure>`;
    cardBox.append(card);
  });
};

window.addEventListener("load", () => renderCards(photoList));

searchBar.addEventListener("input", (e) => {
  const filteredList = photoList.filter((photo) =>
    photo.title.includes(e.target.value)
  );
  renderCards(filteredList);
});
