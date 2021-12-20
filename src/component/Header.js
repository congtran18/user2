import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import {
  faBars,
  faShoppingCart,
  faCaretDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";
import "../styles/Navbar.scss";
class Header extends Component {

  constructor() {
    super();
    this.state = {
      toggleNav: false,
    };
  }

  logout = () => {
    this.props.dispatch(logout());
    this.props.history.push("/login");
  };

  render() {
    const { userInfo } = this.props.getLoginInfoData;
    const toggleNav = this.state.toggleNav;
    const { cartItems } = this.props.getcartData;
    return (
      <header style={{ marginBottom: 100 }}>
        <Navbar bg='light' className='px-5' fixed='top' expand='lg' style = {{ backgroundImage: `url("https://images.unsplash.com/photo-1614208194190-5bf690ad8a98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80")`  }}>
          <Navbar.Brand href='/'>
            <i className='fas fa-shopping-bag'></i>{" "}
            <span style={{ color: "red", fontWeight: "700" }}>S</span>hop Thời trang
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' style = {{ paddingBottom : '20'}}/>
          <Navbar.Collapse id='basic-navbar-nav'>
          <div className="container-nav">
            <Nav className="ml-auto">
          <ul className="navigation-list">
            <li>
              <Link to="#" >
              Sản phẩm
              <i className="icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
               
                <ul className="products-cat">
                  <li>
                    <Link to="/collections">All</Link>
                    
                  </li>
                  <li>
                    <Link to="/collections/men">Men</Link>
                  </li>
                  <li>
                    <Link to="/collections/women">Women</Link>
                  </li>
                  <li>
                    <Link to="/collections/kids">Kids</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="#">
                  Collections
                  <i className="icon ">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
                <ul className="products-cat">
                  <li>
                    <Link to="/trend/New">New Arrival</Link>
                  </li>
                  <li>
                    <Link to="/trend/Trending">Trending</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-shopping-cart">
                <Link
                  to="/cart"
                  className="cart position-relative d-inline-flex"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="store-cart-icon"
                  />
                  <span className="cart-basket d-flex align-items-center justify-content-center ">
                    {cartItems.length}{" "}
                  </span>
                </Link>
              </li>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <NavDropdown.Item>
                    <Link to='/profile'>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.logout}>
                    Logout
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <Link to='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </Link>
                </Nav.Link>
              )}
            </ul>
            </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcartData: state.cart,
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Header);
