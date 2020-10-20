import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Button,
  Container,
  Icon,
  List,
  ListContent,
  Segment,
  Item,
  Label,
  Accordion,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import axios from "axios";
import { Order } from "./types";
import { Link } from "react-router-dom";

const useGetOrders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    axios
      .get("https://ancient-coast-58289.herokuapp.com/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  }, []);

  return orders;
};

export const handleClick = (
  index: number,
  activeIndex: number,
  setIndex: Dispatch<SetStateAction<number>>
) => {
  const newIndex = index === activeIndex ? -1 : index;
  setIndex(newIndex);
};

const Home = () => {
  const orders: Order[] | undefined = useGetOrders();
  const [activeIndex, setIndex] = useState(-1);

  if (orders === undefined)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  return (
    <>
      <NavBar />
      <Container style={{ paddingBottom: 300 }}>
        <Button floated={"right"} color={"blue"} as={Link} to={"/new"}>
          <Icon name={"plus"} /> New Order
        </Button>
        <h1>Order History</h1>
        <Accordion fluid styled style={{ marginTop: 50 }}>
          {orders
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .map((order) => {
              return (
                <React.Fragment key={order.id}>
                  <Accordion.Title
                    active={activeIndex === order.id}
                    index={order.id}
                    onClick={() => handleClick(order.id, activeIndex, setIndex)}
                  >
                    <Item.Content>
                      <Button as={Label} floated={"right"} basic>
                        ${order.total.toFixed(2)}
                      </Button>
                      <Item.Header>{`Order #${order.id}`}</Item.Header>
                      <Item.Description>
                        Date: {order.orderDate}
                      </Item.Description>
                    </Item.Content>
                  </Accordion.Title>
                  <Accordion.Content
                    as={Segment}
                    active={activeIndex === order.id}
                    attached
                  >
                    {order.orderItems.map((orderitem, index) => {
                      return (
                        <Message info floating key={index}>
                          <Message.Header>
                            {orderitem.quantity} {orderitem.item.name}
                            {orderitem.quantity > 1 ? "s" : ""}
                          </Message.Header>
                          <p>
                            $
                            {(
                              orderitem.quantity * orderitem.item.price
                            ).toFixed(2)}
                          </p>
                        </Message>
                      );
                    })}
                  </Accordion.Content>
                </React.Fragment>
              );
            })}
        </Accordion>
      </Container>
    </>
  );
};

export default Home;
