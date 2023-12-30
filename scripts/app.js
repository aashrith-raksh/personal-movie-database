// GLOBAL VARIABLES
let currentIndex = 0;
const DELETE_MOVIE_EL = 'delete_movie_element'
const ADD_BUTTON = "add_button"

// DOM REFERENCES
const addMovieBtn = document.querySelector('header button');  //Points to 'ADD MOVIE' button on top-right corner of page
const addMovieModal = document.querySelector('#add-modal');

const cancelBtn = addMovieModal.querySelector('.btn--passive');

const backDropDiv = document.querySelector('#backdrop');//backDrop Overlay when 'ADD MOVIE' is clicked

const confirmAddMovieBtn = cancelBtn.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll('#add-modal input');

const movies = [];

const entryTextBox = document.querySelector('#entry-text');

const deleteModal = document.querySelector('#delete-modal');



// RELEVANT FUNCTION DECLARATIONS
function toggleAddMovie() {
    console.log('toglleAddMovie() called')
    addMovieModal.classList.toggle('visible');
    addBackDrop(ADD_BUTTON);

}

const addBackDrop = (btnName) => {
    backDropDiv.classList.add('visible');
    backDropDiv.addEventListener('click', backDropHandler.bind(this, btnName));
}

    
const removeBackDrop = () => { 
    backDropDiv.classList.remove('visible'); 
    backDropDiv.removeEventListener('click', backDropHandler);

}

function clearUserInputs(){
    for(const userInput of userInputs){
        userInput.value = '';
    }
}

function deleteMovieEl(movieId){
    // Delete the element from movies array
    console.log('entered deleteMovie function')
    movies.splice(movieId,1);
    const movieList = document.querySelector('#movie-list');

    // console.log('Movie List Children:\n',movieList.children);
    // console.log('Movie ID:\n',movieId);
    const trashMovie =  movieList.children[+movieId];
    // console.log('trashMovie:\n',trashMovie);
    movieList.removeChild(trashMovie);
    backDropHandler(DELETE_MOVIE_EL);
    updateUI();

}

function updateUI(){
    if(movies.length === 0){
        entryTextBox.style.display = 'block'
    }else{
        entryTextBox.style.display = 'none'
    }
}

function renderNewMovie(movieId, movieTitle, imageURL, movieRating){
    const newMovieEl = document.createElement('li');
    newMovieEl.className = 'movie-element';
    newMovieEl.innerHTML = `
    <div class = "movie-element__image">
        <img src = "${imageURL}">
    </div>
    <div class = "movie-element__info">
        <h2>${movieTitle}</h2>
        <p>${movieRating}/5 Stars</p>
    </div>
    `
    newMovieEl.addEventListener('click', deleteMovieElHandler.bind(this, movieId));
    const movieList = document.querySelector('#movie-list');
    movieList.append(newMovieEl);
}

// EVENT HANDLER FUNCTIONS

function cancelBtnHandler(){
    toggleAddMovie();
    removeBackDrop();
    clearUserInputs();
}

function backDropHandler(btnName){
    // console.log('clicked backdrop')
    if(btnName === ADD_BUTTON){
        addMovieModal.classList.remove('visible');
        clearUserInputs();

    } if(btnName === DELETE_MOVIE_EL){
        deleteModal.classList.remove('visible');
    }

    removeBackDrop();
}

function confirmAddMovieBtnHandler(){
    const movieTitle = userInputs[0].value;
    const imageURL = userInputs[1].value;
    const movieRating = userInputs[2].value;
    
    if(movieTitle.trim() === '' || 
       imageURL.trim() === '' ||
       (+movieRating < 1 || +movieRating > 5)
    ){
        alert("Invalid Input Entered");
        
    }else{
        const newMovieObject = {
            movieId: currentIndex,
            movieTitle : movieTitle,
            imageURL: imageURL,
            movieRating : movieRating
        }

        movies.push(newMovieObject);
        currentIndex++;
        if(movieTitle || movieRating >= 1 && movieRating <= 5 || imageURL){
            console.log(newMovieObject);
        }
        
        updateUI();
        renderNewMovie(newMovieObject.movieId, newMovieObject.movieTitle, newMovieObject.imageURL, newMovieObject.movieRating);
    }


    toggleAddMovie();
    removeBackDrop();
    clearUserInputs();
}

function deleteMovieElHandler(movieId){
    deleteModal.classList.add('visible');
    addBackDrop(DELETE_MOVIE_EL);

    const cancelDeleteMovieBtn = deleteModal.querySelector('.btn--passive');
    const confirmDeleteMovieBtn = deleteModal.querySelector('.btn--danger');

    cancelDeleteMovieBtn.addEventListener('click', () => {
        // deleteModal.classList.remove('visible');
        // backDropDiv.removeEventListener('click', )
        backDropHandler(DELETE_MOVIE_EL);
    })

    confirmDeleteMovieBtn.addEventListener('click',deleteMovieEl.bind(this, movieId));
    // deleteMovieEl(movieId);
}

//EVENT LISTENENERS
addMovieBtn.addEventListener('click',toggleAddMovie);

cancelBtn.addEventListener('click', cancelBtnHandler);
// backDropDiv.addEventListener('click', backDropHandler);
confirmAddMovieBtn.addEventListener('click', confirmAddMovieBtnHandler);
















    // document.removeEventListener("keydown", keyDownHandler);


    // addMovieBtn.addEventListener('click',addEventListenerToDocument);




// function addEventListenerToDocument(){
//     console.log('added event listener to document')
//     document.addEventListener('keydown', keyDownHandler);
// }
            
    // function keyDownHandler(event){
    //     console.log('In keyDownHandler...waiting to press \'ENTER\' key')
    
    //     if(event.keyCode === 13){
    //         console.log('Enter key Pressed...calling confirmAddMovieBtnHandler');
    //         confirmAddMovieBtnHandler();
    //         return;
    //     }
    // }


   