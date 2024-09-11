import OrderModel from "../db/sequelize/model/order.model";
import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItem from "../../domain/entity/orderItem";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
            },
            {
                where: { id: entity.id },
            }
        );

        await Promise.all(entity.items.map(async (item) => {
            await OrderItemModel.update(
                {
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                },
                {
                    where: { id: item.id },
                }
            );

        }));
    }

    async find(id: string): Promise<Order> {
        const orderData = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
        });

        if (!orderData) {
            throw new Error("Order not found");
        }

        const orderItems = orderData.items.map((item: any) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });

        return new Order(orderData.id, orderData.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const ordersData = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        });

        return ordersData.map(orderData => {
            const orderItems = orderData.items.map((item: any) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });

            return new Order(orderData.id, orderData.customer_id, orderItems);
        });
    }

}
