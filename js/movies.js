let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnInicio = document.getElementById("btnInicio");
const form = document.getElementById("form");
const search = document.getElementById("search");
const buscarUrl = "https://api.themoviedb.org/3/search/movie?api_key=ab615ab136c6a4dd4fdcea3d3afd2ef0&language=es-MX&query=";

btnInicio.addEventListener("click", () => {
  window.location.href = "../index.html";});

const main = document.getElementById("main");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=ab615ab136c6a4dd4fdcea3d3afd2ef0&language=es-MX&page=${pagina}&append_to_response=overview`
    );

    //console.log(respuesta);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
				<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
				<button class="btnVerMas">Ver más</button>		
				</div>`;
      });
      

      let contenedor = document.getElementById("contenedor");
      contenedor.innerHTML = peliculas;

      const btnVerMas = document.getElementsByClassName("btnVerMas");
      for (let i = 0; i < btnVerMas.length; i++) {
        btnVerMas[i].addEventListener("click", () => {
          Swal.fire({
            html: `<span class="imdb">IMDB: </span><span class="datosImdb">${datos.results[i].vote_average}</span> 
						<br>						
						<h1 class="tituloSwalMovie"> ${datos.results[i].title}</h1>
						<br>
						<p class="sinopsisMovie"> ${datos.results[i].overview}</p>
						`,
            imageUrl: `https://image.tmdb.org/t/p/w500/${datos.results[i].poster_path}`,
            imageWidth: 250,
            imageHeight: 400,
            background: "black",
            color: "#fff",
            imageAlt: datos.results[i].title,
            animation: false,
            showConfirmButton: true,
            confirmButtonText: "Cerrar",
          });
        });
        
      }
      
    }
    
  } catch (error) {
    console.log("error");
  }  
};
//No carga la peliculas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const busqueda = search.value;
  if (busqueda){
    cargarPeliculas(buscarUrl + busqueda);
    
  }
});

cargarPeliculas();