var executeVerification = document.getElementById("js-verifica-numar");

//executeVerification.addEventListener("click", findPalindromeInArray);
findPalindromeInArray();
var givenArray = [2, 2, 3, 3, 2, 2, 5, 5, 2, 2];
//isPalindrom(givenArray, 0, 5);

function isPalindrom(a, index1, index2) {
    var isPalindrom = true;

        for (var i = index1; i < index2; i++) {
            if (a[i] != a[index2 - (i-index1)]) {
                isPalindrom = false;
            }
        }

    return isPalindrom;
}

function findPalindromeInArray() {
    var givenArray = [2, 2, 3, 3, 2, 2, 5, 5, 2, 2];
    var isPalindrome = [];
    var reversedArray = [];
    var palindrome = true;

    var s = "";
    for (var i = 0; i < givenArray.length; i++) {

        for(var j = i+1; j < givenArray.length; j++) {
            if (isPalindrom(givenArray, i, j)) {
                s="";
                for (var k = i; k <= j; k++) {
                    s += givenArray[k];
                }
                console.log(s);
            }
        }
    }



    // for (var i = 0; i < givenArray.length; i++) {
    //     isPalindrome = [];

    //     for(var j = i; j < givenArray.length; j++) {
    //         isPalindrome[isPalindrome.length] = givenArray[j];

    //         if(isPalindrome.length > 1) {
    //             reversedArray = [];
    //             for(var x = isPalindrome.length - 1; x >= 0; x--) {
    //                 reversedArray[reversedArray.length] = isPalindrome[x];
    //             }
    //             var p = 0;
    //             palindrome = true;
    //             while(p < isPalindrome.length){
    //                 if(isPalindrome[p] !== reversedArray[p]) {
    //                     palindrome = false;
    //                 }
    //                 p++;
    //             }
    //             if(palindrome) {
    //                 console.log(reversedArray);
    //             }

    //         }
    //     }
    // }

}
