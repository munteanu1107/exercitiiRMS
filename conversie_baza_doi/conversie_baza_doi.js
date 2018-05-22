var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", secondSolution);

function secondSolution() {
    var givenNumber = (document.getElementById("number").value - 0);

    // var binaryStringNumber = '';
    // var reversedStringNumber = '';
    var binaryArrayNumbers = [];
    var reversedArrayNumbers = [];

    while(givenNumber !== 0) {
        binaryArrayNumbers.push(givenNumber % 2);
        givenNumber = parseInt(givenNumber / 2);
    }

    for (var i = binaryArrayNumbers.length - 1; i >= 0; i--) {
        reversedArrayNumbers.push(binaryArrayNumbers[i]);
    }

    console.log(reversedArrayNumbers)

    return document.getElementsByClassName("result")[0].innerHTML = "Reprezentarea in baza 2 a numarului este: " + reversedArrayNumbers;
}