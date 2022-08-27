function MoviesMainCharacter(){

	// Character APIs
    const Characters = [
        "https://swapi.dev/api/people/5/", 
        "https://swapi.dev/api/people/20/",
        "https://swapi.dev/api/people/9/",
        "https://swapi.dev/api/people/6/", 
     ]
    var z = 1;

    for(a = 0; a < Characters.length; a++){

    	//console.log('welcome'+a);
    	z++;

    	 // Select Celebrities Div
        const CharactersDiv = document.getElementById("Characters");
        // Create Div to Display Actor Image Using DOM
        const CharactersImgDiv = document.createElement("div");
        CharactersImgDiv.className = 'col-lg-3 col-md-3 col-sm-4';
        CharactersImgDiv.id = 'actors-img'+a;
        CharactersDiv.appendChild(CharactersImgDiv);
        // Create Div to Display Actors Information Using DOM
        const CharacterInfo = document.createElement("div");
        CharacterInfo.className = 'col-lg-3 col-md-3 col-sm-8';
        CharacterInfo.id = 'actors-info'+a;
        CharactersDiv.appendChild(CharacterInfo);
         // Create Div to Display Actor Movies Using DOM
        const CharacterMovie = document.createElement("div");
        CharacterMovie.className = 'col-lg-6 col-md-6 col-sm-12 movie-link';
        CharacterMovie.id = 'actors-movie'+a;
        CharactersDiv.appendChild(CharacterMovie);
        // Create Div to Display Actor Movie Details Using DOM
        const CharacterMovieDetails = document.createElement("div");
        CharacterMovieDetails.className = 'col-lg-12 col-md-12 col-sm-12 align-top';
        CharacterMovieDetails.id = 'actors-movie-detail'+a;
        CharactersDiv.appendChild(CharacterMovieDetails);
        // Call JS Select Data Using JS Fetch API
        getData(Characters[a], a);
        // Remove HR Tag from Last Element
        if(z <= Characters.length){
            const hr = document.createElement("hr");
            hr.className = 'my-3 px-2';
            CharactersDiv.appendChild(hr);
        }
    }

}

/* Get Data Using JS Fetch API */
async function getData(url, counter) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Create HTML Elements and Display Data
            ShowData(data, counter)
        })
        .catch((error) => console.error("ERROR:", error));
}

/* Create HTML Elements and Display Data */
function ShowData(data, counter) {
    // Select Actor Image Div
    const CharacerImageDiv = document.getElementById("actors-img"+counter);
    // Actor Image
    const charaterimage = document.createElement("img");
    var CharactersImage = data.name.replace(/\s/g, '');
    charaterimage.src = 'assets/images/'+CharactersImage+'.jpg';
    charaterimage.width = '150';
    charaterimage.height = '250';
    charaterimage.className = 'img img-thumbnail rounded';
    CharacerImageDiv.appendChild(charaterimage);
    // Select Actor Info Div
    const actorsInfo = document.getElementById("actors-info"+counter);
    // Actor Name
    const actorName = document.createElement("h5");
    actorName.innerHTML = data.name;
    actorName.className = 'mb-0 font-title-custom';
    actorsInfo.appendChild(actorName);
    // Display Profession
    const profession = document.createElement("span");
    profession.innerHTML = 'Actor';
    profession.className = 'text-muted text-small font-small';
    actorsInfo.appendChild(profession);
    // Actor Birth Year
    const actorBirthYear = document.createElement("span");
    actorBirthYear.className = 'd-block font-custom mt-2';
    actorBirthYear.innerHTML = 'Birth Year: '+data.birth_year;
    actorsInfo.appendChild(actorBirthYear);
    // Actor Height
    const actorHeight = document.createElement("span");
    actorHeight.className = 'd-block font-custom';
    actorHeight.innerHTML = 'Height: '+data.height;
    actorsInfo.appendChild(actorHeight);
    // Skin Color
    const actorSkin = document.createElement("span");
    actorSkin.className = 'd-block font-custom';
    actorSkin.innerHTML = 'Skin: '+data.skin_color;
    actorsInfo.appendChild(actorSkin);
    // Eye Color
    const actorEye = document.createElement("span");
    actorEye.className = 'd-block font-custom';
    actorEye.innerHTML = 'Eye: '+data.eye_color;
    actorsInfo.appendChild(actorEye);
    // Hair Color
    const actorHair = document.createElement("span");
    actorHair.className = 'd-block font-custom';
    actorHair.innerHTML = 'Hair: '+data.hair_color;
    actorsInfo.appendChild(actorHair);
    // Select Movie Div to Display Movies
    const movies = document.getElementById("actors-movie"+counter);
    let moviesList = data.films;
    console.log(moviesList);
    // Create Div
    const mainDivTag = document.createElement("div");
    mainDivTag.className = 'row'
    movies.appendChild(mainDivTag);
    // Loop Movies
    for (var i=0; i < moviesList.length; i++) {
        // Create Div to Display Movies
        const movieDivTag = document.createElement("div");
        movieDivTag.className = 'col-lg-12 col-md-3 col-sm-6'
        movieDivTag.id = 'movies-list-'+i+'-'+counter;
        mainDivTag.appendChild(movieDivTag);

        const breaklineMovices = document.createElement("hr");
    	mainDivTag.appendChild(breaklineMovices);
        // Movie Poster
        const movieImage = document.createElement("img");
        movieImage.src = 'assets/images/film.jpg';
        movieImage.width = '90';
        movieImage.height = '180';
        movieImage.className = 'img img-thumbnail rounded moviesimagelist';
        movieDivTag.appendChild(movieImage);
        
        getDisplayMovieName(moviesList[i], 'movies-list-'+i+'-'+counter,counter);
    }
}

