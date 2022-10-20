const loadCocktail = (search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDrinks(data.drinks));
};

const displayDrinks = (drinks) => {
  // console.log(drinks);
  const cocktailContainer = document.getElementById("cocktail-container");
  cocktailContainer.innerHTML = "";
  drinks.forEach((drink) => {
    // console.log(drink);
    const drinkDiv = document.createElement("div");
    drinkDiv.classList.add("col");
    drinkDiv.innerHTML = `
    <div class="card">
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
    <h2>${drink.idDrink}</h2>
    <h3>${drink.strCategory}</h3>
    <p>${drink.strTags}</p>
    <h4>${drink.strGlass}</h4>
      <h5 class="card-title">${drink.strDrink}</h5>
      <p class="card-text">
        ${drink.strInstructions.slice(0, 100)}
      </p>
      <button onclick="loadCocktailDetails('${
        drink.idDrink
      }')" class="btn btn-primary">Cocktail Details</button>
    </div>
  </div>
    `;
    cocktailContainer.appendChild(drinkDiv);
  });
};

const searchCocktail = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadCocktail(searchText);
  searchField.value = "";
};

const loadCocktailDetails = (idDrink) => {
  // console.log(idDrink);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCocktailDetails(data.drinks[0]));
};

const displayCocktailDetails = (drink) => {
  console.log(drink);
  const cocktailDetails = document.getElementById("cocktail-details");
  cocktailDetails.innerHTML = "";
  const drinkDiv = document.createElement("div");
  drinkDiv.classList.add("card");
  drinkDiv.innerHTML = `
  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
  <h2>${drink.idDrink}</h2>
  <h3>${drink.strCategory}</h3>
  <p>${drink.strTags}</p>
  <h4>${drink.strGlass}</h4>
    <h5 class="card-title">${drink.strDrink}</h5>
    <p class="card-text">
      ${drink.strInstructions.slice(0, 100)}
    </p>
  </div>
  `;
  cocktailDetails.appendChild(drinkDiv);
};

loadCocktail("a");
