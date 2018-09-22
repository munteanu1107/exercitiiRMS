var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", secondSolution);

function secondSolution() {
    var givenNumber = (document.getElementById("palindrom").value - 0);
    var initialNumber = givenNumber;
    var newNumber = 0;
    var currentNumber = 0;

    while(givenNumber !== 0) {
        currentNumber = givenNumber % 10;
        newNumber = newNumber * 10 + currentNumber;
        givenNumber = parseInt(givenNumber / 10);
    }

    if(newNumber === initialNumber) {
        return document.getElementsByClassName("result")[0].innerHTML = "Numarul " + initialNumber + " este palindrom!";
    } else {
        return document.getElementsByClassName("result")[0].innerHTML = "Numarul " + initialNumber + " nu este palindrom!";
    }
}