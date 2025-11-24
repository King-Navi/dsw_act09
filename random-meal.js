function truncate(text, maxLength = 220) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

async function loadRandomMeal() {
  const section = document.getElementById('random-meal-section');

  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();

    if (!data.meals || !data.meals[0]) {
      section.innerHTML = '<p>No se pudo obtener una comida random.</p>';
      return;
    }

    const meal = data.meals[0];

    section.innerHTML = `
      <div class="random-meal-wrapper">
        <div class="articles">
          <article>
            <figure>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </figure>
            <div class="article-preview">
              <h2>${meal.strMeal}</h2>
              <p>
                ${truncate(meal.strInstructions, 260)}
              </p>
              <p>
                <strong>Categoría:</strong> ${meal.strCategory || 'N/A'}<br>
                <strong>Área:</strong> ${meal.strArea || 'N/A'}
              </p>
              <a href="${meal.strSource || '#'}" class="read-more" title="Ver receta completa" target="_blank">
                Ver receta completa
              </a>
            </div>
          </article>
        </div>

        <button id="new-random-meal" class="btn-random-meal" type="button">
          Buscar otra comida 🍕
        </button>
      </div>
    `;

    const reloadButton = document.getElementById('new-random-meal');
    reloadButton.addEventListener('click', loadRandomMeal);

  } catch (error) {
    console.error(error);
    section.innerHTML = '<p>Ocurrió un error al cargar la comida random.</p>';
  }
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
document.addEventListener('DOMContentLoaded', loadRandomMeal);