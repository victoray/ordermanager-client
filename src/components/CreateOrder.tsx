import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Item, Order, OrderItem } from "./types";
import {
  Button,
  Label,
  List,
  Segment,
  Item as SemanticItem,
  Container,
  Divider,
  Input,
} from "semantic-ui-react";
import _ from "lodash";
import { Simulate } from "react-dom/test-utils";
import { Redirect, RouteComponentProps } from "react-router";

const itemValues: any = {};
const itemQuanties: any = {};

const useGetItems = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    axios
      .get("https://ancient-coast-58289.herokuapp.com/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return items;
};

const onQuantityChange = (
  value: string,
  setTotal: Dispatch<SetStateAction<number>>,
  item: Item
) => {
  if (isNaN(parseInt(value))) value = "0";
  itemQuanties[item.id] = parseInt(value);
  itemValues[item.id] = parseInt(value) * item.price;
  const sum = Object.values(itemValues).reduce(
    (a, b) => (a as number) + (b as number),
    0
  );

  if (!isNaN(sum as number)) {
    setTotal(sum as number);
  }
};

const processOrder = (total: number, items: Item[], history: any) => {
  const itemsObject = _.mapKeys(items, "id");
  const orderItems: OrderItem[] = [];

  Object.keys(itemQuanties).forEach((key) => {
    if (itemQuanties[key] === 0 || itemQuanties[key] < 0) {
      delete itemQuanties[key];
    } else {
      const mainItem: OrderItem = {
        item: itemsObject[key],
        quantity: itemQuanties[key],
      };
      orderItems.push(mainItem);
    }
  });

  if (total === 0) {
    history.push("/");
    return;
  }

  const order = { orderItems: orderItems, total: total };

  axios
    .put("https://ancient-coast-58289.herokuapp.com/api/orders/new", order)
    .then(() => {
      window.location.assign("/");
    })
    .catch((error) => console.log(error));
};

interface CreateOrder extends RouteComponentProps<any> {}

const CreateOrder = ({ history }: CreateOrder) => {
  const items = useGetItems();
  const [total, setTotal] = useState(0);

  if (items === undefined) return null;

  return (
    <>
      <NavBar />

      <Container>
        <h1>New Order</h1>
        <Divider hidden />
        <Divider hidden />
        <h3>Add items to order</h3>

        <SemanticItem.Group style={{ marginTop: 50 }}>
          {items.map((item) => {
            return (
              <List.Item key={item.id} as={Segment} padded={"very"}>
                <SemanticItem.Content>
                  <Segment
                    floated={"right"}
                    basic
                    style={{ padding: 0, margin: 0 }}
                  >
                    <Input
                      label={"Quantity"}
                      type={"number"}
                      size={"mini"}
                      min={0}
                      placeholder={0}
                      onChange={(event, data) =>
                        onQuantityChange(data.value, setTotal, item)
                      }
                    />
                  </Segment>

                  <SemanticItem.Header>{`${item.name}`}</SemanticItem.Header>
                  <SemanticItem.Meta style={{ color: "red" }}>
                    ${item.price.toFixed(2)}
                  </SemanticItem.Meta>
                </SemanticItem.Content>
              </List.Item>
            );
          })}
        </SemanticItem.Group>
        <Divider />
        <Container textAlign={"right"} style={{ color: "red" }}>
          Total: ${total.toFixed(2)}
          <br />
          <Button
            style={{ marginTop: 30 }}
            color={"green"}
            onClick={() => processOrder(total, items, history)}
          >
            Place Order
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default CreateOrder;
