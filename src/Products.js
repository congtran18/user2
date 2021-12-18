/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import {
  // Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { formatPrice } from '../../../../../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    maxWidth: 345,
  },
  media: {
    height: 200,
    objectFit: 'cover',
  },
  title: {
    height: theme.spacing(2.5),
    fontSize: 15,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  description: {
    height: theme.spacing(6.25),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  link: {
    textDecoration: 'none',
  },
}));

function CardItem({ item }) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const defaultURL = process.env.REACT_APP_BACK_END_PUBLIC_URL;

  return (
    <Link
      href={`${process.env.REACT_APP_FRONT_END_URL}${url}/${item.id}`}
      underline="none"
    >
      <Card className={classes.container}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${defaultURL}/${item.coverImage}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="caption"
              component="p"
              className={classes.title}
            >
              {item.name}
            </Typography>
            <Typography variant="subtitle2">
              {formatPrice(item.price)}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
CardItem.propTypes = {
  item: PropTypes.object,
};

export default CardItem;
