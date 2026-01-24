import './Home.css';
import React, { useEffect, useState } from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import CategoryCard from '../../Components/CategoryCard';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard';
import { useLocation } from 'react-router-dom';

function Home() {
    const [storeProducts, setStoreProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search");

        async function getProducts() {
            let url = 'https://dummyjson.com/products?limit=116';

            if (searchQuery) {
                url = `https://dummyjson.com/products/search?q=${searchQuery}`;
            }

            const res = await axios.get(url);
            setStoreProducts(res.data.products);
        }

        getProducts();
    }, [location.search]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts =
        selectedCategory === "all"
            ? storeProducts
            : storeProducts.filter(
                  (product) =>
                      product.category.toLowerCase() === selectedCategory.toLowerCase()
              );

    return (
        <>
            <Carousel />

            <h1>Categories</h1>
            <div className='d-flex column-gap-3'>
                <CategoryCard fileName={'/grocery.jpg'} categoryName={'groceries'} onClick={handleCategoryClick} />
                <CategoryCard fileName={'/cloths.jpg'} categoryName={'mens-shirts'} onClick={handleCategoryClick} />
                <CategoryCard fileName={'/women cloth.jpg'} categoryName={'tops'} onClick={handleCategoryClick} />
                <CategoryCard fileName={'/watch.jpg'} categoryName={'mens-watches'} onClick={handleCategoryClick} />
                <CategoryCard fileName={'/accessories.jpg'} categoryName={'mobile-accessories'} onClick={handleCategoryClick} />
                <CategoryCard fileName={'/beauty.jpg'} categoryName={'beauty'} onClick={handleCategoryClick} />
            </div>

            <h1 className="mt-4">Products</h1>
            <div className='d-flex flex-wrap gap-3'>
                {filteredProducts.length === 0 && <h4>No products found 😢</h4>}
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}

export default Home;
