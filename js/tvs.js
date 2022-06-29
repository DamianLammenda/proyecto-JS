let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnInicio = document.getElementById("btnInicio");
btnInicio.addEventListener("click", () => {
  window.location.href = "../index.html";});

const main = document.getElementById("main");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarSeries();
    document.body.scrollIntoView();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarSeries();
    document.body.scrollIntoView();
  }
});

const cargarSeries = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=ab615ab136c6a4dd4fdcea3d3afd2ef0&language=es-MX&page=${pagina}&append_to_response=overview`
    );
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let series = "";
      datos.results.forEach((serie) => {
        series += `
				<div class="serie">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}">
				<h3 class="titulo">${serie.name}</h3>
				<button class="btnVerMas">Ver más</button>		
				</div>`;
      });

      document.getElementById("contenedor").innerHTML = series;

      verMas(datos);
    }
  } catch (error) {
    console.log(error);
  }
};
function verMas(datos) {
  const btnVerMas = document.getElementsByClassName("btnVerMas");
  for (let i = 0; i < btnVerMas.length; i++) {
    btnVerMas[i].addEventListener("click", () => {
      Swal.fire({
        html: `<span class="imdb">IMDB: </span><span class="datosImdb">${datos.results[i].vote_average}</span> 
						<br>						
						<h1 class="tituloSwalMovie"> ${datos.results[i].name}</h1>
						<br>
            <h6 class="fechaEstreno">Fecha de Estreno: ${datos.results[i].first_air_date}</h6>
						<p class="sinopsisMovie"> ${datos.results[i].overview}</p>
						`,
        imageUrl: `https://image.tmdb.org/t/p/w500/${datos.results[i].poster_path}`,
        imageWidth: 250,
        imageHeight: 400,
        background: "black",
        color: "#fff",
        imageAlt: datos.results[i].name,
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
      });
    });
  }
}

const buscarSerie = async ()=>{
  let peticion = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=ab615ab136c6a4dd4fdcea3d3afd2ef0&language=es-MX&query=${search.value}`)
  let resultado = await peticion.json()
  search.value;
  let peliculas = "";
      resultado.results.forEach((pelicula) => {
        peliculas += `
				<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
				<button class="btnVerMas">Ver más</button>		
				</div>`;
      });
      let contenedor = document.getElementById("contenedor");
      contenedor.innerHTML = peliculas;
      verMas(resultado);
  console.log(resultado);
}
form.addEventListener("submit",(search)=> {
  search.preventDefault()
  buscarSerie()
})

cargarSeries();
