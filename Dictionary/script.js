const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const searchInp = document.getElementById("inp-word");
const close = document.getElementById("close");

btn.addEventListener("click", () => {
  // remove spaces from searchInp
  const inpWord = searchInp.value.trim();
  
  // check if input is empty
  if (inpWord === "") {
    result.innerHTML = `<h3 class="error">Please enter a word to search.</h3>`;
    return;
  }

  // if input is not empty
  if (searchInp.value != "" && searchInp.value != null) {
    document.querySelector(".result").style.display = "block";
  }
  
  // fetch data
  fetch(`${url}${inpWord}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {

      console.log(data);

      // change the data to display
      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()"><i class="fa-sharp fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <div>
          <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
          
          <div class="ex-box">
            <p class="ex"><b><i>Example</i></b></p>
            <p class="word-example"><i>${data[0].meanings[0].definitions[0].example || "No example found"}</i></p>
          </div>
          <div class="ex-box">
            <p class="synonyms"><b><i>Synonyms</i></b></p>
            <p class="word-synonyms"><i>${data[0].meanings[0].synonyms.length > 0 ? data[0].meanings[0].synonyms.join(', ') : "No synonyms found"}</i></p>
          </div>
          <div class="ex-box">
            <p class="antonyms"><b><i>Antonyms</i></b></p>
            <p class="word-antonyms"><i>${data[0].meanings[0].antonyms.length > 0 ? data[0].meanings[0].antonyms.join(', ') : "No antonyms found"}</i></p>
          </div>
        </div>
      `;


    // Update the sound source
      sound.setAttribute("src", data[0].phonetics[0]?.audio || "");
    })

    // catch error
    .catch((error) => {
      console.error(error);
      result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
    });
});

// Play sound
function playSound() {
  sound.play();
}

close.addEventListener("click", () => {
  searchInp.value = "";
  result.innerHTML = ""; // Clear previous results
});