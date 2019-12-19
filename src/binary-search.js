/**
 *
 * @param {Array} array - an array of values each of which are passed into `f`
 * @param {Function} f - the evaluation function (should return a Number)
 * @param {Number} target - the target that we want to get closest to without going over
 * @returns{Number} - the value from the `array` that evaluates to a result that is
 *     closest to `target` without going over, or null if no valid value was found.
 */
function binarySearch(array, f, target) {
    let low = 0
    let high = array.length - 1
    while (low < high) {
        const mid = Math.ceil((low + high) / 2)
        if (f(array[mid]) <= target) {
            low = mid
        } else {
            high = mid - 1
        }
    }
    return array[low] <= target ? array[low] : null
}

// example:
const data = [1, 5, 12, 29, 63, 81, 94, 99]
const f = n => n * n + 3 * n + 5
const target = 5000
const found = binarySearch(data, f, target)
console.log({ target, found, value: f(found) })
