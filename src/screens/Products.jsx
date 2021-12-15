import React, { useState } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import Rating from "../component/Rating";

import { formatPrice } from "./formatPrice";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Product.scss";

const Products = (props) => {
  const classes = useStyles();

  const { data } = props;

  const [imgdata, setImgdata] = useState(data.image[0]);
  
  // const title = data.name.slice(0, 30);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6" >
    <Link to={`/product/${data._id}`} style={{ textDecoration: 'none' }} >
    <div className="card-product">

      <img
        className="card-img-top"
        src={imgdata}
        onMouseOut={() => setImgdata(data.image[0])}
        onMouseOver={() => setImgdata(data.image[1])}
      />


      <div
        className={`${
          data.status === "New"
            ? "product-banner-new"
            : "product-banner-trending"
        }`}
      >
        {data.status}
      </div>
      <div className="product-banner-stock-level-low">{data.type.realname}</div>
      <div className="card-body">
        <h2 className="card-title">
          {data.realname}</h2>
        <div className="row">
            {parseInt(data.discount) > 0 ? (
              <h3>
                <div className="col-lg-12  col-md-6 col-sm-6">
                <span className="product-price-after-discount">$
                  
                  {
                    
                  new Intl.NumberFormat('en-US').format( parseInt(data.cost) - (parseInt(data.cost) * parseInt(data.discount) / 100)
                  )
                
                }
                </span>
                </div>
                <div className="col-lg-12 col-md-4 col-sm-4 ">
                <span className="product-price-before-discount">
                  $
                  {               
                  new Intl.NumberFormat('en-US').format( parseInt(data.cost)) 
                  }
                         
                </span>{" "}
                <span className="col-lg-2 col-md-2 col-sm-2 product-discount-rate">
                  -{parseInt(data.discount)}%{" "}
                </span>
                </div>
              </h3>
            ) : (
              <h3>
                {" "}
                <div className="col-lg-12  col-md-6 col-sm-6">
                <span className="product-price-whit-no-discount">$
                  {
               
                  new Intl.NumberFormat('en-US').format(parseInt(data.cost)) 
                  }
                </span>
                </div>
                <br></br>
              </h3>
            )}
              {/* <div className="col-lg-5 col-md-6 col-sm-6 card-product-action-icons">
                  {data.price >=1 ?
                  <span
                    name="id"
                    value={data._id}
                    className="card-product-action-cart-icon add-to-cart-icon"
                    
                    // onClick={  () => handleAddToCart(props.data)}
                  >
          
                    <FontAwesomeIcon 
                    className="icon"
                    icon={faCartPlus}
                  
                    />
                  </span>
                  :""}

                  <span>
                    <a
                      href={`/catalog/item/${data._id}//view`}
                      className="card-product-action-cart-icon"
                    >
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </a>
                  </span>
              </div> */}
                      <div className="col-lg-12   col-md-6 col-sm-6">
            <Rating
              value={data.rating}
              text={`${data.numReviews} reviews`}
            />
            </div>
        </div>
      </div>
    </div>
  </Link>
  </div>
    // <Box
    //   id={data._id}
    //   px={4}
    //   pt={4}
    //   display="flex"
    //   flexDirection="column"
    //   style={{ transition: "all 0.3s linear" }}
    // >
    //   <Box className={classes.container}>
    //     <div className={classes.overlay + " overlay"}></div>
    //     <img className={classes.imgStyle} src={data.image} alt={data.image} />
    //     <Link
    //       className={classes.searchIcon + " show"}
    //       to={`/product/${data._id}`}
    //     >
    //       <SearchOutlinedIcon />
    //     </Link>
    //   </Box>
    //   <Box display="flex" justifyContent="space-between" mt={3}>
    //     <Typography className={classes.title}>{data.name}</Typography>
    //     <Typography className={classes.title} color="primary">
    //       {formatPrice(data.price)}
    //     </Typography>
    //   </Box>
    // </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    "&:hover": {
      "& .show": {
        opacity: 1,
      },
      "& .overlay": {
        opacity: 0.6,
      },
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: "#333",
    opacity: 0,
    zIndex: 100,
    transition: "all 0.3s linear",
  },
  searchIcon: {
    position: "absolute",
    color: "#fff",
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    opacity: 0,
    zIndex: 200,
  },
  imgStyle: {
    width: "100%",
    borderRadius: 5,
    height: "13rem",
    // [theme.breakpoints.down("sm")]: {
    //   maxHeight: "20vmax",
    // },
    // [theme.breakpoints.up("xl")]: {
    //   height: "13vmax",
    // },
  },
  cursor: {
    cursor: "pointer",
  },
  title: {
    textTransform: "capitalize",
    fontWeight: 500,
  },
}));

export default Products;
