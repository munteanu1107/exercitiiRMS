var executeVerification = document.getElementById("js-verifica-numar");

    // Verifica in console

function findCommonElements() {
    var arrayOne = [2, 3, 1, 4, 7, 5, 6, 8];
    var arrayTwo = [11, 5, 8, 12, 9, 15, 1];
    var commonElements = [];
    var hashMap = {};

    maxL = Math.max(arrayOne.length, arrayTwo.length);

    for(var i = 0; i < maxL; i++) {

        if (i < arrayOne.length) {
            if(hashMap[arrayOne[i]]) {
                hashMap[arrayOne[i]] += 1;
            } else {
                hashMap[arrayOne[i]] = 1;
            }
        }

        if (i < arrayTwo.length) {
            if(hashMap[arrayTwo[i]]) {
                hashMap[arrayTwo[i]] += 1;
            } else {
                hashMap[arrayTwo[i]] = 1;
            }
        }

    }

    for(var key in hashMap) {
        hashMap[key] > 1 ? commonElements[commonElements.length] = parseInt(key) : commonElements;
    }

    console.log(arrayOne);
    console.log(arrayTwo);
    console.log("Elemente comune: ", commonElements);

    return commonElements;
}

executeVerification.addEventListener("click", findCommonElements);