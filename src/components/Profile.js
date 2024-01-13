import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user'));
    if (!auth) {
      navigate('/login');
    } else {
      setUser(auth);
      getProducts(auth._id);
    }
  }, [navigate]);

  const getProducts = async (userId) => {
    let result = await fetch(`https://e-com-backend.netlify.app/products/users/${userId}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('token')),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h2>Products added by you:</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
};

export default Profile;
