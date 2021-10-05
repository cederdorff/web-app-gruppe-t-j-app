"use strict";

// GLOBAL VARIABLES

let _clothes = [];
let _toejId;
let _selectedImgFile = "";

const _baseUrl = "https://api.jsonbin.io/b/615b00e7aa02be1d4453e443";
const _headers = {
    "X-Master-Key": "$2b$10$6CWwxJQJou9fkW/moxmTFe9J.KsWNUmFdERE4UtvbqZLmSfzkrxfm",
    "Content-Type": "application/json"
};

function closeMenu() {
    document.querySelector('#mobileicon').checked = false;
}

//Fetch clothes data from jsonbin
async function loadToej() {
    const url = _baseUrl + "/latest";
    const response = await fetch(url, {
        headers: _headers
    });
    const data = await response.json();
    console.log(data);
    _clothes = data;
    appendClothes(_clothes);
}

loadToej();

//Append clothes to DOM
function appendClothes(clothes) {
    let htmlTemplate = "";
    for (const cloth of clothes) {
        htmlTemplate +=
            `<article onclick="showDetailView('${cloth.name}')">
        <img src="${cloth.img}">
        </article>`
    }
    document.querySelector("#grid-clothes").innerHTML = htmlTemplate;
}
appendClothes(_clothes);
console.log(_clothes);


// CREATE
async function createToej() {
    let imgInput = document.querySelector("#imagePreview");

    let nameInput = document.querySelector("#addName");

    // season
    const seasonItems = document.querySelectorAll("#add .seasonFlex input");
    console.log(seasonItems);
    let seasonArray = [];
    for (const seasonItem of seasonItems) {
        if (seasonItem.checked) {
            seasonArray.push(seasonItem.name);
        }
    }
    console.log(seasonArray);

    // colors
    const colorItems = document.querySelectorAll("#add .farveFlex input");
    let colorArray = [];
    for (const colorItem of colorItems) {
        if (colorItem.checked) {
            colorArray.push(colorItem.name);
        }
    }
    console.log(colorArray);

    // æmdres til samme som season og color med for of og array til at holde værdier
    let stiltypeInput = document.querySelector("#style1", "#style2", "#style3", "#style4", "#style5", "#style6", "#style7", "#style8", "#style9", "#style10", "#style11", "#style12", "#style13", "#style14");
    // æmdres til samme som season og color med for of og array til at holde værdier
    let categoryInput = document.querySelector("#category1", "#category2", "#category3", "#category4", "#category5");

    const newToej = {
        img: imgInput.src,
        name: nameInput.value,
        keywords: {
            season: seasonArray.toString(),
            color: colorArray.toString(),
            stiltype: stiltypeInput.value
        },
        category: categoryInput.value
    };
    _clothes.push(newToej);
    console.log(newToej);
    // await updateJSONBIN(_clothes);
    // appendBasisLager(_clothes);
}

function previewImage(file, previewId) {
    if (file) {
        _selectedImgFile = file;
        let reader = new FileReader();
        reader.onload = event => {
            document.querySelector('#' + previewId).setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
    }
}


// Detail view
function showDetailView(name) {
    const cloth = _clothes.find(cloth => cloth.name == name);
    document.querySelector("#detailViewContainer").innerHTML = /*html*/`
        <article>
            <img src="${cloth.img}">
            <h2>${cloth.name}</h2>
        </article>
    `;
    navigateTo("detailView");
}


/*search function*/
function search(value) {
    value = value.toLowerCase();
    console.log(value);

    const results = [];
    for (const cloth of _clothes) {
        const name = cloth.name.toLowerCase();

        if (name.includes(value)) {
            results.push(cloth);
        }
    }
    console.log(results);
    appendClothes(results);
};

/*create new profile
function newProfile() {
    let brugerNavn = document.querySelector('#brugerNavn');
    let stilTyper = document.querySelector('#stilTyperCheck');
    let mail = document.querySelector('#mail');
    let kode = document.querySelector('#kode');
    let gentagKode = document.querySelector('#gentagKode');
    //fødselsdag

    if (brugerNavn.value && stilTyper.value && mail.value && kode.value && gentagKode.value) {
        let newProfile = {
            brugerNavn: brugerNavn.value,
            stilTyper: stilTyper.value,
            mail: mail.value,
            kode: kode.value,
            gentagKode: gentagKode.value
        };
        console.log(newProfile);
        _basisLager.push(newProfile);
        appendProfile(_basisLager);
        navigateTo("slutGuide");
    } else {
        alert("udfyld alle felter!")
    }
}*/

// Update JSONBin

async function updateJSONBIN(toej) {
    const response = await fetch(_baseUrl, {
        method: "PUT",
        headers: _headers,
        body: JSON.stringify(toej)
    });
    const result = await response.json();
    console.log(result);
    //updating the DOM with the new fetched clothes
    appendClothes(result);
}

let _selectedStyle;

function seasonSelected(value) {
    console.log(value);
}

function styleSelected(value) {
    console.log(value);
    _selectedStyle = value.toLowerCase();
}

function colorSelected(value) {
    console.log(value);

    const item = _clothes.find(item => {
        console.log(item);
        if (item.keywords.color.includes(value) && item.keywords.style.includes(_selectedStyle)) {
            return item;
        }
    });
    console.log(item);
}