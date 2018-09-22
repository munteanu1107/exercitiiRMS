window.onload = (function() {
    var vector = [1, 5, 78, 65, 25, 43, 2, 14, 2, 53, 1, 2];

    var i = 0;
    function findNumber(array, n) {

        if(!array.length) {
            return;
        }

        if(array[array.length - 1] === n) {
            i++
            console.log(i)
        }

        array.pop();

        findNumber(array, n);

        return i;
    }

    findNumber(vector, 2);
}());