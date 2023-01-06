
var input1 = [10, 20, 20, 10, 10, 30, 50, 10, 20]
var input2 = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]
var input3 = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]
var input4 = [1, 1, 4, 5, 5, 6, 6, 2, 2, 3, 7, 2, 1, 4]

countSale(input1)

function countSale(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                count++;
                array.splice(j, 1)
                break;
            }
        }
    }
    console.log(count);
}

