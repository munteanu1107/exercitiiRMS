var executeVerification = document.getElementById("js-selection-sort");

function selectionSort() {

    var arrayOfNumbers = [1, 4, 6, 2, 9, 3, 5];
    var minIndex = 0;

    for(var i = 0; i < arrayOfNumbers.length - 1; i++) {
        minIndex = i;

        for(var j = i + 1; j < arrayOfNumbers.length; j++) {
            if(arrayOfNumbers[j] < arrayOfNumbers[minIndex]) {

                var keepTemp = arrayOfNumbers[i];
                arrayOfNumbers[i] = arrayOfNumbers[j];
                arrayOfNumbers[j] = keepTemp;
            }
        }
    }

    console.log(arrayOfNumbers)
}

executeVerification.addEventListener("click", selectionSort);