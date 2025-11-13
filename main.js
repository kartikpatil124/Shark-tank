// ================== DOM ELEMENTS ==================
let mainSection = document.getElementById("data-list-wrapper");

// Add pitch inputs
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch inputs
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

// Update price only
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

// Sort & Filter buttons
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

// Search inputs
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// ================== VARIABLES ==================
let BASE_URL = "http://localhost:3000/pitches";
let productData = [];

// ================== FETCH DATA ==================
function fetchData() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      cardList(data);
    })
    .catch((err) => console.log("Error fetching data:", err));
}
fetchData();

// ================== CARD CREATION ==================
function cardList(data) {
  let dataList = data.map((el) => createCard(el));
  mainSection.innerHTML = dataList.join("");
}

function createCard(el) {
  return `
    <div class="card" style="border:1px solid #ccc; padding:10px; margin:10px; border-radius:10px;">
      <h3>ID: ${el.id}</h3>
      <img src="${el.image}" alt="${el.title}" height="80px" width="80px" style="object-fit:cover;">
      <h4>Title: ${el.title}</h4>
      <p>Founder: ${el.founder}</p>
      <p>Category: ${el.category}</p>
      <p>Price: ₹${el.price}</p>
      <a href="#" class="card-link" data-id="${el.id}">Edit</a>
      &nbsp;&nbsp;
      <button class="card-button" data-id="${el.id}">Delete</button>
    </div>
  `;
}

// ================== ADD NEW PITCH ==================
pitchCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !pitchTitleInput.value ||
    !pitchImageInput.value ||
    !pitchCategoryInput.value ||
    !pitchfounderInput.value ||
    !pitchPriceInput.value
  ) {
    alert("⚠️ Please fill all fields before adding!");
    return;
  }

  let newPitch = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: +pitchPriceInput.value,
  };

  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPitch),
  })
    .then((res) => res.json())
    .then(() => {
      alert("✅ Pitch added successfully!");
      fetchData();
      pitchTitleInput.value = "";
      pitchImageInput.value = "";
      pitchCategoryInput.value = "";
      pitchfounderInput.value = "";
      pitchPriceInput.value = "";
    })
    .catch((err) => console.log(err));
});

// ================== DELETE PITCH ==================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    let id = e.target.dataset.id;
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        alert("🗑️ Pitch deleted successfully!");
        fetchData();
      })
      .catch((err) => console.log(err));
  }
});

// ================== EDIT PITCH (FILL FORM) ==================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-link")) {
    let id = e.target.dataset.id;
    fetch(`${BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        updatePitchIdInput.value = data.id;
        updatePitchTitleInput.value = data.title;
        updatePitchImageInput.value = data.image;
        updatePitchCategoryInput.value = data.category;
        updatePitchfounderInput.value = data.founder;
        updatePitchPriceInput.value = data.price;
      })
      .catch((err) => console.log(err));
  }
});

// ================== UPDATE ALL FIELDS ==================
updatePitchBtn.addEventListener("click", () => {
  if (!updatePitchIdInput.value) {
    alert("⚠️ Please select a pitch to update!");
    return;
  }

  let updatedPitch = {
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    category: updatePitchCategoryInput.value,
    founder: updatePitchfounderInput.value,
    price: +updatePitchPriceInput.value,
  };

  fetch(`${BASE_URL}/${updatePitchIdInput.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPitch),
  })
    .then((res) => res.json())
    .then(() => {
      alert("✅ Pitch updated successfully!");
      fetchData();
    })
    .catch((err) => console.log(err));
});

// ================== UPDATE ONLY PRICE ==================
updatePricePitchPriceButton.addEventListener("click", () => {
  let id = updatePricePitchId.value;
  let newPrice = +updatePricePitchPrice.value;

  if (!id || !newPrice) {
    alert("⚠️ Please enter both ID and Price!");
    return;
  }

  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price: newPrice }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("💰 Price updated successfully!");
      fetchData();
    })
    .catch((err) => console.log(err));
});

// ================== SORTING ==================
sortAtoZBtn.addEventListener("click", () => {
  let sorted = [...productData].sort((a, b) => a.price - b.price);
  cardList(sorted);
});

sortZtoABtn.addEventListener("click", () => {
  let sorted = [...productData].sort((a, b) => b.price - a.price);
  cardList(sorted);
});

// ================== FILTER ==================
filterFood.addEventListener("click", () => {
  let filtered = productData.filter((el) => el.category === "Food");
  cardList(filtered);
});

filterElectronics.addEventListener("click", () => {
  let filtered = productData.filter((el) => el.category === "Electronics");
  cardList(filtered);
});

filterPersonalCare.addEventListener("click", () => {
  let filtered = productData.filter((el) => el.category === "Personal-Care");
  cardList(filtered);
});

// ================== SEARCH ==================
searchByButton.addEventListener("click", () => {
  let type = searchBySelect.value;
  let text = searchByInput.value.toLowerCase();

  if (!type || !text) {
    alert("⚠️ Please select search type and enter text!");
    return;
  }

  let filtered = productData.filter((el) =>
    el[type].toLowerCase().includes(text)
  );

  cardList(filtered);
});
