const GRID_RESULT_CLASS = 'articles';

function searchMealIngridient() {
  const input = document.getElementById('buscador');
  const ingredient = input.value.trim();
  const contenedor = document.querySelector('.' + GRID_RESULT_CLASS);

  if (!ingredient) {
    contenedor.innerHTML = '<p>Escribe un ingrediente para buscar.</p>';
    return;
  }

  contenedor.innerHTML = '<p>Buscando...</p>';

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        contenedor.innerHTML = '<p>No se encontraron comidas con ese ingrediente.</p>';
        return;
      }

      renderMealsByIngredient(data.meals);
    })
    .catch(err => {
      console.error(err);
      contenedor.innerHTML = '<p>Ocurrió un error al buscar. Intenta de nuevo.</p>';
    });
}

function renderMealsByIngredient(meals) {
  const contenedor = document.querySelector('.' + GRID_RESULT_CLASS);

  contenedor.innerHTML = meals.map(meal => `
    <article>
      <figure>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      </figure>
      <div class="article-preview">
        <h2>${meal.strMeal}</h2>
        <p>
          Esta receta incluye este ingrediente.
        </p>
      </div>
    </article>
  `).join('');
}

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

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('buscador');

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchMealIngridient();
      }
    });
  }
});
