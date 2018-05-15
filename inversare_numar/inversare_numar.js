var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", inversareNumar);

function inversareNumar() {
    var number = document.getElementById("number").value;
    var currentVal = 0;
    var x = 0;

    while(number !== 0) {
        currentVal = number % 10;
        x = x * 10 + currentVal;
        number = parseInt(number / 10);
    }

    return document.getElementsByClassName("result")[0].innerHTML = "Numarul inversat este " + x;
}
