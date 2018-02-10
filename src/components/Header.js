import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom'


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
        <Container>
          <NavbarBrand href="/">Jamhoriat - <span className="lead"> Every vote counts! </span></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/create-poll/" exact={true} tag={RRNavLink}> Create Poll </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/past-polls" exact={true} tag={RRNavLink}> View Past Polls </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
        </Navbar>
        
      </div>
    );
  }
}