import './Product.css';
import { useState, useEffect } from 'react';
import ProductCarousel from '../../Components/ProductCarousel/ProductCarousel';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Product() {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function productDetails() {
            if (id) {
                let res = await axios.get('https://dummyjson.com/products/' + id);
                setProduct(res.data);
            }
        }
        productDetails();
    }, [id]);

     
     const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

      window.dispatchEvent(new Event("storage"));
    // alert("Product added to cart 🛒");
};



    return (
        <div className='ProductPage d-flex'>
            <div className='productImagesDiv halfDiv d-flex justify-content-center align-items-center'>
                <ProductCarousel images={product.images} />
            </div>

            <div className='productInfoDiv halfDiv d-flex align-items-start'>
                <div className='d-flex flex-column row-gap-3 p-4'>
                    <h1>{product.title}</h1>
                    <h3>Price ${product.price}</h3>
                    <h5>{product.category}</h5>
                    <p>{product.description}</p>

                    <button
                        className='btn btn-primary btn-lg w-25'
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;
