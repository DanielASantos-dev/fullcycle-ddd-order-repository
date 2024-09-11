import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/orderItem";


let customer = new Customer("123", "Wesley William");
const address = new Address("Rua dois", 10, "12345-678", "São Paulo");
customer.Address = address
customer.activate();

const item1 = new OrderItem("1", "Item1", 10, "p1", 2)
const item2 = new OrderItem("2", "Item2", 15, "p2", 2)
const item3 = new OrderItem("3", "Item3", 5, "p3", 2)

const order = new Order("1", "123", [item1, item2, item3])