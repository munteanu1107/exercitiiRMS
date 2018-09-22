var executeVerification = document.getElementById("js-verifica-numar");

// am luat numarul de la tastatura si l-am spart in cifre pe care le-am introdus pe rand intr-un veector

function verifyNumber() {

    var arrayOfNumbers = [1, 2, 2, 4, 4, 4, 4, 9, 9, 9, 9, 9, 7, 7, 7];
    var longestSequence = [];
    var maxContor = 0;
    var contor = 1;
    var startPosition = 0;
    var val = 0;
    var i = 0;
    var hash = {};

    while(i <= arrayOfNumbers.length) {
        if(arrayOfNumbers[i] === arrayOfNumbers[i + 1]) {
            contor++;
            if(contor > maxContor) {
                maxContor = contor;
                hash.val = val;
                hash.startPosition = startPosition;
            }
        } else {
            contor = 1;
            startPosition = i + 1;
            val = arrayOfNumbers[i + 1];
        }

        i++;
    }

    for(var j = hash.startPosition; j < (hash.startPosition + maxContor); j++) {
        longestSequence[longestSequence.length] = arrayOfNumbers[j];
    }

    console.log(longestSequence);

   return document.getElementsByClassName("result")[0].innerHTML = "Cea mai lunga secventa are valoare " + hash.val + ", start index " + hash.startPosition + ", iar vectorul [" + longestSequence + "]";
}

executeVerification.addEventListener("click", verifyNumber);