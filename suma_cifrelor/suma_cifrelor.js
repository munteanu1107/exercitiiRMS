var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", secondSolution);

function verifyLengthNumber() {
    var givenNumber = document.getElementById("number").value;
    var numberToString = givenNumber + "";
    var result = 0;
    for(var i = 0; i < numberToString.length; i++) {
        result += (numberToString[i] - 0);

        console.log(result)
    }
}

function secondSolution() {
    var givenNumber = document.getElementById("number").value
    var x = (document.getElementById("number").value - 0);
    var lastNumb = 0;
    var sum = 0;

    while(x !== 0) {        // Cat timp x este diferit de 0
        lastNumb = x % 10;  // Luam ultima cifra din coada numarului dat cu modul de 10 din nr. dat
        sum += lastNumb;    // Il adunam in variabila sum
        x = parseInt(x / 10); // dupa care il taiam din coada vechiului numar (par sint returneaza numarul intreg, altfel va da cu virgula :P
    }

    return document.getElementsByClassName("result")[0].innerHTML = "Suma cifrelor " + givenNumber + " este " + sum; // returnam valoarea

}