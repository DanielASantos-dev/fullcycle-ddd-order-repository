import Address from "./address"
import Customer from "./customer"
import { v4 as uuid } from "uuid"

describe("Customer unit test", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "John")
        }).toThrow("Id is required")
    })

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "")
        }).toThrow("Name is required")
    })

    it("should change name", () => {
        //arrange
        let customer = new Customer("123", "John")
        //act
        customer.changeName("Daniel")
        //asert
        expect(customer.name).toBe("Daniel")
    });

    it("should activate customer", () => {
        //arrange
        let customer = new Customer("123", "John")
        const address = new Address("Street 1", 1, "13333-590", "São Paulo");
        customer.Address = address
        //act
        customer.activate()
        //asert
        expect(customer.isActive
            ()
        ).toBe(true)
    });

    it("should deactivate customer", () => {
        //arrange
        let customer = new Customer("123", "John")
        const address = new Address("Street 1", 1, "13333-590", "São Paulo");
        customer.Address = address
        //act
        customer.deactivate()
        //asert
        expect(customer.isActive
            ()
        ).toBe(false)
    });

    it("should throw erro when address in undefined when you activate a customer", () => {
        expect(() => {
            let customer = new Customer("123", "John")
            customer.activate()
        }
        ).toThrow("Address is mandatory to activate a customer");

    });

    it("should add reward points", () => {
        const customer = new Customer(uuid(), "Daniel")
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    });
})
