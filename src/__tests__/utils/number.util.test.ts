import {EmptyArrayException, max, mean, min} from "../../utils/number.util";

test("mean", () => {
    expect(mean([1, 2, 3])).toBe(2)
})
test("max", () => {
    expect(max([1, 3, 2])).toBe(3)
})
test("min", () => {
    expect(min([1, 3, 2, -8, -5])).toBe(-8)
})
test("mean error", () => {
    expect(mean([])).toBe(0)
})
test("max error", () => {
    try {
        max([])
    } catch (e: any) {
        expect(e.message).toContain(EmptyArrayException.message)
    }
})
test("min error", () => {
    try {
        min([])
    } catch (e: any) {
        expect(e.message).toContain(EmptyArrayException.message)
    }
})
