(() => {
const modal = new bootstrap.Modal('#modal-fullscreen');
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

function renderIframe(link) {
    return `
    <div class="ratio ratio-21x9">
        <iframe class="container-fluid"
            width="100%" 
            height="100%" 
            src="${link}" 
            title="YouTube video player" frameborder="0" 
            allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share
            "
            allowfullscreen
            onload="document.querySelector('#loading').style.display = 'none';">
        </iframe>
        <div id="loading" class="spinner-border top-50 start-50" role="status" style="height:50px;width:50px">
            <span class="visually-hidden">Carregando vídeo...</span>
        </div>
    </div>`
}

function updateModal(title, link) {
    const modalRef = modal._element;
    const modalTitle = modalRef.querySelector('.modal-title');
    const modalBody = modalRef.querySelector('.modal-body');
    
    modalTitle.innerText = title;
    modalBody.innerHTML = renderIframe(link);

    modal.show();
}

function setup() {
    for (const category in categories) {
        const ref = document.getElementById(category).parentElement.parentElement;
        
        categories[category].forEach(movie => {
            ref.innerHTML += renderMovieCard(movie.title, movie.img, movie.link);
        });
    }

    document.querySelectorAll('.movie-link').forEach( element => {
        element.addEventListener('click', (e) => {
            let element = e.target;
            while (!element.dataset.link) {
                element = element.parentElement;
            }
            const link = element.dataset.link;
            const title = element.querySelector('h3').innerText;
            updateModal(title, link);
        });
    });

    document.querySelector('#close-modal').addEventListener('click', (e) => {
        modal._element.querySelector('.modal-body').innerHTML='';
    });
}

setup();
})();