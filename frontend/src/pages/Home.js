import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Crousel from '../components/Crousel';
import Card from '../components/Card';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <>
      <div><Navbar /></div>
      <div>
       <Crousel/>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr id="hr-success" style={{ height: '4px', backgroundImage: '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))' }} />
              {foodItems !== [] ? (
                foodItems
                  .filter((items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filterItems) => (
                    <div className="col-12 col-md-6 col-lg-3" key={filterItems._id}>
                      <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                    </div>
                  ))
              ) : (
                <div> No Such Data </div>
              )}
            </div>
          ))
        ) : (
          <div>'</div>
        )}
      </div>
      <div className="m-0"> <Footer /> </div>
    </>
  );
};

export default Home;