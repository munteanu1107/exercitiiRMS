    var executeVerification = document.getElementById("js-verifica-numar");

    function verifyNumber() {
        var insertedNumber = document.getElementById("primeNumber").value;

        if((insertedNumber - 0) === 2) {
            document.getElementsByClassName("result")[0].innerHTML = "Numarul " + insertedNumber + " este prim";

            console.log("Numarul " + insertedNumber + " este prim");
        }

        for(var i = 2; i < insertedNumber; ++i) {
            if(insertedNumber % i === 0) {
                console.log("Numarul " + insertedNumber + " nu este prim");

                return document.getElementsByClassName("result")[0].innerHTML = "Numarul " + insertedNumber + " nu este prim";
            }
            console.log("Numarul " + insertedNumber + " este prim");

            return document.getElementsByClassName("result")[0].innerHTML = "Numarul " + insertedNumber + " este prim";
        }
    }

    executeVerification.addEventListener("click", verifyNumber);