import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import {Button, Container, Icon, List, ListContent, Segment, Item, Label} from "semantic-ui-react";
import axios from "axios";
import {Order} from "./types";
import {Link} from "react-router-dom";

const useGetOrders = () => {
    const [orders, setOrders] = useState();

    useEffect(() => {
        axios.get("https://ancient-coast-58289.herokuapp.com/api/orders")
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);

    return orders;
};
const useForceUpdate = () => useState()[1];

const Home = () => {
    const orders: Order[] | undefined = useGetOrders();
    useForceUpdate();

    if (orders === undefined) return null;
    return (
        <>
            <NavBar/>
            <Container>
                <Button floated={"right"} color={"blue"} as={Link} to={"/new"}>
                    <Icon name={"plus"}/> New Order
                </Button>
                <h1>Order History</h1>
                <Item.Group style={{marginTop: 50}}>
                    {orders.sort((a, b) => a.id < b.id ? 1 : -1).map(order => {
                        return (
                            <List.Item key={order.id} as={Segment} padded={"very"}>
                                <Item.Content>
                                    <Button as={Label} floated={"right"} basic>
                                        ${order.total.toFixed(2)}
                                    </Button>
                                    <Item.Header>{`Order #${order.id}`}</Item.Header>
                                    <Item.Description>Date: {order.orderDate}</Item.Description>
                                </Item.Content>
                            </List.Item>)
                    })}
                </Item.Group>
            </Container>
        </>
    )

};

export default Home;