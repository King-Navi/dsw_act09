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
    `;
  } catch (error) {
    console.error(error);
    section.innerHTML = '<p>Ocurrió un error al cargar la comida random.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadRandomMeal);