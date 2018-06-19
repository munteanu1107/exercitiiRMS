window.onload = (function() {
    var val = 5;

    function calculateFactorial(num) {
        if(num === 0) {
            return 1;
        }
        return num * calculateFactorial(num -1);
    }

    console.log(calculateFactorial(val));
}())