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
  const search = document.getElementById('buscador').value.trim();
  const contenedor = document.querySelector('.articles');

  if (!search) {
    contenedor.innerHTML = '<p>Escribe algo para buscar.</p>';
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`)
    .then(respuesta => respuesta.json())
    .then(data => {
      if (!data.meals) {
        contenedor.innerHTML = '<p>No se encontró nada.</p>';
        return;
      }

      renderMeals(data.meals);
    })
    .catch(error => {
      console.error('Error:', error);
      contenedor.innerHTML = '<p>Ocurrió un error al buscar.</p>';
    });
}

function renderMeals(meals) {
  const contenedor = document.querySelector('.articles');

  contenedor.innerHTML = meals.map(meal => `
    <article>
      <figure>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      </figure>
      <div class="article-preview">
        <h2>${meal.strMeal}</h2>
        <p>
          ${truncate(meal.strInstructions, 200)}
          <a href="${meal.strSource || '#'}" class="read-more" title="Leer más">
            Leer más
          </a>
        </p>
      </div>
    </article>
  `).join('');
}

function truncate(text, maxLength = 200) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}