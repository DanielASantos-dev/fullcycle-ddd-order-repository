import Order from "./order"
import OrderItem from "./orderItem"

describe("Order unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrow("CustomerId is required")
    })

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "1", [])
        }).toThrow("Items are required")
    })

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "item 1", 100, "p1", 2)
        const item2 = new OrderItem("2", "item 2", 200, "p2", 2)
        const order = new Order("123", "1", [item1, item2])

        expect(order.total()).toBe(600)
    })



})
