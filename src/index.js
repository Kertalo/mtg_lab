import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

document.addEventListener("DOMContentLoaded", setup)
document.getElementById("searchCards").addEventListener('click', search)

const mtg = new Mtg()

function setup() {
    loadCards()
    //new ColorStats().buildStats(document.getElementById("colorStats"));
    new ManaCostStats().buildStats(document.getElementById("manaStats"));
}

function showCard(item) {
    const content = document.getElementById("content");
    const img = document.createElement('img');
    img.src = item.getAttribute('img');
    img.width="223"
    img.height="310"
    content.innerHTML = '';
    content.appendChild(img);
}

function search() {
    const text = document.getElementById("searchText");
    loadCards(text.value)
}

function loadCards(cardName = "") {
    mtg.loadCards(cardName)
        .then((cards) => {
            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');

            cards.forEach(card => {
                if (card.multiverseid != undefined)
                {
                    const listItem = document.createElement('li');
                    listItem.id = card.multiverseid;
                    listItem.innerHTML = card.name;
                    listItem.setAttribute('img', card.imageUrl);
                    listItem.addEventListener('click', () => {
                        showCard(listItem)
                    });
                    list.appendChild(listItem)
                }
            })
            menu.innerHTML = ''
            menu.appendChild(list);
        })
}