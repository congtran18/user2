import React, { Component } from "react";
import { addToCart, removeCartItem } from "../actions/cartActions";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../component/Message";
import { Link } from "react-router-dom";

class Cart extends Component {
  // constructor(){
  //   super()

  // }
  componentDidMount() {
    window.scrollTo(0, 0);

    const productId = this.props.match.params.id;
    // const qty = this.props.location.search
    //   ? Number(this.props.location.search.split("=")[1])
    //   : 1;
    // const size = this.props.location.search
    // ? Number(this.props.location.search.split("=")[1])
    // : 1;
    // const color = this.props.location.search
    // ? Number(this.props.location.search.split("=")[1])
    // : 1;
    const search = this.props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const qty = params.get('qty'); // bar
    const size = params.get('size'); 
    const color = params.get('color'); 

    if (productId) {
      this.props.dispatch(addToCart(productId, qty, size, color));
    }
  }

  removeFromCartHandler = (id) => {
    this.props.dispatch(removeCartItem(id));
  };

  checkoutHandler = () => {
    if (!this.props.getUserLoginData.userInfo) {
      return this.props.history.push("/login");
    } else {
      return this.props.history.push("/shipping");
    }
  };
  render() {
    const { cartItems } = this.props.getcartData;
    return (
      <Container className='py-4'>
        <br />
        <br />
        <br />
        <Row>
          <Col md={9}>
            <h3>Giỏ hàng</h3>
            < br />
            {cartItems.length === 0 ? (
              <Message message={`Your cart is empty`} />
            ) : (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col md={2} align='center'><h6>Ảnh</h6></Col>
                    <Col md={3}><h6>Tên sản phẩm</h6></Col>
                    <Col md={2}><h6>Đơn giá</h6></Col>
                    <Col md={2}><h6>Số lượng</h6></Col>
                    <Col md={2}><h6>Thao tác</h6></Col>
                    {/* <Col md={2}><h6>Màu sắc</h6></Col> */}
                  </Row>
                </ListGroup.Item>
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <img
                            src={item.image && item.image}
                            alt={item.realname}
                            height={90} 
                            width={90}
                            style={{ borderRadius: "20%"  }}
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item._id}`}>
                            {item.realname}
                          </Link>
                        </Col>
                        <Col md={2}>
                        {new Intl.NumberFormat('en-US').format( (parseFloat(item.cost) - (parseFloat(item.cost) * parseFloat(item.discount) / 100)))}đ</Col>

                        {/* <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              this.props.dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col> */}
                        <Col md={2} align='center'>{item.qty}</Col>

                        <Col md={2}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() =>
                              this.removeFromCartHandler(item._id)
                            }>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={3}>
          < br/>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <span style={{ fontWeight: 1000, fontSize : 15 }}> 
                    Số lượng:{" "}
                    <span style={{ fontWeight: 1000, fontSize : 18, fontFamily: "Comic Sans MS" }}>
                    {cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)} sản phẩm{" "}
                    </span>
                    {/* {cartItems
                      .reduce((acc, item) => acc + item.qty * item.cost, 0)}đ */}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontWeight: 1000, fontSize : 15 }}>
                    Tổng giá:{" "}
                    {/* {cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)} items{" "} */}
                    <span style={{ fontWeight: 1000, fontSize : 18, fontFamily: "Comic Sans MS" }}>
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * (item.cost - item.cost * item.discount / 100), 0)}đ
                    </span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='d-block w-100'
                    disabled={cartItems.length === 0}
                    onClick={() => this.checkoutHandler()}>
                    Thanh toán
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcartData: state.cart,
    getUserLoginData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Cart);
