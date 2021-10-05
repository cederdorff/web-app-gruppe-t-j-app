//json bin

let _toej = [];
let _toejId;
const _baseUrl = "https://api.jsonbin.io/v3/b/615ae0b84a82881d6c5a943b";
const _headers = {
    "X-Master-Key": "$2b$10$6CWwxJQJou9fkW/moxmTFe9J.KsWNUmFdERE4UtvbqZLmSfzkrxfm",
    "Content-Type": "application/json"
};

async function loadToej() {
    const url = _baseUrl + "/latest";
    const response = await fetch(url, {
        headers: _headers
    });
    const data = await response.json();
    console.log(data);
    _toej = data.record;
    appendBasisLager(_toej);
}

async function createToej() {
    showLoader(true);
    let imgInput = document.querySelector("#addImg");
    let nameInput = document.querySelector("#addName");

    let saesonInput = document.querySelector("#season1", "#season2", "#season3", "#season4");


    const colorItems = document.querySelectorAll("#add .farveFlex checked");
    console.log(colorItems);

    let stiltypeInput = document.querySelector("#style1", "#style2", "#style3", "#style4", "#style5", "#style6", "#style7", "#style8", "#style9", "#style10", "#style11", "#style12", "#style13", "#style14");

    let categoryInput = document.querySelector("#category1", "#category2", "#category3", "#category4", "#category5");


    const newToej = {
        img: imgInput.value,
        name: nameInput.value,
        season: saesonInput.value,
        color: colorInput.value,
        stiltype: stiltypeInput.value,
        category: categoryInput.value
    };
    _toej.push(newToej);
    // await updateJSONBIN(_toej);
    // appendBasisLager(_toej);
}

async function updateJSONBIN(toej) {
    const response = await fetch(_baseUrl, {
        method: "PUT",
        headers: _headers,
        body: JSON.stringify(toej)
    });
    const result = await response.json();
}