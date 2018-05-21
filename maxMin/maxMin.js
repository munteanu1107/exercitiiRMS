var executeVerification = document.getElementById("js-verifica-numar");

// am luat numarul de la tastatura si l-am spart in cifre pe care le-am introdus pe rand intr-un veector

function verifyNumber() {

    var arrayOfNumbers = [1, 2, 8, 6, 3];
    var max = 0;
    var min = 0;

    for(var i = 0; i <= arrayOfNumbers.length; i++) {
        if(max < arrayOfNumbers[i]) {
            max = arrayOfNumbers[i];
        }

        if(arrayOfNumbers[i] < arrayOfNumbers[i + 1]) {
            min = arrayOfNumbers[i]
        }
        max < arrayOfNumbers[i] ? max = arrayOfNumbers[i] : max;
        arrayOfNumbers[i] < arrayOfNumbers[i + 1] ? min = arrayOfNumbers[i] : min;
    }

   return document.getElementsByClassName("result")[0].innerHTML = "Cea mai mica cifra din numar este " + min + " iar cea mai mare " + max;
}

executeVerification.addEventListener("click", verifyNumber);