var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", secondSolution);

function secondSolution() {
    var givenNumber = (document.getElementById("number").value - 0);

    var binaryStringNumber = '';
    var reversedStringNumber = '';

    while(givenNumber !== 0) {
        binaryStringNumber += (givenNumber % 2);
        givenNumber = parseInt(givenNumber / 2);
    }

    for (var i = binaryStringNumber.length - 1; i >= 0; i--) {
        reversedStringNumber += binaryStringNumber[i];
    }

    return document.getElementsByClassName("result")[0].innerHTML = "Reprezentarea in baza 2 a numarului este: " + reversedStringNumber;
}