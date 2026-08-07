// =========================
// One Card Tonight
// Storage
// =========================

const STORAGE_KEY = "oneCardTonight";

const defaultData = {

    maleCompleted: [],

    femaleCompleted: []

};

// =========================

function loadData(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data){

        saveData(defaultData);

        return structuredClone(defaultData);

    }

    return JSON.parse(data);

}

// =========================

function saveData(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// =========================

function getCompleted(role){

    const data = loadData();

    return role === "male"
        ? data.maleCompleted
        : data.femaleCompleted;

}

// =========================

function saveCompleted(role,id){

    const data = loadData();

    if(role==="male"){

        if(!data.maleCompleted.includes(id)){

            data.maleCompleted.push(id);

        }

    }else{

        if(!data.femaleCompleted.includes(id)){

            data.femaleCompleted.push(id);

        }

    }

    saveData(data);

}

// =========================

function cardsLeft(role){

    return 18 - getCompleted(role).length;

}

// =========================

function resetDeck(role){

    const data = loadData();

    if(role==="male"){

        data.maleCompleted=[];

    }else{

        data.femaleCompleted=[];

    }

    saveData(data);

}

// =========================

function getRandomCard(role){

    const completed = getCompleted(role);

    const source = cards[role];

    const available = source.filter(card=>{

        return !completed.includes(card.id);

    });

    if(available.length===0){

        return null;

    }

    const random = Math.floor(

        Math.random()*available.length

    );

    return available[random];

}