import React from "react";

export interface Item {
    id: number;
    name: string;
    price: number;
}

export interface OrderItem {
    item: Item;
    quantity: number;
}

export interface Order {
    id: number;
    total: number;
    orderItems: OrderItem[];
    orderDate: string;
}