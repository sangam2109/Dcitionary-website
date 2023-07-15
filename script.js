function playSpeech() {
  
        console.log("hello")
       
    const searchText = document.querySelector("#search-input").value;
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
    }, 10);

}

const fetchDataFromDictionaryAPI = async () => {
    
    try {
        const wordInput = document.getElementById("search-input");
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`).catch((error) => {
            document.getElementById('dictionary').innerHTML = `<section class="flex flex-col gap-6 items-center w-full mt-[132px]">  <h2 class="font-bold text-heading-s" style="text-align:center">😛 No Definitions Found</h2> </section>`;
            return;
        })
        const data = response.data[0];
        console.log(data);
        wordSpeech = data.word;
        const content = `
        <!-- Main Content -->
        <div id="word">
            <h1 id="word-display">${data.word}</h1>
            <button id="play-btn" onclick="playSpeech()"><img src="images/icon-play.svg" alt="" id="play"></button>
        </div>
        <p id="phonetic">${data.phonetic ? data.phonetic : ''}</p>
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
            <h2 class="synonyms-title">${data.meanings[0].synonyms ? 'Synonyms' : ''}</h2>
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
            <h2 class="synonyms-title">${data.meanings[1].synonyms ? 'Synonyms' : ''}</h2>
            <form method="post" action="/?/search">
                <input type="hidden" name="word" value="electronic keyboard">
                <button class="synonym-button">${data.meanings[1].synonyms}</button>
            </form>
        </section>
    <section class="section-divider"></section>
    <div class="source-section">
        <h2 class="source-title">Source</h2>
        <a class="source-link"
            href=${data.source || data.sourceUrls}>${data.source || data.sourceUrls}</a>
    </div>`
        document.getElementById('dictionary').innerHTML = content;
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
};

function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // document.getElementById("search-input").style.color = "white";
    // document.getElementById("search-input").style.backgroundColor = "#252121";
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


