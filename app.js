// =========================
// One Card Tonight
// =========================

const ACCESS_CODE = "16042026";

let currentRole = null;
let currentCard = null;

// =========================
// Screens
// =========================

const loginScreen = document.getElementById("loginScreen");
const roleScreen = document.getElementById("roleScreen");
const deckScreen = document.getElementById("deckScreen");
const cardScreen = document.getElementById("cardScreen");
const byeScreen = document.getElementById("byeScreen");
const finishScreen = document.getElementById("finishScreen");

// =========================

const codeInput = document.getElementById("codeInput");
const loginError = document.getElementById("loginError");

const openButton = document.getElementById("openButton");

const drawButton = document.getElementById("drawButton");

const completeButton =
document.getElementById("completeButton");

const restartButton =
document.getElementById("restartButton");

const cardsLeftLabel =
document.getElementById("cardsLeft");

const cardText =
document.getElementById("cardText");

const performer =
document.getElementById("performer");

// =========================

function showScreen(screen){

    document
    .querySelectorAll(".screen")
    .forEach(item=>{

        item.classList.remove("active");

    });

    screen.classList.add("active");

}

// =========================

function updateCounter(){

    const left = cardsLeftCount(currentRole);

     cardsLeftLabel.innerHTML = `
        Осталось
        <br>
        ${left} из 18
    `;

}

// =========================

function cardsLeftCount(role){

    return cardsLeft(role);

}

// =========================

openButton.onclick = ()=>{

    if(codeInput.value!==ACCESS_CODE){

        loginError.textContent =
        "Неверный код";

        return;

    }

    loginError.textContent="";

    codeInput.value="";

    showScreen(roleScreen);

};

// =========================

document
.querySelectorAll(".roleButton")
.forEach(button=>{

    button.onclick=()=>{

        currentRole =
        button.dataset.role;

        updateCounter();

        showScreen(deckScreen);

    };

});
// =========================
// Открыть карту
// =========================

drawButton.onclick = ()=>{

    currentCard =
    getRandomCard(currentRole);

    if(currentCard===null){

        showScreen(finishScreen);

        return;

    }

    performer.textContent =
currentCard.performer;

cardText.textContent =
currentCard.text;

    showScreen(cardScreen);

};

// =========================
// Выполнено
// =========================

completeButton.onclick = ()=>{

    saveCompleted(

        currentRole,

        currentCard.id

    );

    showScreen(byeScreen);

    setTimeout(()=>{

        showScreen(loginScreen);

    },3000);

};

// =========================
// Новая колода
// =========================

restartButton.onclick = ()=>{

    resetDeck(currentRole);

    updateCounter();

    showScreen(deckScreen);

};

// =========================
// Enter
// =========================

codeInput.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Enter"){

            openButton.click();

        }

    }

);

// =========================
// Старт
// =========================

showScreen(loginScreen);
