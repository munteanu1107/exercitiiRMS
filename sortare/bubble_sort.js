var executeVerification = document.getElementById("js-bubble-sort");

function bubbleSort() {

    var arrayOfNumbers = [1, 4, 6, 2, 9, 3, 5];
    var modified;

    for(var i = 0; i < (arrayOfNumbers.length - 1); i++) {
        modified = false;

        for(var j = 0; j < (arrayOfNumbers.length - 1); j++) {

            if(arrayOfNumbers[j] > arrayOfNumbers[j + 1]) {
                var keepTemp = arrayOfNumbers[j];
                arrayOfNumbers[j] = arrayOfNumbers[j + 1];
                arrayOfNumbers[j + 1] = keepTemp;
                modified = true;
            }

        }

        if(!modified) {
            break;
        }
    }
    console.log(arrayOfNumbers);
}

executeVerification.addEventListener("click", bubbleSort);