function playSpeech() {

    console.log("hello")

    const searchText = document.querySelector("#word-display").textContent;
    console.log(searchText);
    const currentSpeech = new SpeechSynthesisUtterance(searchText);
    window.speechSynthesis.speak(currentSpeech);

}

const generateLi = (array, i) => {
    setTimeout(() => {
    const meaning_list = document.querySelectorAll('.meaning-list')[i];
    meaning_list.innerHTML = `<li class="meaning-item"> ${array[0].definition}</li>`
    for (let index = 1; index < array.length; index++) {
        meaning_list.innerHTML += `<li class="meaning-item"> ${array[index].definition}</li>`
    }
},1)
}



const fetchDataFromDictionaryAPI = async () => {

    try {
        const wordInput = document.getElementById("search-input");
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`).catch((error) => {
            document.getElementById('dictionary').innerHTML = `<section id="no-definitions-section" class="flex flex-col items-center justify-center mt-8"><h2 class="font-bold text-3xl mb-4">No Definitions Found</h2><p class="text-lg">Oops! We couldn't find any definitions for the searched word 😐 . </p></section>`;
            return;
        })
        const data = response.data[0];
        console.log(data)
        const searchName = document.querySelector("#search-input").value;
        const content = `
        <!-- Main Content -->
        <div id="word">
            <h1 id="word-display">${data.word ? data.word : searchName}</h1>
            <button id="play-btn" onclick="playSpeech()"><img src="images/icon-play.svg" alt="" id="play"></button>
        </div>
        <p id="phonetic">${data.phonetics && data.phonetics.length > 1 && data.phonetics[1].text ? data.phonetics[1].text : data.phonetics && data.phonetics.length > 0 ? data.phonetics[0].text : data.phonetic ? data.phonetic : ''}</p>
        <section class="noun-container">
            <div class="noun-container_data">
                <h2 class="noun-container_data_noun">noun</h2>
                <div class="noun-container_data_noun-line"></div>
            </div>
            <h4 class="meaning-title">Meaning</h4>
            <ul class="meaning-list">
         ${generateLi(data.meanings[0].definitions, 0)}
            </ul>
        </section>
         <section class="synonyms-section">
            <h2 class="synonyms-title">${data.meanings[0].synonyms.length != 0 ? 'Synonyms' : ''}</h2>
            <form method="post" action="/?/search">
                <input type="hidden" name="word" value="electronic keyboard">
                <button class="synonym-button">${data.meanings[0].synonyms}</button>
            </form>
        </section> 
        <section class="meaning-section">
            <div class="noun-container_data">
                <h2 class="noun-container_data_noun">verb</h2>
                <div class="noun-container_data_noun-line"></div>
            </div>
            <h4 class="meaning-title">Meaning</h4>
            <ul class="meaning-list">
         ${generateLi(data.meanings[1].definitions, 1)}
            </ul>
        </section>
 <section class="synonyms-section">
            <h2 class="synonyms-title">${data.meanings[1].synonyms.length != 0 ? 'Synonyms' : ''}</h2>
            <form method="post" action="/?/search">
                <input type="hidden" name="word" value="electronic keyboard">
                <button class="synonym-button">${data.meanings[1].synonyms}</button>
            </form>
        </section>
    <section class="section-divider"></section>
    <div class="source-section">
        <h2 class="source-title">Source</h2>
        <a class="source-link"
            href=${data.source ? data.source : (data.sourceUrls ? data.sourceUrls : "https://en.m.wiktionary.org/wiki/" + searchName)}> ${data.source || data.sourceUrls ? (data.source || data.sourceUrls) : "https://en.m.wiktionary.org/wiki/" + searchName}</a>

    </div>`
        document.getElementById('dictionary').innerHTML = content;
        const get=document.getElementById("word-display").innerHTML
        console.log(get);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
};

function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

}

function LanguageSansSerif() {
    word = document.getElementById("dropdown-name");
    word.innerHTML = 'Sans Serif';
    document.body.classList.remove("mono");
    document.body.classList.remove("serif");
    document.body.classList.add("sans-serif");
    console.log("Sans Serif option selected");
}

function LanguageSerif() {
    word = document.getElementById("dropdown-name");
    word.innerHTML = 'Serif';
    document.body.classList.remove("mono");
    document.body.classList.remove("sans-serif");
    document.body.classList.add("serif");
    console.log("Serif option selected");
}

function LanguageMono() {
    word.innerHTML = 'Mono';
    document.body.classList.remove("serif");
    document.body.classList.remove("sans-serif");
    document.body.classList.add("mono");
    console.log("Mono option selected");
}


