"use strict";
const cardBox = document.querySelector(".card-box");
const searchBar = document.querySelector(".search-bar");

const renderCards = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=50"
    );

    data.forEach((photo) => {
      const { albumId, id, title, thumbnailUrl } = photo;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<figure>
        <img src=${thumbnailUrl} alt="Photo ${albumId}/${id}" /> 
        <figcaption>${title}</figcaption></figure>`;
      cardBox.append(card);
    });
  } catch (error) {
    console.log("error", error);
  }
};
renderCards();
