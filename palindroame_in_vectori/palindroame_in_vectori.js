var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", findPalindromeInArray);

function findPalindromeInArray() {
    var vector = ["ana", "casca", "tren", "unu", "calendar", "reper"];
    var arrayOfReversedElements = [];
    var commonElements = {};
    var result = "Elementele palindrome sunt: ";

    for(var i = 0; i < vector.length; i++) {
        var reversedElement = "";
        for(var j = vector[i].length - 1; j >= 0; j--) {
            reversedElement += vector[i][j];
        }

        arrayOfReversedElements[arrayOfReversedElements.length] = reversedElement;
        reversedElement = "";
    }

    var maxL = Math.max(vector.length, arrayOfReversedElements.length);

    for(var x = 0; x < maxL; x++) {
        if(x < vector.length) {
            if(commonElements[vector[x]]) {
                commonElements[vector[x]] += 1;
            } else {
                commonElements[vector[x]] = 1;
            }
        }

        if(x < arrayOfReversedElements.length) {
            if(commonElements[arrayOfReversedElements[x]]) {
                commonElements[arrayOfReversedElements[x]] += 1;
            } else {
                commonElements[arrayOfReversedElements[x]] = 1;
            }
        }
    }

    for(var key in commonElements) {
        commonElements[key] > 1 ? result += key + " " : "";
    }

    return document.getElementsByClassName("result")[0].innerHTML = result;
}