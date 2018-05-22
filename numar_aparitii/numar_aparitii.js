var executeVerification = document.getElementById("js-verifica-numar");

function verifyNumber() {

    var arrayOfNumbers = [2, 3, 1, 2, 3, 4, 1, 2, 1, 7, 1, 5, 3, 4, 6];
    var hashMap = {};
    var contor = 1;

    for(var i = 0; i < arrayOfNumbers.length; i++) {
        if(hashMap[arrayOfNumbers[i]]) {
            hashMap[arrayOfNumbers[i]] += 1;
        } else {
            hashMap[arrayOfNumbers[i]] = 1
        }
    }

    console.log(hashMap);

   return document.getElementsByClassName("result")[0].innerHTML = JSON.stringify(hashMap)
}

executeVerification.addEventListener("click", verifyNumber);