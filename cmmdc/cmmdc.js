var executeVerification = document.getElementById("js-verifica-numar");

function findCmmdc() {
    var number1 = (document.getElementById("number1").value - 0);
    var number2 = (document.getElementById("number2").value - 0);

    var primeFactorsNumber1 = findPrimeFactors(number1);
    var primeFactorsNumber2 = findPrimeFactors(number2);

    var cmmdc = 1;

    for(var i = 0; i < primeFactorsNumber1.length; i++) {
        for(var j = 0; j < primeFactorsNumber2.length; j++) {
            if(primeFactorsNumber1[i].factor === primeFactorsNumber2[j].factor) {
                if(primeFactorsNumber1[i].power < primeFactorsNumber2[j].power) {
                    cmmdc *= Math.pow(primeFactorsNumber1[i].factor, primeFactorsNumber1[i].power);
                } else {
                    cmmdc *= Math.pow(primeFactorsNumber2[j].factor, primeFactorsNumber2[j].power);
                }
            }
        }
    }

    return document.getElementsByClassName("result")[0].innerHTML = "Cmmdc este: " + cmmdc;
}

function findPrimeFactors(num) {
    var number = num;
    var divisor = 3;
    var power = 0;
    var arrayOfPrimeFactors = [];
    var primeFactors = {};
    var divisibleByTwo;

    if(number < 2) {
        return console.error("Incorrect number (Number should be greater than 1) (*_*) ");
    }

    while(number > 1) {

        while(number % 2 === 0) {
            power++;
            number = number / 2;

            primeFactors.factor = 2;
            primeFactors.power = power;
        }

        if(power > 0) {
            arrayOfPrimeFactors[arrayOfPrimeFactors.length] = primeFactors;
            primeFactors = {};
        }

        power = 0;

        while(number % divisor === 0) {
            power++;
            number = number / divisor;
            primeFactors.factor = divisor;
            primeFactors.power = power;
        }

        if(power > 0) {
            arrayOfPrimeFactors[arrayOfPrimeFactors.length] = primeFactors;
            primeFactors = {};
        }

        divisor += 2;

    }

    return arrayOfPrimeFactors;
}

executeVerification.addEventListener("click", findCmmdc);