//DOM
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

//Array contenedor de las canciones.
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
    },
];

//API WEB AUDIO

const audio = new Audio();

let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

//Funcion flecha
//Funcion para mostrar las canciones en el HTML 
const renderSongs = (array) => {
    const songsHTML = array
        .map((song) => {
            return `
        <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        </li>
        `;
        })
        .join("");

    playlistSongs.innerHTML = songsHTML;
};
// map => es usado para iterar a traves de un array y devolver un nuevo array. Es util cuando se quiere 
//crear un array basada en los valores de un array existente.
/*
const numbers = [1,2,3];
const doubleNumbers = numbers.map((number) => number * 2) ;
console.log(doubleNumbers);

join => El metodo join se utiliza para concatenar todos los elementos de una matriz en una sola cadena. Se necesita un parametro opcional
llamado separator que se utiliza para separar cada elemento del array.
const example = ['Esta', 'es', 'una','sentencia'];
const sentence = example.join(' ');
console.log(sentence);
*/
renderSongs(userData?.songs)
//userData?song => El encadenamiento opcional (?.) ayuda a evitar errores al acceder a propiedades anidadas que pueden se nulas o no definidas.

//Funciones que aportan la funcionalidad de reproduccion de las canciones.

//Reproducir cancion
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0
    } else {
        audio.currentTime = userData.songCurrentTime
    }
    userData.currentSong = song;
    playButton.classList.add('playing');
    highlightCurrentSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText()
    audio.play();
    

    /* find () => el metodo find recupera el primer elemento dentro de un array que cumple con las condiciones especificadas en la funcion de devolucion de llamada proporcionada
    Si ningun elemento satisface la condicion, el metodo devuelve undefined. 
    const numbers = [10,20,30,40,50];
    //Encuentra el primer numero mas grande que 25;
    const foundNumber = numbers.find((number) => number > 25);
    console.log(foundNumber);
    */
};

playButton.addEventListener('click', () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id)
    } else {
        playSong(userData?.currentSong.id)
    }
});

//Pausar cancion

const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove('playing');
    audio.pause();
}
pauseButton.addEventListener('click', pauseSong);

//Funcion para la obtencion del indice de cada cancion

const getCurrentSongIndex = () => {
    return userData?.songs.indexOf(userData.currentSong);
    /**Index of
     * Sirve para obtener el indice de un elemento predeterminado que se encuentra dentro de un array.
     * 
     * const animals = ['dog', 'cat', 'horse'];
    let animalsIndex = animals.indexOf('tortule');

    console.log(animalsIndex);
     * 
     */
}


//Reproducir siguiente cancion
const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex + 1];
        playSong(nextSong.id)
    }
}

nextButton.addEventListener('click', playNextSong);

//Reproducir la cancion anterior
const playPreviousSong = () => {
    if (userData?.currentSong === null) {
        return
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id)
    }
}
previousButton.addEventListener('click', playPreviousSong);

//Funcion para resaltar la cancion que se esta reproduciendo.

const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(
        `song-${userData?.currentSong?.id}`
    );

    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });

    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
    /**For each
     * 
     * El metodo forEch se utiliza para recorrer un array y realizar una funcion en cada elemento del mismo.
     * 
     * const numbers = [1,2,3,4,5];
     * const recorrer = numbers.forEach((number)=>{
     * console.log(number);
        })
    console.log(recorrer); 
    * 
    */
}
//Funcion que muestra la cancion que esta siendo reproducida dentro del reproductor.
const setPlayerDisplay = () =>{
    const playingSong = document.getElementById('player-song-title');
    const songArtist = document.getElementById('player-song-artist');    
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;
    playingSong.textContent = currentTitle ? currentTitle : '';;
    songArtist.textContent = currentArtist ? currentArtist : '';
    /**Text content 
     * Estable el texto de un nodo y permite configurar o recuperar el contenido de texto de un HTML.
     * 
     * <div id="example">Este es un contenido</div>
     * const element = document.getElementById('example');
     * element.textContent = 'Este es un contenido nuevo'
    */
};

//Funcion que se encarga de reproducir la cancion anterior si esta no es la primera en la lista
const setPlayButtonAccessibleText = ()=>{
    const song = userData?.currentSong || userData?.songs[0];
    playButton.setAttribute("aria-label", song?.title ? `Reproducir ${song.title}`: 'Reproducir');
};

//Funcion para mezclar las canciones

const shuffle = ()=>{
    userData?.songs.sort(()=> Math.random()-0.5);
        /*Sort
    Convierte los elementos de un array en strings y los clasifica segun sus unidades de codigo UTF-16
    const numbers = [4,2,5,100,1,3];

    numbers.sort();
    console.log(numbers)
    //Array(6) [ 1, 100, 2, 3, 4, 5 ]

    numbers.sort((a,b) => a - b);
    console.log(numbers);
    //[1, 2, 3, 4, 5, 100]
    */
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    renderSongs(userData?.songs);
    pauseSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText()
}

shuffleButton.addEventListener('click', shuffle);


//Funcion que gestiona la eliminacion de una cancion de la lista de reproduccion

const deleteSong = (id)=>{
    if(userData?.currentSong?.id === id){
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
    }
    userData.songs = userData?.songs.filter((song) => song.id !== id);
    /**Filter
     * 
     * Es un metodo que mantiene solo los elementos de un array que satisfacen la funcion de devolucion llamada que se le pasa.
     * const numArr = [1,2,3,4,5];
    const numberGreaterThanThree = numArr.filter((num)=> num>3 );
    console.log(numberGreaterThanThree)
    //Array [ 4, 5 ]
    * 
    */
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    if(userData.songs.length === 0){
        const resetButton = document.createElement('button');
        const resetText = document.createTextNode('Reiniciar playlist');
        resetButton.ariaLabel = 'Reiniciar playlist';
        resetButton.id = 'reset';
        playlistSongs.appendChild(resetButton)
        resetButton.appendChild(resetText);
        resetButton.addEventListener('click', ()=>{
            userData.songs = [...allSongs];
            renderSongs(userData?.songs);
            setPlayButtonAccessibleText();
            resetButton.remove();
        })
    }
    /**Create element => es un metodo DOM que puedes usar para crear dinamicamente un elemento usando javascript.
 * Para usar create element se llama y luego se pasa el nombre de la etiqueta como cadena.
 * document.createElement('div')
 * Tambien se puede asignar a una variable
 * const divElement = document.createElement('div');
 * 
 * createTextNode => Es un metodo usado para crear un nodo de texto. Para usarlo debes llamarlo y pasar un texto como una string.
 * document.createTextNode('Tu texto');
 * Tambien se puede asignar a una variable:
 * const myText = document.createTextNode('Tu texto');
 * 
 * //Apend child => Permite agregar un nodo o un elemento como hijo de otro elemento:
    * const parentElement = document.createElement('button');
    const parentElemntText = document.createTextNode('Button');
    parentElement.appendChild(parentElemntText)
 */
}

//Funcion para reproducir una cancion cuando finalice la anterior
audio.addEventListener('ended',() =>{
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
    if(nextSongExists){
        playNextSong();
    }else{
        userData.currentSong = null;
        userData.songCurrentTime =0;
    }
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
})




