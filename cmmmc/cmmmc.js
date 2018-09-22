var executeVerification = document.getElementById("js-verifica-numar");

// cmmmmc = (a*b) / cmmdc

function verifyNumber() {

    var number1 = (document.getElementById("number1").value - 0);
    var number2 = (document.getElementById("number2").value - 0);
    var unchangedNo1 = number1;
    var unchangedNo2 = number2;
    var rest;
    var cmmmcd;

    if(number1 === 0 || number2 === 0) {
        return document.getElementsByClassName("result")[0].innerHTML = "introdu numere mai mari ca 0"
    }

    if(number1 < number2) {
        var interm = number1;
        number1 = number2;
        number2 = interm;
    }

    rest = number1%number2;

    while(rest !== 0) {
        number1 = number2
        number2 = rest;
        rest = number1 % number2;
    }

    cmmmcd = (unchangedNo1 * unchangedNo2) / number2;

    return document.getElementsByClassName("result")[0].innerHTML = "Cmmmc este: " + cmmmcd
}


executeVerification.addEventListener("click", verifyNumber);