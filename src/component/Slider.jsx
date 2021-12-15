import React from "react";
import Carousel from "react-material-ui-carousel";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import sliderImg1 from "../assets/8.jpg";
import sliderImg2 from "../assets/9.jpg";
import sliderImg3 from "../assets/4.jpg";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const classes = useStyles();

  return (
    <Box
      style={{ backgroundImage: `url(${item.img})` }}
      className={classes.boxContainer}
      display="flex"
      alignItems="center"
    >
      <Container>
        <Box mx={6} className={classes.carouselText}>
          <Box mb={4}>
            <Typography variant="h6">
              <Box fontWeight={600} letterSpacing={3}>
                {item.name}
              </Box>
            </Typography>
            <Box fontSize="h2.fontSize" fontWeight={700} lineHeight={1}>
              {item.description}
            </Box>
            <Typography variant="h3" color="primary">
              <Box lineHeight={1}>{item.forWhat}</Box>
            </Typography>
            <Typography color="textSecondary" component={"span"}>
              <Box width="45%" my={1} className={classes.caroselParagraph}>
                {item.paragraph}
              </Box>
            </Typography>
          </Box>
          <Link to="shop" style={{ textDecoration: "none" }}>
            <Button className={classes.shopBtn} variant="outlined">
              Shop now
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

const Slider = () => {
  const classes = useStyles();

  const items = [
    {
      img: sliderImg1,
      name: "Hàng mới chất lượng",
      description: "Thời trang nam nữ",
      forWhat: "Unisex cho nam và nữ",
      paragraph:
        "Mang đến những sản phẩm chất lượng được sản xuất công phu và hợp với xu hướng và có giá thành hợp lí với từng sản phẩm",
    },
    {
      img: sliderImg2,
      name: "Hợp với xu hướng",
      description: "Thời trang nam nữ",
      forWhat: "Unisex cho nam và nữ",
      paragraph:
        "Sản phẩm được chọn lọc bởi những chuyên gia trong lĩnh vực thời trang để mang đến những sản phẩm hợp với xu hướng hiện nay và không bao giờ lỗi mốt",
    },
    {
      img: sliderImg3,
      name: "Đa dạng mẫu mã",
      description: "Thời trang nam nữ",
      forWhat: "Unisex cho nam và nữ",
      paragraph:
        "Sản phẩm đa dạng và nhiều lựa chọn nhưng vẫn đảm bảo chất lượng trên từng sản phẩm để đem đến trải nghiệm thoải mái và làm hài lòng khách hàng",
    },
  ];

  return (
    <Carousel
      indicators={false}
      navButtonsProps={{ className: classes.navButtons }}
      navButtonsWrapperProps={{
        // Move the bottom. override default style.
        style: {
          top: "-2em",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const useStyles = makeStyles((theme) => ({
  carouselText: {
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      textAlign: "center",
    },
  },
  caroselParagraph: {
    textTransform: "lowercase",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  boxContainer: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    height: "70vh",
  },
  shopBtn: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  navButtons: {
    backgroundColor: "#333",
    opacity: 0.4,
    "&:hover": {
      backgroundColor: "#79B6C8 !important",
      opacity: 1,
    },
  },
}));

export default Slider;
