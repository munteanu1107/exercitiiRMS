var executeVerification = document.getElementById("js-verifica-numar");

// am luat numarul de la tastatura si l-am spart in cifre pe care le-am introdus pe rand intr-un veector

function verifyNumber() {

    var number = (document.getElementById("number").value - 0);
    var lastNumber = 0;
    var arrayOfNumbers = [];
    var max = 0;
    var min = 0;

    while(number >= 0) {
        lastNumber = number % 10;
        arrayOfNumbers[arrayOfNumbers.length] = lastNumber;
        number = parseInt(number/10);

        if(number === 0) {
            arrayOfNumbers[arrayOfNumbers.length] = 0;
            break;
        }
    }

    for(var i = 0; i <= arrayOfNumbers.length; i++) {
        max < arrayOfNumbers[i] ? max = arrayOfNumbers[i] : max;
        min > arrayOfNumbers[i] ? min = arrayOfNumbers[i] : min;
    }

   return document.getElementsByClassName("result")[0].innerHTML = "Cea mai mica cifra din numar este " + min + " iar cea mai mare " + max;
}

executeVerification.addEventListener("click", verifyNumber);