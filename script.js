
function playSpeech() {
    const searchText = document.querySelector("#word-display").textContent;
    const currentSpeech = new SpeechSynthesisUtterance(searchText);
    window.speechSynthesis.speak(currentSpeech);
}

const fetchDataFromDictionaryAPI = async () => {
    try {
        const wordInput = document.getElementById("search-input");
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`).catch((error) => {
            document.getElementById('dictionary').innerHTML = `<section id="no-definitions-section" class="flex flex-col items-center justify-center mt-8"><h2 class="font-bold text-3xl mb-4">No Definitions Found</h2><p class="text-lg">Oops! We couldn't find any definitions for the searched word 😐 . </p></section>`;
            return;
        });
        const data = response.data[0];
        const searchName = document.querySelector("#search-input").value;
        const content = `
      <!-- Main Content -->
      <div id="word">
        <h1 id="word-display">${data.word ? data.word : searchName}</h1>
        <button id="play-btn" onclick="playSpeech()"><img src="images/icon-play.svg" alt="" id="play"></button>
      </div>
      <p id="phonetic">${data.phonetics && data.phonetics.length > 1 && data.phonetics[1].text ? data.phonetics[1].text : data.phonetics && data.phonetics.length > 0 ? data.phonetics[0].text : data.phonetic ? data.phonetic : ''}</p>
      ${generateSections(data.meanings)}
      <section class="section-divider"></section>
      <div class="source-section">
        <h2 class="source-title">Source</h2>
        <a class="source-link" href="${data.source ? data.source : (data.sourceUrls ? data.sourceUrls : "https://en.m.wiktionary.org/wiki/" + searchName)}">${data.source || data.sourceUrls ? (data.source || data.sourceUrls) : "https://en.m.wiktionary.org/wiki/" + searchName}</a>
      </div>`;

        document.getElementById('dictionary').innerHTML = content;
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
};

const generateSections = (meanings) => {
    return meanings.map((meaning, i) => {
        return `
      <section class="meaning-section">
        <div class="noun-container_data">
          <h2 class="noun-container_data_noun">${meaning.partOfSpeech}</h2>
          <div class="noun-container_data_noun-line"></div>
        </div>
        <h4 class="meaning-title">Meaning</h4>
        <ul class="meaning-list">
          ${generateLi(meaning.definitions)}
        </ul>
        <section class="synonyms-section">
          <h2 class="synonyms-title">${meaning.synonyms.length > 0 ? 'Synonyms' : ''}</h2>
          <form method="post" action="/?/search">
            <input type="hidden" name="word" value="electronic keyboard">
            ${generateSynonymsButtons(meaning.synonyms)}
          </form>
        </section>
      </section>`;
    }).join('');
};

const generateLi = (definitions) => {
    return definitions.map(definition => {
        const example = definition.example ? `<p class="example">${definition.example}</p>` : '';
        return `<li class="meaning-item">${definition.definition}${example}</li>`;
    }).join('');
};

const generateSynonymsButtons = (synonyms) => {
    return synonyms.map(synonym => {
        return `<button class="synonym-button">${synonym}</button>`;
    }).join(' ; ');
};

// Set the initial value in localStorage only if it doesn't exist
if (localStorage.getItem("buttonclicked") === null) {
  localStorage.setItem("buttonclicked", JSON.stringify(false));
}

function changeMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  // Store the current mode in localStorage
  var button = document.getElementById("mode-setter");
  var mode = button.checked;
  localStorage.setItem("buttonclicked", JSON.stringify(mode));
}

window.onload = function () {
  var buttonClicked = JSON.parse(localStorage.getItem("buttonclicked"));
  if (buttonClicked) {
    var button = document.getElementById("mode-setter");
    button.checked = true;
    changeMode();
  }
};



function LanguageSansSerif() {
    word = document.getElementById("dropdown-name");
    word.innerHTML = 'Sans Serif';
    document.body.classList.remove("mono");
    document.body.classList.remove("serif");
    document.body.classList.add("sans-serif");
}

function LanguageSerif() {
    word = document.getElementById("dropdown-name");
    word.innerHTML = 'Serif';
    document.body.classList.remove("mono");
    document.body.classList.remove("sans-serif");
    document.body.classList.add("serif");
}

function LanguageMono() {
    word.innerHTML = 'Mono';
    document.body.classList.remove("serif");
    document.body.classList.remove("sans-serif");
    document.body.classList.add("mono");
}
