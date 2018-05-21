var executeVerification = document.getElementById("js-verifica-numar");

// VERIFICA REZULTATUL IN CONSOLE!!!!

function verifyNumber() {

    var number1 = (document.getElementById("number1").value - 0); // numar1 citit de la tastatura
    var number2 = (document.getElementById("number2").value - 0); // numar2 citit de la tastatura

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

    console.log(number2);
}

function secondSolution() {
    var number1 = (document.getElementById("number1").value - 0); // numar1 citit de la tastatura
    var number2 = (document.getElementById("number2").value - 0); // numar2 citit de la tastatura

}
executeVerification.addEventListener("click", verifyNumber);