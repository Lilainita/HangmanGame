const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const container = document.querySelector(".container")
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const word = ["paradise", "javascript", "alura", "rainbow", "scape", "heart", "songs"]

let selectedWord = word[Math.floor(Math.random() * word.length)]
const figureParts = document.querySelectorAll('.figure-part');

const correctLetters = [];
const wrongLetters = [];

function createBtn() {
    let button = letters.map(letter => `<button class="btn" id="${letter}" onClick="handleWord(${letter})">${letter}</button>`).join("")
    document.getElementById("keyboard").innerHTML = button;
    /*let button = document.createElement("button")
    button.classList.add("btn")
    button.setAttribute("id", letter)
    button.innerText = letter
    document.getElementById("keyboard").appendChild(button)*/
}

createBtn()

function handleWord(letter) {
    if (selectedWord.includes(letter.id)) {
        if (!correctLetters.includes(letter.id)) {
            correctLetters.push(letter.id)
            console.log("correctLetter " + correctLetters)
            displayWord()
        }
    } else {
        wrongLetters.push(letter.id)
        console.log("wrongLetter " + wrongLetters)

        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;

            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        if (wrongLetters.length === figureParts.length) {
            /*const btns = document.querySelectorAll(".btn")
            btns.forEach(btn => {
                btn.disabled = false
            })*/

            setTimeout(() => {
                finalMessage.innerText = 'Unfortunately you lost. 😕';
                finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
                popup.style.display = 'flex';
            }, 1000)


        }
    }

    console.log(letter.id)
    console.log(this)
    letter.disabled = true
}


function displayWord() {
    container.innerHTML = selectedWord.split("").map(letter => `<span class="words">${correctLetters.includes(letter) ? letter : ""}</span>`).join("")

    const innerWord = container.innerText.replace(/[ \n]/g, '');

    if (innerWord === selectedWord) {
        setTimeout(() => {
            finalMessage.innerText = 'Congratulations! You won! 😃';
            finalMessageRevealWord.innerText = '';
            popup.style.display = 'flex';
        }, 1000)

    }

    playAgainBtn.addEventListener('click', () => {
        correctLetters.splice(0);
        wrongLetters.splice(0);

        selectedWord = word[Math.floor(Math.random() * word.length)];

        displayWord();

        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;

            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        window.location.reload();

        //updateWrongLettersEl();

        popup.style.display = 'none';
    });
}
displayWord()
