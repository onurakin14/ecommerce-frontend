import React, { useEffect, useState } from "react";

function Home() {

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => { console.log(data); setProducts(data) });
    }, []);

    return (
        <React.Fragment>
            {products.map((item) => {
                return (
                    <div key={item.id}>
                        <p> {item.title} </p>
                    </div>
                )
            })}
        </React.Fragment>
    );
}

export default Home;