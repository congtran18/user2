import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import * as Icon from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner'
import { connect } from "react-redux";
import axios from "axios";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import Meta from "./Meta";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      Product: [],
      qty: 1,
      rating: 1,
      comment: "",
      comment_error: "",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(listProductDetails(this.props.match.params.id));
  }

  addToCartHandler = () => {
    this.props.history.push(
      `/cart/${this.props.match.params.id}?qty=${this.state.qty}`
    );
  };

  submitHandler = (e) => {
    if (!this.state.comment) {
      return;
    }
    this.props.dispatch(
      createProductReview(this.props.match.params.id, {
        rating: this.state.rating,
        comment: this.state.comment,
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };
  render() {
    const { loading, error, product } = this.props.getProductDetailsData;
    const { userInfo } = this.props.getLoginInfoData;

    return (
      <div className='py-5 px-5'>
        <br />
        <br />
        <br />
        <br />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message />
        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col sm={12} md={6} lg={4} xl={4}>
              <div className={"my__carousel_main"}>
                {/* <Image style={{ width: "100%" }} src={product.image && product.image[0]} rounded /> */}
                <Carousel className ='detail-product-slide' fade nextIcon ={<Icon.ChevronRight color="black" size={25} />} prevIcon={<Icon.ChevronLeft color="black" size={30} />} >
                {product.image && product.image.map((image,index) => {
                if(index != 0 && image !== 'undefined'){
                return (
                <Carousel.Item className ='detail-product-item'>
                <img
                    className ='detail-product-image'
                    src={image}
                    alt="First slide"
                    height={600} 
                    width={600}
                />
                </Carousel.Item>
                )};
            })}
            </Carousel>
            </div>
              </Col>
              <Col sm={12} md={6} lg={4} xl={4}>
                <Card style={{ border: "none" }}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item as='h3'>{product.realname}</ListGroup.Item>
                    <ListGroup.Item>
                      {/* {product.rating} rating from {product.numReviews} reviews */}
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <span style={{ fontWeight: 1000, fontSize : 20 }}>Price:{" "}</span>
                      <span style={{ fontWeight: 700,fontSize : 20 }}>${product.cost}</span>
                    </ListGroup.Item>
                    <ListGroup.Item><span style={{ fontWeight: 1000, fontSize : 20 }}>Mô tả sản phẩm:{" "}</span><br></br><div>{product.description}</div></ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} xl={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>${product.cost}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <span style={{ color: "green" }}>In Stock</span>
                          ) : (
                            <span style={{ color: "red" }}>Out of stock</span>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Form.Control
                              as='select'
                              value={this.state.qty}
                              onChange={(e) =>
                                this.setState({ qty: e.target.value })
                              }>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          ) : (
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        onClick={this.addToCartHandler}
                        disabled={product.countInStock === 0}
                        style={{ width: "100%" }}
                        variant='dark'>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='py-5'>
              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Write a customer review</h4>
                    {userInfo ? (
                      <Form>
                        <Form.Group controllId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={this.state.rating}
                            onChange={(e) =>
                              this.setState({ rating: e.target.value })
                            }>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controllId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={this.state.comment}
                            onChange={(e) =>
                              this.setState({ comment: e.target.value })
                            }></Form.Control>
                          <Form.Text
                            className='text-muted'
                            style={{ color: "red" }}>
                            One user is only add one review !!!
                          </Form.Text>
                          <Button
                            disabled={!this.state.comment}
                            type='button'
                            className='my-2'
                            variant='primary'
                            onClick={this.submitHandler}>
                            Submit
                          </Button>
                        </Form.Group>
                      </Form>
                    ) : (
                      <p>
                        Please{" "}
                        <Link to='/login' style={{ color: "red" }}>
                          sign in
                        </Link>{" "}
                        to write a review{" "}
                      </p>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={6}>
                <ListGroup variant='flush'>
                  <h4>Reviews</h4>
                  {product.reviews.length === 0 && <p>No reviews</p>}

                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <h6>{review.name}</h6>
                      <Rating value={review.rating} text={``} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductDetailsData: state.productDetails,
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(ProductDetails);
