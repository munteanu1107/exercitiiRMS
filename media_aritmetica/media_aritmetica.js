var executeVerification = document.getElementById("js-verifica-numar");

// am luat numarul de la tastatura si l-am spart in cifre pe care le-am introdus pe rand intr-un veector

function verifyNumber() {

    var arrayOfNumbers = [1, 2, 8, 6, 3];
    var total = 0
    var arithmeticMean;


    for(var i = 0; i < arrayOfNumbers.length; i++) {
        total += arrayOfNumbers[i];
    }

    arithmeticMean = total / arrayOfNumbers.length;

   return document.getElementsByClassName("result")[0].innerHTML = "Media aritmetica este: " + arithmeticMean;
}

executeVerification.addEventListener("click", verifyNumber);