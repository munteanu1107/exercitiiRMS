var executeVerification = document.getElementById("js-verifica-numar");

// am luat numarul de la tastatura si l-am spart in cifre pe care le-am introdus pe rand intr-un veector

function verifyNumber() {
    var number = (document.getElementById("number").value - 0);
    var arrayOfNumbers = [1, 2, 8, 6, 3, 7, 9, 5];
    var newArray = [];

    for(var i = 0; i <= arrayOfNumbers.length; i++) {
        if(arrayOfNumbers[i] < number) {
            newArray[newArray.length] = arrayOfNumbers[i];
        }
    }

   return document.getElementsByClassName("result")[0].innerHTML = "Noul array este [" + newArray + " ]";
}

executeVerification.addEventListener("click", verifyNumber);