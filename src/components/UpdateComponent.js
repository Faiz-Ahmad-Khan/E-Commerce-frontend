import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetails = async () => {
            console.warn(params);
            let result = await fetch(`https://e-com-backend.netlify.app/product/${params.id}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        };

        getProductDetails();
    }, [params]);

    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let result = await fetch(`https://e-com-backend.netlify.app/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'content-type': 'Application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/');
        }
    };

    return (
        <div className="product">
            {/* ... rest of the component ... */}
            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    );
};

export default UpdateProduct;