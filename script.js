// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
function newdiv(tagname, atname, atvalue) {
    let div = document.createElement(tagname);
    div.setAttribute(atname, atvalue);
    return div;
}

let container = newdiv("div", "class", "container");
let colum = newdiv("div", "class", "col-md")
let row = newdiv("div", "class", "row")
let header = newdiv("section", "class", "header")

let h1 = document.createElement("h1");
h1.setAttribute("class", "title");
h1.innerHTML = `Word Search DictionarY`;

let br1 = document.createElement("br");

let section = newdiv("section", "class", "search")
let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "word");
input.setAttribute("placeholder", "Search It Here")
input.setAttribute("required", "");

let butn = document.createElement("button");
butn.setAttribute("class", "btn")
butn.setAttribute("id", "main")
butn.innerHTML = `<i class="fa fa-search fa-2x"></i>`;
butn.addEventListener('click', search);

let br2 = document.createElement("br");

let box = newdiv("section", "class", "box");
let div = newdiv("div", "class", "box-head");
//
let dlist = document.createElement("dl");
let dt = document.createElement("dt");
let dd = document.createElement("dd");
//
let pos = newdiv("h4", "class", "pos");
let definition = newdiv("span", "class", "def");

async function search() {
    let a = document.getElementById("word").value; // getting name from input box
    let url = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${a}`);
    let news = await url.json();
    console.log(news);
    try {
        let title = news.title;
        let errorMessage = news.message;
        let caps = a.toUpperCase();
        let emptyString = "";
        if (a == emptyString) {
            alert(`Type A Word To Search`);
        } else if (title === "No Definitions Found") {
            alert(errorMessage);
        } else if (a !== []) {
            for (var i = 0; i < news.length; i++) {
                if (((news[0].phonetics[0].text) != undefined) && ((news[0].phonetics[0].audio) != emptyString)) {
                    div.innerHTML = `<h2 class="c-title">${caps} <span class="phonetic">${news[0].phonetics[0].text}</span></h2>
                <audio controls><source src="${news[0].phonetics[0].audio}"></audio>`
                } else {
                    div.innerHTML = `<h2 class="c-title">${caps} <span class="phonetic">${news[0].phonetics[1].text}</span></h2>
                <audio controls><source src="${news[0].phonetics[1].audio}"></audio>`
                }
                for (var j = 0; j < (news[0].meanings).length; j++) {
                    //dt.innerHTML += `${news[i].meanings[j].partOfSpeech}`
                    // console.log(news[i].meanings[j].partOfSpeech);
                    pos.innerHTML += `${news[i].meanings[j].partOfSpeech}:`;
                    for (var k = 0; k < (news[i].meanings[j].definitions).length; k++) {
                        //dd.innerHTML += `${news[i].meanings[j].definitions[k].definition}`
                        definition.innerHTML += `${news[i].meanings[j].definitions[k].definition}`
                    }


                }
            }
        }
    } catch {
        //alert(`Error`);
    }
}
header.append(h1);
section.append(input, butn);
dlist.append(dt, dd);
box.append(div, pos, definition, dlist);
row.append(header, br1, section, br2, box);
colum.append(row);
container.append(colum);
document.body.append(container);
