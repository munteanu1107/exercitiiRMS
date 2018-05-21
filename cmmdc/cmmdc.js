var executeVerification = document.getElementById("js-verifica-numar");

// VERIFICA REZULTATUL IN CONSOLE!!!!

function verifyNumber() {

    var number1 = (document.getElementById("number1").value - 0); // numar1 citit de la tastatura
    var number2 = (document.getElementById("number2").value - 0); // numar2 citit de la tastatura
    var cmmdc;

    if((number1 === 0 || number2 === 0) || (number1 === 1 || number2 === 1)) { //numerele trebuie sa fie diferite de 0
        return document.getElementsByClassName("result")[0].innerHTML = "introdu numere mai mari ca 1"
    }

    if(number1 < number2) {
        var intermediare = number1; // valoare intermediara ce retine valoarea numarului1
        number1 = number2; // numarul1 devine numarul2 iar
        number2 = intermediare; //numarul2 devine numarul1
    }

    var rest = number1 % number2 // se obtine restul impartirii numerelor
    while(rest !== 0) { // cat timp restul este diferit de 0
        number1 = number2; // numarul1 ia valoarea numarului2
        number2 = rest;  // iar numarul2 ia valoarea restului ca mai apoi
        rest = number1 % number2; // numarul2 care este acum asignat numarului1 sa fie imparit la restul anterior asignat numarului2
    }

   cmmdc = number2;

   return document.getElementsByClassName("result")[0].innerHTML = "Cmmdc este: " + cmmdc
}

executeVerification.addEventListener("click", verifyNumber);