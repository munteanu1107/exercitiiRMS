var executeVerification = document.getElementById("js-verifica-numar");

// VERIFICA REZULTATUL IN CONSOLE!!!!

function verifyNumber() {
    var numberToBeDisplayed = document.getElementById("number").value;

    var number = (document.getElementById("number").value - 0); // numar citit de la tastatura
    var divisor = 3;    // primul posibil divizor comun este 2
    var power = 0;      //p este initializat cu 0, pentru ca de fiecare data cand se reia while sa se poata determina puterea la care apare factorul prim
    var arrayOfPrimeFactors = [];
    var divisibleByTwo;


    while(number > 1) { // se determina daca numarul introdus are divizori proprii

        while(number % 2 === 0) {
            power++
            number = number / 2;

            divisibleByTwo = (power > 1 ? "2 ^ " + power : "2");
        }
        power = 0

        while(number % divisor === 0) {
            power++;
            number = number / divisor;
        }

        if(power > 0) {
            arrayOfPrimeFactors[arrayOfPrimeFactors.length] = divisor + (power > 1 ? " ^ " + power : "");
            console.log(arrayOfPrimeFactors)
        }

        divisor += 2;

    }

    if(divisibleByTwo) {
        arrayOfPrimeFactors[arrayOfPrimeFactors.length] = divisibleByTwo;
    }

    if(arrayOfPrimeFactors.length > 1) {
        var i = 0;
        var result = "Factorii primi ai numarului " + numberToBeDisplayed + " sunt: "

        while (i < arrayOfPrimeFactors.length) {
            result += arrayOfPrimeFactors[i]

            i++;

            if((i > 0) && (i < arrayOfPrimeFactors.length)) {
                result += " * "
            }
        }
    } else {
        var result = "Factorii primi ai numarului " + numberToBeDisplayed + " sunt: " + arrayOfPrimeFactors[0]
    }

    console.log(result)


}
executeVerification.addEventListener("click", verifyNumber);