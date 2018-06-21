window.onload = (function() {
    var array = [1, 5, 6, 8, 9, 23, 26, 48, 56, 57, 58, 63, 70];

    function binarySearch(num, arr, newArray) {
        var halfPosition = Math.floor((arr.length - 1) / 2);
        var newArray;


        if(num === arr[halfPosition]) {
            return console.log("Found " + arr[halfPosition] + " in given array!");

        } else if(num > arr[halfPosition]) {
            newArray = arr.slice(halfPosition+1, arr.length);

        } else if (num < arr[halfPosition]) {
            newArray = arr.slice(0, halfPosition);
        }

        if(newArray.length) {
            binarySearch(num, newArray)
        }
    }

    binarySearch(70, array, []);
}());


