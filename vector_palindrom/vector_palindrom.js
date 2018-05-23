var executeVerification = document.getElementById("js-verifica-numar");

executeVerification.addEventListener("click", verifyIfGivenArrayIsPalindrome);

function verifyIfGivenArrayIsPalindrome() {
    var vector = [1, 2, 3, 4, 3, 2, 1];
    var reversedVector = [];
    var contor = 0;
    var isPalindrome = true;

    for(var i = vector.length - 1; i >= 0; i--) {
        reversedVector[reversedVector.length] = vector[i];
    }

    for(var j = 0; j < vector.length; j++) {
        if(vector[j] !== reversedVector[j]) {
            isPalindrome = false;
        }
    }

    return document.getElementsByClassName("result")[0].innerHTML = isPalindrome ? "Vectorul este palindrom" : "Vectorul nu este palindrom";
}