const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

// Corregimos los selectores: añadimos el prefijo correcto para las clases e IDs
const $n = document.querySelector('.name'); // Cambiado de 'name' a '.name' para seleccionar correctamente el elemento por clase
const $b = document.querySelector('.blog'); // Cambiado de '#blog' a '.blog' para seleccionar correctamente el elemento por clase
const $l = document.querySelector('.location');

// La función debe ser declarada como async para usar `await`
async function displayUser(username) {
  //Agrego manejo de errores con try-catch y validación con response.ok
  try {
    // Indicamos que los datos están cargando
    $n.textContent = 'Cargando...';

    // Realizamos la petición a la API con fetch
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`); // Lanzamos un error con información detallada
    }
    // Parseamos la respuesta como JSON
    const data = await response.json();

    // Actualizamos el contenido de los elementos con datos o valores por defecto
    $n.textContent = data.name || 'Nombre no disponible'; // Muestra un mensaje predeterminado si `name` no existe
    $b.textContent = data.blog || 'Blog no disponible'; // Muestra un mensaje predeterminado si `blog` no existe
    $l.textContent = data.location || 'Ubicación no disponible'; // Muestra un mensaje predeterminado si `location` no existe
  } catch (err) {
    // Manejo de errores centralizado
    handleError(err); // Llama a la función de manejo de errores para mostrar mensajes claros
  }
}

// Función para manejar errores
function handleError(err) {
  console.error('OH NO! Ocurrió un error: ', err); // Se cambió a `console.error` para registrar errores más claramente
  $n.textContent = `Algo salió mal: ${err.message}`; // Muestra el mensaje del error en el elemento seleccionado
}

// Llamamos a la función displayUser con un nombre de usuario específico
displayUser('stolinski'); // Aquí puedes cambiar el nombre de usuario a cualquier usuario válido de GitHub