var executeVerification = document.getElementById("js-insertion-sort");

function insertionSort() {

    var arrayOfNumbers = [1, 4, 6, 2, 9, 3, 5];
    var currentEl;

    for(var i = 1; i < arrayOfNumbers.length; i++) {
        currentEl = arrayOfNumbers[i];

        var j = (i - 1);

        while(j >= 0 && arrayOfNumbers[j] > currentEl) {
            var keepTemp = arrayOfNumbers[j];
            arrayOfNumbers[j] = currentEl;
            arrayOfNumbers[j + 1] = keepTemp;

            j--;
        }

    }
    console.log(arrayOfNumbers)
}

executeVerification.addEventListener("click", insertionSort);