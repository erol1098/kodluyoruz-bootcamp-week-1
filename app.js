"use strict";
const cardBox = document.querySelector(".card-box");
const searchBar = document.querySelector(".search-bar");
const addForm = document.querySelector(".add-form");

//? Get Data From API
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

//? Render Cards Method
const renderCards = (list = []) => {
  cardBox.innerHTML = "";
  list.forEach((photo) => {
    const { albumId, id, title, thumbnailUrl } = photo;
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `${albumId}/${id}`);
    card.innerHTML = `<figure>
      <img src=${thumbnailUrl} alt="Photo ${albumId}/${id} height="150px"/>
      <figcaption>${title}</figcaption></figure>`;
    cardBox.append(card);
  });
};

//? First Render
window.addEventListener("load", () => {
  getData().then((res) => (photoList = res));
  renderCards(photoList);
});

//? Filter by search
searchBar.addEventListener("input", (e) => {
  const filteredList = photoList.filter((photo) =>
    photo.title.includes(e.target.value)
  );
  renderCards(filteredList);
});

//? Delete Card
cardBox.addEventListener("click", (e) => {
  const deletedCard = e.target.closest(".card");
  cardBox.removeChild(document.getElementById(deletedCard.id));
});

//? Add Data
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  console.log(formData.get("url"));
  photoList.unshift({
    albumId: Math.trunc(Math.random() * 100) + 1,
    id: Math.trunc(Math.random() * 100) + 1,
    title: formData.get("title"),
    thumbnailUrl: formData.get("url"),
  });
  addForm.reset();
  renderCards(photoList);
});
