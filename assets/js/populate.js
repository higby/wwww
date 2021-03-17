populate();

function populate() {
    cards.sort(function(a, b) {
        return a.name.localeCompare(b.name)
    });
    var types = [];
    for (var i = 0; i < cards.length; i++) {
        types.push(cards[i].type);
    }
    types = Array.from(new Set(types));
    typeAmount = types.length;
    for (var i = 0; i < typeAmount; i++) {
        if (document.getElementById(types[i])) {
            var cardList = document.createElement("DIV");
            cardList.setAttribute("class", "cardList");
            cardList.setAttribute("id", types[i] + "List");
            document.getElementById(types[i]).insertAdjacentElement('afterend', cardList);
            for (var x in cards) {
                if (cards[x].type == types[i]) {
                    if (cards[x].amount) {
                        for (var g = 0; g < cards[x].amount; g++) {
                            var card = document.createElement("DIV");
                            card.setAttribute("class", "card");
                            card.setAttribute("id", cards[x].name + "-" + (g + 1));
                            document.getElementById(types[i] + "List").appendChild(card);
                            var img = document.createElement("IMG");
                            img.setAttribute("src", "../assets/images/cards/sliver/sliver-" + cards[x].name.toLowerCase() + "-" + (g + 1) + ".jpeg");
                            document.getElementById(cards[x].name + "-" + (g + 1)).appendChild(img);
                            var text = document.createElement("SPAN");
                            text.innerHTML = cards[x].name;
                            document.getElementById(cards[x].name + "-" + (g + 1)).appendChild(text);
                        }
                    } else {
                        var card = document.createElement("DIV");
                        card.setAttribute("class", "card");
                        card.setAttribute("id", cards[x].name);
                        document.getElementById(types[i] + "List").appendChild(card);
                        var img = document.createElement("IMG");
                        img.setAttribute("src", "../assets/images/cards/sliver/" + cards[x].name.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase() + ".jpeg");
                        document.getElementById(cards[x].name).appendChild(img);
                        var divide = document.createElement("BR"); //Creat text tag
                        document.getElementById(cards[x].name).appendChild(divide);
                        var text = document.createElement("SPAN");
                        text.innerHTML = cards[x].name;
                        document.getElementById(cards[x].name).appendChild(text);
                    }
                }
            }
        } else {
            console.error("Card type " + types[i] + " is missing either a header or is incorrect");
        }
    }
}