var executeVerification = document.getElementById("js-insertion-sort");

function insertionSort() {

    var arrayOfNumbers = [1, 4, 6, 2, 9, 3, 5];
    var currentEl;
debugger;
    for(var i = 1; i < arrayOfNumbers.length; i++) { // plecand cu i de la pozitia 1

        currentEl = arrayOfNumbers[i]; // retin valoarea lui i
        var j = (i - 1); // al doilea loop va porni de la i - 1 pentru a verifica numerele anterioare celui de pe i

        while(j >= 0) { // cat timp j este mai mare sau egal cu 0
            if(arrayOfNumbers[j] > currentEl) { // daca numarul de pe j este mai mare ca numarul de pe i
                var keepTemp = arrayOfNumbers[j]; // retin numarul de pe j
                arrayOfNumbers[j] = currentEl; // lui j fac switch cu numarul mai mic de pe i
                arrayOfNumbers[j + 1] = keepTemp; // iar i ea valoarea lui j numarul mai mare
            }

            j--;
        }

    }
    console.log(arrayOfNumbers)
}

executeVerification.addEventListener("click", insertionSort);