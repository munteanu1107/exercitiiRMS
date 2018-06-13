window.onload = (function() {

    var numbers = [0, 1];
    var output = [];
    // var initialStuff = [];
    var len = 3;

    function getAllPermutations(size) {

        function getRPermutation(size, initialStuff) {
            if (initialStuff.length >= size) {
                output.push(initialStuff);
            } else {
                for (var i = 0; i < numbers.length; ++i) {
                    getRPermutation(size, initialStuff.concat(numbers[i]));
                }
            }
        }

        getRPermutation(size, [])
    }

    getAllPermutations(len);

    console.log(output);
}());