/* Get Movie Name by Movie Link */
function getDisplayMovieName(url, id, counter){
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Function to Display Movie Name
            setDisplayMovieName(data, id, counter);
        })
        .catch((error) => console.error("ERROR:", error));      
}

/* Set Movie Name  */
function setDisplayMovieName(data, id, counter) {
    // Select Movie Div
    const movieDivforMovies = document.getElementById(id);
    // Movie Title
    const moviesLink = document.createElement("span");
    moviesLink.className = 'movie-link';
    moviesLink.innerHTML = makeShort(data.title);
    movieDivforMovies.appendChild(moviesLink);
    // More Button
    const visitLink = document.createElement("button");
    visitLink.href = '#';
    visitLink.addEventListener("click", function(){ movieDetails(data.url, counter); });
    visitLink.className = 'btn btn-rounded btn-sm btn-outline-dark';
    visitLink.innerHTML = 'See More...';
    movieDivforMovies.appendChild(visitLink);

}

/* get some text from title*/
function makeShort (val) {
    if (val.length > 10) {return (val.substring(0, 30) + "...");}
    else { return val; }
}

/* request films Details here  */
function movieDetails(url, counter){
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // call to  Display films Details
            displayMovieDetails(data, counter);
        })
        .catch((error) => console.error("ERROR:", error));
}

/* Display films Details */
function displayMovieDetails(data, counter) {
    // Select films Details Div
    const movieDetails = document.getElementById('actors-movie-detail'+counter);
    movieDetails.style.borderLeft = '1px solid #bbb';
    // Empty Div Content
    movieDetails.innerHTML = '';
    // create Div to display short details about Films
    const movieDetailContent = document.createElement("div");
    movieDetailContent.className = 'row';
    movieDetails.appendChild(movieDetailContent)

    const newline = document.createElement('hr');
    movieDetailContent.appendChild(newline);
    // Div for show/ display film poster
    const moviePosterDetailsDiv = document.createElement("div");
    moviePosterDetailsDiv.className = 'col-lg-2 col-md-4 col-sm-12';
    movieDetailContent.appendChild(moviePosterDetailsDiv)
    // film Poster
    const moviePosterImageDetails = document.createElement("img");
    moviePosterImageDetails.src = 'assets/images/film.jpg';
    moviePosterImageDetails.width = '150';
    moviePosterImageDetails.height = '150';
    moviePosterImageDetails.className = 'rounded';
    moviePosterDetailsDiv.appendChild(moviePosterImageDetails)
    // here we create a div to display titile of the films
    const movieTitleDivContent = document.createElement("div");
    movieTitleDivContent.className = 'col-lg-2 col-md-4 col-sm-12';
    movieDetailContent.appendChild(movieTitleDivContent)
    // film Title
    const movieTitle = document.createElement("span");
    movieTitle.className = 'movie-link-title';
    movieTitle.innerHTML = data.title;
    movieTitleDivContent.appendChild(movieTitle);
    
    const breakTag = document.createElement("br");
    
    movieTitle.appendChild(breakTag);
    // film Directed By
    const movieDirectedBy = document.createElement("span");
    movieDirectedBy.className = 'font-small';
    movieDirectedBy.innerHTML = 'Directed By: '+data.director;
    movieTitleDivContent.appendChild(movieDirectedBy);
   
    const breakTagDirected = document.createElement("br");
    movieDirectedBy.appendChild(breakTagDirected);
    // Produced By
    const filmProducter = document.createElement("span");
    filmProducter.className = 'font-small';
    filmProducter.innerHTML = 'Produced By: '+data.producer;
    movieTitleDivContent.appendChild(filmProducter);
    
    // Release Date
    const filmReleasedDate = document.createElement("span");
    filmReleasedDate.className = 'font-small';
    filmReleasedDate.innerHTML = 'Produced By: '+data.release_date;
    movieTitleDivContent.appendChild(filmReleasedDate);
    
    // film details gose here
    const filmdetails = document.createElement("div");
    filmdetails.className = 'col-lg-8 font-small text-justify showdetails';
    filmdetails.innerHTML = data.opening_crawl;
    movieDetailContent.appendChild(filmdetails);
}