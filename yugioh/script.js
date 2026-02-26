const apiURL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function fetchCards(name = "") {
  cardsContainer.innerHTML = "";

  let url = apiURL;
  if (name) url += "?fname=" + encodeURIComponent(name);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
      cardsContainer.innerHTML = "<p>No letters found</p>";
      return;
    }

    showCards(data.data);
  } catch (err) {
    console.error("Erro ao buscar cartas:", err);
    cardsContainer.innerHTML = "<p>Error loading cards.</p>";
  }
}

function showCards(cards) {
  cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <img src="${card.card_images[0].image_url}" alt="${card.name}" />
      <h3>${card.name}</h3>
    `;

    cardsContainer.appendChild(cardEl);
  });
}

searchBtn.addEventListener("click", () => {
  const name = searchInput.value.trim();
  fetchCards(name);
});

fetchCards();