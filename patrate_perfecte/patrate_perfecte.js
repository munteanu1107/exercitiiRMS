var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", firstSolution);

function firstSolution() {
    var givenNumber = (document.getElementById("number").value - 0);
    var perfectSqareNumbers = [];
    var currentNumber = 0;

    for(var i = givenNumber; i > 1; i--) {
        currentNumber = Math.sqrt(i);
        if(currentNumber % 1 === 0) {
            perfectSqareNumbers[perfectSqareNumbers.length] = i
        }
    }

    return document.getElementsByClassName("result")[0].innerHTML = "Numerele patrate perfecte mai mici ca nr. introdus sunt: " + perfectSqareNumbers;
}