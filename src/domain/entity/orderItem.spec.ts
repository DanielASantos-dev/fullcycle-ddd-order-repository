import OrderItem from "./orderItem"

describe("Order unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const item = new OrderItem("", "item 1", 100, "p1", 1)
        }).toThrow("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const item = new OrderItem("1", "", 100, "p1", 1)
        }).toThrow("Name is required")
    })

    it("should throw error if the item price is greater than 0", () => {
        expect(() => {
            const item = new OrderItem("1", "item 1", 0, "p1", 2)
        }).toThrow("Price must be greater than 0")
    })

    it("should calculate total", () => {
        const item = new OrderItem("1", "item 1", 100, "p1", 2)


        expect(item.total()).toBe(200)
    })

    it("should throw error if the item qte is greater than 0", () => {
        expect(() => {
            const item = new OrderItem("1", "item 1", 100, "p1", 0)
        }).toThrow("Quantity must be greater than 0")
    })

})
