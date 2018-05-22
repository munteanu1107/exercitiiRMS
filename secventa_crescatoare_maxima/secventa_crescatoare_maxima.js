var executeVerification = document.getElementById("js-verifica-numar");

function verifyNumber() {

    var arrayOfNumbers = [2, 3, 1, 2, 3, 4, 5, 3, 4,6];
    var longestSequence = [];
    var maxContor = 0;
    var contor = 1;
    var startPosition = 0;
    var val = 0;
    var i = 0;
    var hash = {};

    while(i <= arrayOfNumbers.length) {
        if(arrayOfNumbers[i] < arrayOfNumbers[i + 1]) {
            contor++;
            if(contor > maxContor) {
                maxContor = contor;
                hash.startPosition = startPosition;
            }
        } else {
            contor = 1;
            startPosition = i + 1;
            val = arrayOfNumbers[i + 1];
        }

        i++;
    }

    for(var j = hash.startPosition; j < hash.startPosition + maxContor; j++) {
        longestSequence[longestSequence.length] = arrayOfNumbers[j];
    }

    console.log(longestSequence);

   return document.getElementsByClassName("result")[0].innerHTML = "Cea mai lunga secventa are valoare " + hash.val + ", start index " + hash.startPosition + ", iar vectorul [" + longestSequence + "]";
}

executeVerification.addEventListener("click", verifyNumber);