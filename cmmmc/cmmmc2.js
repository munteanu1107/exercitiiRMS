var executeVerification = document.getElementById("js-verifica-numar");

function findcmmmc() {
    var number1 = (document.getElementById("number1").value - 0);
    var number2 = (document.getElementById("number2").value - 0);

    var primeFactorsNumber1 = findPrimeFactors(number1);
    var primeFactorsNumber2 = findPrimeFactors(number2);
    var common = {};
    var cmmmc = 1

    maxL = Math.max(primeFactorsNumber1.length, primeFactorsNumber2.length);
    minL = Math.min(primeFactorsNumber1.length, primeFactorsNumber2.length);//sol 2

    if(primeFactorsNumber1.length < primeFactorsNumber2.length) {
        for(var i = 0; i < primeFactorsNumber1.length; i++) {
            if(common[primeFactorsNumber2[i].factor]) {
                if(primeFactorsNumber2[i].power > common[primeFactorsNumber2[i].power]) {
                    common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
                }
            } else {
                common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
            }

            if(common[primeFactorsNumber1[i].factor]) {
                if(primeFactorsNumber1[i].power > common[primeFactorsNumber1[i].factor]) {
                    common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
                }
            } else {
                common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
            }
        }

        for(var i = minL; i < maxL; i++) {
            if(common[primeFactorsNumber2[i].factor]) {
                if(primeFactorsNumber2[i].power > common[primeFactorsNumber2[i].power]) {
                    common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
                }
            } else {
                common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
            }

            if(common[primeFactorsNumber1[i].factor]) {
                if(primeFactorsNumber1[i].power > common[primeFactorsNumber1[i].factor]) {
                    common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
                }
            } else {
                common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
            }
        }
    } else {
        for(var i = 0; i < primeFactorsNumber2.length; i++) {
            if(common[primeFactorsNumber2[i].factor]) {
                if(primeFactorsNumber2[i].power > common[primeFactorsNumber2[i].power]) {
                    common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
                }
            } else {
                common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
            }

            if(common[primeFactorsNumber1[i].factor]) {
                if(primeFactorsNumber1[i].power > common[primeFactorsNumber1[i].factor]) {
                    common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
                }
            } else {
                common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
            }
        }

        for(var i = maxL; i < minL; i++) {
            if(common[primeFactorsNumber2[i].factor]) {
                if(primeFactorsNumber2[i].power > common[primeFactorsNumber2[i].power]) {
                    common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
                }
            } else {
                common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
            }

            if(common[primeFactorsNumber1[i].factor]) {
                if(primeFactorsNumber1[i].power > common[primeFactorsNumber1[i].factor]) {
                    common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
                }
            } else {
                common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
            }
        }
    }

    for(var key in common) {
        cmmmc *= Math.pow(key, common[key]);
    }

    //verific vectourl cu lungimea mai mare si merg de la minL pana la maxL

    //sol 1
    // for(var i = 0; i < maxL; i++) {
    //     if (i < primeFactorsNumber2.length) {
    //         if(common[primeFactorsNumber2[i].factor]) {
    //             if(primeFactorsNumber2[i].power > common[primeFactorsNumber2[i].power]) {
    //                 common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
    //             }
    //         } else {
    //             common[primeFactorsNumber2[i].factor] = primeFactorsNumber2[i].power;
    //         }
    //     }

    //     if (i < primeFactorsNumber1.length) {
    //         if(common[primeFactorsNumber1[i].factor]) {
    //             if(primeFactorsNumber1[i].power > common[primeFactorsNumber1[i].power]) {
    //                 common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
    //             }
    //         } else {
    //             common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
    //         }
    //     }
    // }
/*
    for(var i = 0; i < primeFactorsNumber1.length; i++) {
        common[primeFactorsNumber1[i].factor] = primeFactorsNumber1[i].power;
    }

    for(var j = 0; j < primeFactorsNumber2.length; j++) {
        // if(primeFactorsNumber2[j].factor == common.hasOwnProperty(primeFactorsNumber2[j].factor)) {
            if(common[primeFactorsNumber2[j].factor]) {
            if(primeFactorsNumber2[j].power > common[primeFactorsNumber2[j].power]) {
                common[primeFactorsNumber2[j].factor] = primeFactorsNumber2[j].power;
            }
        } else {
            common[primeFactorsNumber2[j].factor] = primeFactorsNumber2[j].power;
        }
    }
    */
    // var cmmmc = 1;

    // for(var i = 0; i < primeFactorsNumber1.length; i++) {
    //     for(var j = 0; j < primeFactorsNumber2.length; j++) {

    //         if(primeFactorsNumber1[i].factor === primeFactorsNumber2[j].factor) {
    //             if(primeFactorsNumber1[i].power > primeFactorsNumber2[j].power) {
    //                 cmmmc *= Math.pow(primeFactorsNumber1[i].factor, primeFactorsNumber1[i].power);
    //                 console.log(cmmmc);
    //             } else {
    //                 cmmmc *= Math.pow(primeFactorsNumber2[j].factor, primeFactorsNumber2[j].power);
    //                 console.log(cmmmc);
    //             }
    //         }
    //     }
    // }

    return document.getElementsByClassName("result")[0].innerHTML = "Cmmmc este: " + cmmmc;
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
        power = 0;
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

executeVerification.addEventListener("click", findcmmmc);