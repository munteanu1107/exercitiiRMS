var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", convertFromBinaryToHex);

function convertFromBinaryToHex() {
    var givenNumber = (document.getElementById("number").value - 0);

    var lastNumber = 0;
    var hexNumber = 0;
    var contor = 0;

    while(givenNumber != 0) {
        lastNumber = givenNumber % 10;
        hexNumber += lastNumber * Math.pow(2, contor);
        contor++;
        givenNumber = parseInt(givenNumber/10);
    }


    return document.getElementsByClassName("result")[0].innerHTML = "Reprezentarea din baza 2 in baza 10 este: " + hexNumber;
}

