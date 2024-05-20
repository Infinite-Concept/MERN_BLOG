import React from 'react'
// category image 
import businessCategory from "../../assets/icons/business.svg"
import shuttleCategory from "../../assets/icons/shuttle.svg"
import economyCategory from "../../assets/icons/economy.svg"
import cyborgCategory from "../../assets/icons/cyborg.svg"

import "./category.scss"

function Category() {
  return (
    <div className="category_container">
        <div className="category_items">
            <div className="category_icon">
            <img src={businessCategory} alt="" />
            </div>

            <h2 className='heading3'>Business</h2>
            <p className='body1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        </div>

        <div className="category_items itemsColor">
            <div className="category_icon">
            <img src={shuttleCategory} alt="" />
            </div>

            <h2>Startup</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        </div>

        <div className="category_items">
            <div className="category_icon">
            <img src={economyCategory} alt="" />
            </div>

            <h2>Economy</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        </div>

        <div className="category_items">
            <div className="category_icon">
            <img src={cyborgCategory} alt="" />
            </div>

            <h2>Technology</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        </div>
    </div>
  )
}

export default Category
