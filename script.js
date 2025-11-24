const GRID_RESULT_CLASS = "grid_results";

const input = document.getElementById('buscador');

input.addEventListener('input', async function () {

});

input.addEventListener('keydown', async function (event) {
  if (event.key === 'Enter') {
    await searchMealName();
  }
});


const toggleMenu = () => {
  const navigation = document.querySelector(".navigation");

  const burgerMenu = document.querySelector(".menu-icon");
  const src = burgerMenu.getAttribute("src");

  const isBurger = src === "assets/burger-menu.svg";
  const iconName = isBurger ? "assets/close.svg" : "assets/burger-menu.svg";

  burgerMenu.setAttribute("src", iconName);

  if (!isBurger) {
    navigation.classList.add("navigation--mobile--fadeout");
    setTimeout(() => {
      navigation.classList.toggle("navigation--mobile");
    }, 300);
  } else {
    navigation.classList.remove("navigation--mobile--fadeout");
    navigation.classList.toggle("navigation--mobile");
  }
};

async function searchMealName() {
  const search = document.getElementById('buscador').value;
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php` + "?s=" + search)
    .then(respuesta => respuesta.json())
    .then(data => {
      const contenedor = document.querySelector(`.${GRID_RESULT_CLASS}`);

      if (!data.meals) {
        contenedor.innerHTML = '<p>No se encontró nada.</p>';
        return;
      }

      renderMeals(data.meals);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function renderMeals(meals) {
  const contenedor = document.querySelector(`.${GRID_RESULT_CLASS}`);
  contenedor.innerHTML = meals.map(meal => `
    <article class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <p><strong>Categoría:</strong> ${meal.strCategory}</p>
      <p><strong>Área:</strong> ${meal.strArea}</p>
    </article>
  `).join('');
}