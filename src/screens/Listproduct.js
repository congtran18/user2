import { useContext, useEffect, useReducer, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from './Products'
import Pagination from './Pagination'
import "../styles/Products.scss";
import axios from 'axios'
// import env from "react-dotenv";

const Listproduct = () => {

	const {id} = useParams()
	// Contexts
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [search, setSearch] = useState("");
	const [previoussearch, setPrevioussearch] = useState("");
	const [previoustype, setPrevioustype] = useState("");
	const [previouscategory, setPreviouscategory] = useState("");
	const [typeID, settypeID] = useState("");
	const [categoryID, setcategoryID] = useState("");
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [typeProducts, setTypeProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [productsLoading, setProductsLoading] = useState(true);

	const onChangeSelectTypeProduct = event => {
		setTimeout(() => {
			settypeID(event.target.value)
		}, 200);
	}

	const onChangeSelectCategoryProduct = event => {
		setTimeout(() => {
			setcategoryID(event.target.value)
		}, 200);
	}

	const onChangesearch = event => { 
    	setTimeout(() => {
			setSearch(event.target.value)
		}, 500);
  	}

	const getTypeProducts = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/api/products/typeProduct/type`)
			if (response.data.success) {
				setTypeProducts(response.data.typeProducts)
			}
		} catch (error) {
			setTypeProducts([])
		}
	}

	const getCategoryProducts = async (typeID) => {
		try {
			const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=${typeID}`)
			if (response.data.success) {
				setCategoryProducts(response.data.categoryProducts)
			}
		} catch (error) {
			setCategoryProducts([])
		}
	}

	const getProducts = async (page,search,typeID,categoryID) => {
		try {
			const response = await axios.get(`http://localhost:5000/api/products?page=${page}&&filters=${search}&&types=${typeID}&&categories=${(id !== '1') ? (id) : ""}`)
				setProducts(response.data.data)
				setTotalPages(response.data.pages)
				setProductsLoading(false)
				console.log(response)
		} catch (error) {
				setProducts([])
				setProductsLoading(false)
		}
	}

	  
	// Start: Get all product

	useEffect(() =>{
		const timeout = setTimeout(() => {
			setcategoryID("");
			getTypeProducts();
			getCategoryProducts(typeID);
		}, 200)
		return () => {
			clearTimeout(timeout)
		}
		
	}, [typeID,id])

	
	useEffect(() =>{
		if(search !== previoussearch || typeID !== previoustype || categoryID !== previouscategory){ 
			setPage(1);
		}
		const timeout = setTimeout(() => {
			setPages(totalPages);
			getProducts(page,search,typeID,(id !== '1') ? (id) : "");
			setPrevioussearch(search);
			setPrevioustype(typeID);
			setPreviouscategory(categoryID);
		}, 200)
		return () => {
			clearTimeout(timeout)
		}
	}, [page,search,typeID,categoryID,id])


	let body = null

	if (productsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} 
	else if(products.length === 0){
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Body>
						<Card.Title>Không có sản phẩm</Card.Title>
					</Card.Body>
				</Card>
				<Pagination page={page} pages={pages} changePage={setPage} />
			</>
		)
	} 
	else {
		body = (
			<>
				    <div className="container-products">
      <div className="header-products">
        <h1>
        
            Tất cả sản phẩm
        </h1>
      </div>

      <div className="row">
        {products.map((product) => (
          <Products data={product} key={product._id} />
        ))}
      </div>
    </div>
				{page ? (
					<Pagination page={page} pages={totalPages} changePage={setPage} />
				) : (
					<Pagination page={page} pages={pages} changePage={setPage} />
				) }
			</>
		)
	}

	return (
		<>
				<br></br>
			<div class="flex-filter-container">
			<div className="flex-filter-item-left">
				<span className = "text-bar1">Loại</span>
				<select
					className = "category-product1"
					id="type"
					name="type"
					onChange={onChangeSelectTypeProduct} >
					{/* <option value="" selected disabled hidden>Chọn loại sản phẩm</option> */}
					<option value="">Tất cả</option>
					{typeProducts.map(typeProduct => (
					<option key={typeProduct._id} value={typeProduct._id}>
						{typeProduct.realname}
					</option>
					))}
				</select>
				<span className = "text-bar2">Danh mục</span>
				<select
					className="category-product2"
					id="category"
					name="category"
					onChange={onChangeSelectCategoryProduct} >
					{/* <option value="" selected disabled hidden>Chọn danh mục sản phẩm</option> */}
					<option value="" selected>Tất cả</option>
					{categoryProducts.map(categoryProduct => (
					<option key={categoryProduct._id} value={categoryProduct._id}>
						{categoryProduct.realname}
					</option>
					))}
				</select>
				</div>
				<div className = "flex-filter-item-right">
				<span className = "text-bar2">Tìm kiếm</span>
			<input className="search" type="text" placeholder="Search" aria-label="Search"  onChange={onChangesearch} />
				</div>		
			</div>
			{body}
		</>
	)
}

export default Listproduct

