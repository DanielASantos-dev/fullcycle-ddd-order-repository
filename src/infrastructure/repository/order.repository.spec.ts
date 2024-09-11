import { Sequelize } from "sequelize-typescript";

import CustomerRepository from "./customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/orderItem";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const updatedOrderItem = new OrderItem(
            "1",
            product.name,
            20,
            product.id,
            3
        );

        const updatedOrder = new Order("123", "123", [updatedOrderItem]);
        await orderRepository.update(updatedOrder);

        const updatedOrderModel = await OrderModel.findOne({
            where: { id: updatedOrder.id },
            include: ["items"],
        });

        expect(updatedOrderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: updatedOrder.total(),
            items: [
                {
                    id: updatedOrderItem.id,
                    name: updatedOrderItem.name,
                    price: updatedOrderItem.price,
                    quantity: updatedOrderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should find an order by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder.id).toBe(order.id);
        expect(foundOrder.customerId).toBe(order.customerId);
        expect(foundOrder.items.length).toBe(1);
        expect(foundOrder.items[0].id).toBe(orderItem.id);
        expect(foundOrder.items[0].quantity).toBe(orderItem.quantity);
        expect(foundOrder.total()).toBe(order.total());
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem1 = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order1 = new Order("123", "123", [orderItem1]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            1
        );

        const order2 = new Order("124", "123", [orderItem2]);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders.length).toBe(2);
        expect(orders[0].id).toBe(order1.id);
        expect(orders[0].total()).toBe(order1.total());
        expect(orders[1].id).toBe(order2.id);
        expect(orders[1].total()).toBe(order2.total());
    });





});
