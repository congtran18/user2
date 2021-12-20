import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
export default class CheckoutSteps extends Component {
  render() {
    const { step1, step2, step3, step4 } = this.props;
    return (
      <Nav className='mb-4' style={{ width: "120vh" }}>
        <Nav.Item style={{ width: "18vh" }}>
          {step1 ? (
            <LinkContainer to='/login'>
              <Nav.Link><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Đăng nhập</span></Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Đăng nhập</span></Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item style={{ width: "18vh" }}>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <Nav.Link><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Địa chỉ</span></Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Địa chỉ</span></Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item style={{ width: "19vh" }}>
          {step3 ? (
            <LinkContainer to='/payment'>
              <Nav.Link><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Thanh toán</span></Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Thanh toán</span></Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item style={{ width: "18vh" }}>
          {step4 ? (
            <LinkContainer to='/placeorder'>
              <Nav.Link><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Xác nhận</span></Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled><span style={{ fontWeight: 1000, fontSize : 15, fontFamily: "Comic Sans MS" }}>Xác nhận</span></Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    );
  }
}
