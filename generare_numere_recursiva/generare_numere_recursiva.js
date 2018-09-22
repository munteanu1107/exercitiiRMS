window.onload = (function() {

    var numbers = [0, 1];
    var output = [];
    var initialStuff = [];
    var len = 3;

    function getAllPermutations(size) {

        function getRPermutation(size, temporaryArray) {
            if (temporaryArray.length >= size) {
                output.push(temporaryArray);
            } else {
                for (var i = 0; i < numbers.length; ++i) {
                    getRPermutation(size, temporaryArray.concat(numbers[i]));
                }
            }
        }

        getRPermutation(size, initialStuff);
    }

    getAllPermutations(len);


    console.log(output);
}());