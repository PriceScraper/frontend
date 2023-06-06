export function mean(array: number[]) {
    if (array.length === 0) return 0
    let total = 0
    array.forEach(n => total += n)
    return total / array.length
}

export function max(array: number[]) {
    if (array.length === 0) throw EmptyArrayException;
    let max = array[0]
    array.forEach(n => {
        if (n > max) max = n
    })
    return max
}

export function min(array: number[]) {
    if (array.length === 0) throw EmptyArrayException;
    let min = array[0]
    array.forEach(n => {
        if (n < min) min = n
    })
    return min
}

export const EmptyArrayException = new Error("Could not calculate min/max due to empty array")
