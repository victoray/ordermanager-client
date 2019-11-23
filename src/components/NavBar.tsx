import React from "react";
import {Button, Container, Header, Menu, Segment} from "semantic-ui-react";

const NavBar = () => {

    return (
        <Menu inverted style={{borderRadius: 0}} borderless>
            <Menu.Item>
                <img src={"https://react.semantic-ui.com/logo.png"} alt={""}/>
            </Menu.Item>
            <Menu.Item>
                <Header inverted>Order Manager</Header>
            </Menu.Item>
        </Menu>
    )

};

export default NavBar;