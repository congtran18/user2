import React from 'react'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { mobile } from "./responsive";
import { tablet } from "./responsive";
import ao2 from "../assets/ao2.jpg";
import quan2 from "../assets/quan2.jpg";
import giay from "../assets/giay.jpg";

const categories = [
  {
    id: 1,
    img: ao2,
    title: "ÁO!",
  },
  {
    id: 2,
    img: quan2,
    title: "QUẦN",
  },
  {
    id: 3,
    img: giay,
    title: "GIÀY DÉP",
  },
];

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
  ${tablet({ padding: "0px", flexDirection:"column" })}
`
const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
        <CategoryItem item={item} key={item.id}/>
      ))}
    </Container>
  )
}

export default Categories

