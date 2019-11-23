import React from "react";
import {Button, Container, Header, Menu, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const NavBar = () => {

    return (
        <Menu inverted style={{borderRadius: 0}} borderless>
            <Menu.Item as={Link} to={"/"}>
                <img src={"https://react.semantic-ui.com/logo.png"} alt={""}/>
            </Menu.Item>
            <Menu.Item as={Link} to={"/"}>
                <Header inverted>Order Manager</Header>
            </Menu.Item>
        </Menu>
    )

};

export default NavBar;