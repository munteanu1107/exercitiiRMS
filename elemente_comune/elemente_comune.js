var executeVerification = document.getElementById("js-verifica-numar");

    // Verifica in console

function findCommonElements() {
    var arrayOne = [2, 3, 1, 4, 7, 5, 6, 8, 30, 30];
    var arrayTwo = [11, 5, 8, 12, 9, 15, 1];
    var commonElements = [];
    var hashMap = {};

    // for(var i = 0; i < arrayOne.length; i++) {
    //     for(var j = 0; j < arrayTwo.length; j++) {
    //         if(arrayOne[i] === arrayTwo[j]) {
    //             commonElements[commonElements.length] = arrayOne[i]
    //         }
    //     }
    // }

    for(var i = 0; i < arrayOne.length; i++) {
        if (hashMap[arrayOne[i]]) {
            hashMap[arrayOne[i]].count++;
            if (hashMap[arrayOne[i]].v.indexOf("A") == -1) {
                hashMap[arrayOne[i]].v += "A";
            }
        } else {
            hashMap[arrayOne[i]] = {};
            hashMap[arrayOne[i]].count = 1;
            hashMap[arrayOne[i]].v = "A";
        }

    }

    for(var i = 0; i < arrayTwo.length; i++) {
        if (hashMap[arrayTwo[i]]) {
            hashMap[arrayTwo[i]].count++;
            if (hashMap[arrayTwo[i]].v.indexOf("B") == -1) {
                hashMap[arrayTwo[i]].v += "B";
            }
        } else {
            hashMap[arrayTwo[i]] = {};
            hashMap[arrayTwo[i]].count = 1;
            hashMap[arrayTwo[i]].v = "B";
        }

    }

    for(var key in hashMap) {
        if (hashMap[key].count > 1 &&  hashMap[key].v.indexOf("A") != -1 && hashMap[key].v.indexOf("B") != -1){
            commonElements.push(key);
        }

        if(hashMap[key].v.indexOf("B") == -1) { // care sunt in A si nu sunt in B
            // console.log(key)
        }

        if(hashMap[key].v.indexOf("A") == -1) { // care sunt in B si nu in A
            // console.log(key)
        }

        if(hashMap[key].v.indexOf("A") > -1 && hashMap[key].v.indexOf("B") > -1) { //
            console.log(key)
        }
    }

    console.log(arrayOne);
    console.log(arrayTwo);
    console.log("Elemente comune: ", commonElements);

    return commonElements;
}

executeVerification.addEventListener("click", findCommonElements);