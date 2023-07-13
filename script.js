
const word = document.getElementById("search-input")
const footer = document.getElementById("wikipedia-link")

const fetchDataFromDictionaryAPI = async () => {
    try {
        const wordInput = document.getElementById("search-input");
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`);
        const data = response.data[0];

        const formattedData = {
            word: data.word,
            phonetic: data.phonetic,
            meanings: data.meanings.map(meaning => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(definition => ({
            meaning: definition.definition,
            example: definition.example || null,
            synonyms: definition.synonyms || [],
            antonyms: definition.antonyms || []
                }))
            })),
            source: data.sourceUrls[0]
        };

        console.log(formattedData);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
};

// const fetchDataFromDictionaryAPI = async (id, value) => {
//     try {
//         let word = document.getElementById(id)
//         const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`);
//         const data = response.data[0][value];
//         console.log(data);
//         // console.log(data)
//     } catch (error) {
//         console.error('Error fetching data from the API:', error.message);
//     }
// };

function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    document.getElementById("search-input").style.color = "white";
}


