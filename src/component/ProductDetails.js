import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import {
  faChartBar,
  faCartPlus,
  faCheckCircle,
  faPlaneDeparture,
  faRedoAlt,
  faCommentDots,
  faTruck,
  faClock,
  faTshirt,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form'
import { Carousel } from 'react-carousel-minimal';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from 'react-image-gallery';
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
import AmounButton from "./AmounButton";
import "../styles/ProductDetails.scss";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      Product: [],
      qty: 1,
      rating: 1,
      size: "",
      color: "",
      comment: "",
      validateForm: false,
      comment_error: "",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(listProductDetails(this.props.match.params.id));
  }

  addToCartHandler = () => {
    if(this.state.color !== "" && this.state.size !== ""){
      this.props.history.push(
        `/cart/${this.props.match.params.id}?qty=${this.state.qty}&&size=${this.state.size}&&color=${this.state.color}`
      );
    }
  };

  onSubmit = async event => {
    event.preventDefault()
    this.setState({ validateForm: true })
    if(this.state.color !== "" && this.state.size !== ""){
      this.props.history.push(
        `/cart/${this.props.match.params.id}?qty=${this.state.qty}&&size=${this.state.size}&&color=${this.state.color}`
      );
    }
  };

  getData = async (product) => {
    const dataImage = []
    product.image.map((image,index) => {
      dataImage.push(
      {
        image: " ",
        caption: ""
      }
      )
      dataImage.image[index] = image
    })
    return dataImage
  }

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
    const captionStyle = {
      width: "800px",
      height: "800px",  
        // object-fit: cover;
    }
    // const slideNumberStyle = {
    //   width: "100%",
    //   height: "auto",
    //   object-fit: "cover",
    //   overflow: "hidden",
    //   object-position: "center",
    // }

    const data = [
      {
        original: "",
        thumbnail: ""
      },
      
    ];

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
            <Meta title={product.realname} />
            <Row>
              <Col sm={12} md={6} lg={6} xl={6}>
              <ImageGallery 
              items={product.data ? product.data : data}
              showIndex = {true}
              showBullets = {true}
              // originalClass = {captionStyle}
               />
              </Col>
              <Col sm={12} md={6} lg={6} xl={6}>
                {/* <Card style={{ border: "none" }}> */}
                  <ListGroup variant='flush'>
                    <ListGroup.Item as='h1' style={{ border: "none" ,fontWeight: "bold" }}>{product.realname}</ListGroup.Item>
                    <ListGroup.Item style={{ border: "none" }}>
                      {/* {product.rating} rating from {product.numReviews} reviews */}
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item style={{ border: "none" }}>
                    {/* <span style={{ fontWeight: 1000, fontSize : 20 }}>Giá:{" "}</span> */}
                      <strong style={{fontSize : 25, color : "#4040ff", fontWeight: 1000, }}>
                      {
                        new Intl.NumberFormat('en-US').format( (parseInt(product.cost) - (parseInt(product.cost) * parseInt(product.discount) / 100)) * parseInt(this.state.qty))
                      }đ
                      </strong>
                    </ListGroup.Item>
                  </ListGroup>
                {/* </Card> */}
              {/* </Col>
              <Col sm={12} md={6} lg={4} xl={4}> */}
                {/* <Card> */}
                  <ListGroup variant='flush'>
                    {/* <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>${product.cost}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Giảm giá:</Col>
                        <Col>
                          -{product.discount}%
                        </Col>
                      </Row>
                    </ListGroup.Item> */}

                    <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col sm={2} md={2} lg={4} xl={5}><span style={{ fontWeight: 1000, fontSize : 20, fontFamily: "Comic Sans MS" }}>Chọn số lượng:{" "}</span></Col>
                        <Col>
                            <AmounButton
                              itemAmount={this.state.qty}
                              increaseItemCount={(e) => this.setState({ qty: (this.state.qty < 10 ) ? this.state.qty + 1 : this.state.qty  })}
                              decreaseItemCount={(e) => this.setState({ qty: (this.state.qty > 1) ? this.state.qty - 1 : this.state.qty })}
                            />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <Form noValidate validated= {this.state.validateForm} onSubmit={this.onSubmit} id="add">
                    {/* <ListGroup.Item>
                      <Row>
                        <Col>Size:</Col>
                        <Col>
                          {product.size && product.size.length > 0 ? (
                          <Form.Group controlId="validationCustom03">
                            <Form.Control
                              as='select'
                              value={this.state.size}
                              onChange={(e) =>
                                this.setState({ size: e.target.value })
                              }>
                              <option value="" selected disabled hidden>Chọn size</option>
                              {product.size.map(
                                (x,index) =>{ if(index === 0){
                                  console.log("")
                                } 
                                return (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                )}  
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            Chọn size
                          </Form.Control.Feedback>
                          </Form.Group>
                          ) : (
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item> */}

                    <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col sm={2} md={2} lg={3} xl={2}><span style={{ fontWeight: 1000, fontSize : 20, fontFamily: "Comic Sans MS" }}>Size:{" "}</span></Col>
                        <Col sm={2} md={2} lg={3} xl={3}>
                          {product.size &&product.size.length > 0 ? (
                          <Form.Group controlId="validationCustom03">
                            <Form.Control
                              as='select'
                              id="size"
                              name="size"
                              className="border-form"
                              required
                              value={this.state.size}
                              onChange={(e) =>
                                this.setState({ size: e.target.value })
                              }>
                              <option value="" selected disabled hidden>tất cả</option>
                              {product.size.map(
                                (x,index) =>{ if(index === 0){
                                  console.log("")
                                } 
                                return (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                )}  
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
						                  Chọn size
           			            </Form.Control.Feedback>
                         	  </Form.Group>
                          ) : (
                            0
                          )}
                        </Col>
                        <Col sm={2} md={2} lg={3} xl={3}><span style={{ fontWeight: 1000, fontSize : 20, fontFamily: "Comic Sans MS" }}>Màu sắc:{" "}</span></Col>
                        <Col sm={2} md={2} lg={3} xl={3}>
                          {product.color &&product.color.length > 0 ? (
                          <Form.Group controlId="validationCustom03">
                            <Form.Control
                              as='select'
                              id="color"
                              name="color"
                              required
                              value={this.state.color}
                              onChange={(e) =>
                                this.setState({ color: e.target.value })
                              }>
                              <option value="" selected disabled hidden>tất cả</option>
                              {product.color.map(
                                (x,index) =>{ if(index === 0){
                                  console.log("")
                                } 
                                return (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                )}  
                              )}
                            </Form.Control> 
                            <Form.Control.Feedback type="invalid">
						                  Chọn màu sắc
           			            </Form.Control.Feedback>
                         	  </Form.Group>
                          ) : (
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {/* <ListGroup.Item style={{ border: "none" }}>
                      <Row>
                        <Col sm={2} md={2} lg={4} xl={6}><span style={{ fontWeight: 1000, fontSize : 20 }}>Màu sắc sản phẩm:{" "}</span></Col>
                        <Col>
                          {product.color &&product.color.length > 0 ? (
                          <Form.Group controlId="validationCustom03">
                            <Form.Control
                              as='select'
                              id="color"
                              name="color"
                              required
                              value={this.state.color}
                              onChange={(e) =>
                                this.setState({ color: e.target.value })
                              }>
                              <option value="" selected disabled hidden>Chọn màu sắc</option>
                              {product.color.map(
                                (x,index) =>{ if(index === 0){
                                  console.log("")
                                } 
                                return (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                )}  
                              )}
                            </Form.Control> 
                            <Form.Control.Feedback type="invalid">
						                  Chọn màu sắc
           			            </Form.Control.Feedback>
                         	  </Form.Group>
                          ) : (
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item> */}

                    <ListGroup.Item style={{ border: "none" }}><span style={{ fontWeight: 1000, fontSize : 20, fontFamily: "Comic Sans MS" }}>Mô tả sản phẩm:{" "}</span><br></br><div>{product.description}</div></ListGroup.Item>

                    <ListGroup.Item style={{ border: "none" }}>
                    <div className="row product-details-services">
                      <div className="col-lg-3">
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="product-details-services-icons"
                        />
                        <h6>Miễn phí vận chuyển cho đơn hàng trên 300k</h6>
                      </div>
                      <div className="col-lg-3">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="product-details-services-icons"
                        />
                        <h6>Giao hàng đúng hạn</h6>
                      </div>

                      <div className="col-lg-3">
                        <FontAwesomeIcon
                          icon={faTshirt}
                          className="product-details-services-icons"
                        />
                        <h6>Sản phẩm đảm bảo chất lượng</h6>
                      </div>

                      <div className="col-lg-3">
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          className="product-details-services-icons"
                        />
                        <h6>Lựa chọn hình thức thanh toán dễ dàng</h6>
                      </div>
                    </div>
                    </ListGroup.Item>
                    <br />
                    <ListGroup.Item>
                      <Button
                        // onClick={this.addToCartHandler}
                        type='submit'
                        // disabled={product.countInStock === 0}
                        style={{ width: "100%" }}
                        variant='dark'>
                        Thêm vào giỏ hàng
                      </Button>
                    </ListGroup.Item>
                    </Form>
                  </ListGroup>
                {/* </Card> */}
              </Col>
            </Row>
            < br />
            < br />
            < br />
            <Row className='py-5'>
              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Viết đánh giá sản phẩm</h4>
                    <br />
                    {userInfo ? (
                      <Form>
                        <Form.Group controllId='rating'>
                          <Form.Label>Vote</Form.Label>
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
                          <Form.Label>Bình luận</Form.Label>
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
                < br/>
                <ListGroup variant='flush'>
                  <h4>Đánh giá</h4>
                  < br/>
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
