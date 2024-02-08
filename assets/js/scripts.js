const categories = {
    'growcast' : movies.filter((movie) => movie.category == 'growcast'),
    'webinar'  : movies.filter((movie) => movie.category == 'webinar'),
    'ux-ui'    : movies.filter((movie) => movie.category == 'ux-ui'),
    'diverses' : movies.filter((movie) => movie.category == 'geral')
}
    
function renderMovieCard(title, image, link) {
    return `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 pb-4 mb-2 position-relative">
        <div class="card border-0">
            <img src="${image}" class="card-img-top" alt="Thumbnail do vídeo: ${title}">
            <div class="card-body bg-black text-light py-3 pb-5">
                <span class="d-flex align-items-center gap-3 movie-link" data-link="${link}">
                    <button class="fs-1 rounded-circle border-0 bg-transparent p-0" aria-label="Assistir vídeo">
                        <i class="d-flex bi bi-play-circle m-0 p-0 text-white"></i>
                    </button>
                    <h3 class="d-inline fs-6 mb-0">${title}</h3>
                </span>
            </div>
        </div>
    </div>`
}

function setup() {
    for (const category in categories) {
        const ref = document.getElementById(category).parentElement.parentElement;
        
        categories[category].forEach(movie => {
            ref.innerHTML += renderMovieCard(movie.title, movie.img, movie.link);
        });
    }
}

setup();