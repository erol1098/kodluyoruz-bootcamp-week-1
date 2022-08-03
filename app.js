"use strict";
const cardBox = document.querySelector(".card-box");
const searchBar = document.querySelector(".search-bar");
const addForm = document.querySelector(".add-form");
const editForm = document.querySelector(".edit-form");
const editFormWrapper = document.querySelector(".edit-form-wrapper");
let photoList;
let editedCard;
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

//? Render Cards Method
const renderCards = (list = []) => {
  cardBox.innerHTML = "";

  if (list.length === 0) {
    cardBox.innerHTML = "<h2>No Item Found</h2>";
    return;
  }
  list.forEach((photo) => {
    const { albumId, id, title, thumbnailUrl } = photo;
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `${id}`);
    card.innerHTML = `<figure><div class="img-wrapper">
      <img src=${thumbnailUrl} alt="Photo ${albumId}/${id}"></div>
      <figcaption>${title}</figcaption></figure><div class="icons"><i class="fa-solid fa-trash-can fa-xl" size={40}></i><i class="fa-solid fa-pen-to-square fa-xl"></i></div>`;
    cardBox.append(card);
  });
};

//? First Render
(async () => {
  try {
    const res = await getData();
    photoList = res;
    renderCards(photoList);
  } catch (error) {
    console.log(error);
  }
})();

//? Filter by search
searchBar.addEventListener("input", (e) => {
  const filteredList = photoList.filter((photo) =>
    photo.title.includes(e.target.value)
  );
  renderCards(filteredList);
});

//? Delete Card - Edit Card
cardBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    const deletedCard = e.target.closest(".card");
    photoList = photoList.filter((card) => card.id !== +deletedCard.id);
    renderCards(photoList);
  }
  if (e.target.classList.contains("fa-pen-to-square")) {
    editedCard = e.target.closest(".card");
    editFormWrapper.classList.remove("invisible");
    const titleInput = document.querySelector(".edit-title");
    const urlInput = document.querySelector(".edit-url");
    urlInput.value = e.target.closest(".card").querySelector("img").src;
    titleInput.value = e.target
      .closest(".card")
      .querySelector("figcaption").textContent;
  }
});

editFormWrapper.addEventListener("click", (e) => {
  if (!e.target.closest(".edit-form")) {
    editFormWrapper.classList.add("invisible");
  }
});

//? Editing Photolist
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editFormData = new FormData(editForm);
  photoList.forEach((card) => {
    if (+card.id === +editedCard.id) {
      card.title = editFormData.get("title");
      card.thumbnailUrl = editFormData.get("url");
    }
  });
  editFormWrapper.classList.add("invisible");
  editForm.reset();
  renderCards(photoList);
});

//? Add Data
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);

  photoList.unshift({
    albumId: 2,
    id: new Date().getTime(),
    title: formData.get("title"),
    thumbnailUrl: formData.get("url"),
  });
  addForm.reset();
  renderCards(photoList);
  window.scroll(0, 0);
});
