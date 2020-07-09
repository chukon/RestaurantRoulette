// src/components/main/main_page.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchYelpRestaurant } from "../../actions/restaurant_actions";
import { fetchCategories } from "../../actions/category_actions"
import Modal from "../modal/modal";
import { openModal } from "../../actions/modal_actions";

import "./main_page.scss"

function MainPage() {
  const dispatch = useDispatch();
  
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [category, setCategory] = useState("");
  const [[latitude, longitude], setLocation] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);

  function selectCategories(state) {
    return state.categories;
  }
  
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (!Object.values(categories).length) {
      dispatch(fetchCategories());
    } 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLocation([position.coords.latitude, position.coords.longitude]),
        () => dispatch(openModal('geo'))
      );  
    }
    else {
      dispatch(openModal('geo'))
    }
    ;
  }, []);


  const updateAutoComplete = (input, categories) => {
    if (input.length && Object.values(categories).length) {
      const similarCategories = [];
      for (let title in categories) {
        const alias = categories[title].alias;
        const includeTitle = title.toLowerCase().includes(input.toLowerCase());
        const includeAlias = alias.toLowerCase().includes(input.toLowerCase());
        if (includeTitle || includeAlias) {
          similarCategories.push(categories[title]);
        }
      }
      
      setAutoComplete(similarCategories);
    }

    return input;
  };

  useEffect(() => {
    updateAutoComplete(categoryInput, categories);
  }, [categoryInput]);



  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchYelpRestaurant({ 
      categories: category, latitude, longitude
    }));
    dispatch(openModal('restaurant'));
  }

  
  function handleAutoCompleteClick(category) {
    return (e) => {
      setAutoComplete([]);
      setCategoryInput('');
      setCategoryDisplay(e.target.textContent);
      setCategory(`${category.alias}`);
    }
  }
  
  function handleAutoCompleteSelection(e) {
    if (e.key === 'Enter') {
      setCategoryInput(e.target.value.toLowerCase())
    }
  }

  return (
    <div className="main-page">
      <Modal
        reroll={() => {
          dispatch(fetchYelpRestaurant({ 
            categories: category, latitude, longitude
          }));
        }}
      />

      <h1>RR Incorporated</h1>
       
      <div>
        <div>
          Category: {`${categoryDisplay}`}
        </div>
        
        <form>
          <input
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value.toLowerCase())}
          />

          <ul>
            {
              autoComplete.map( category => {
                return (
                  <li
                    key={category.title}
                    onClick={handleAutoCompleteClick(category)}
                    onKeyPress={handleAutoCompleteSelection}
                  >
                    {`${category.title} (${category.alias})`}
                  </li>
                )
              })
            }
          </ul>
        </form>

        <button onClick={handleSubmit}>
            Spin the Wheel
        </button>
      </div>
      
      <footer>Copyright &copy; 2020 Restaurant Roulette</footer>
    </div>
  );
}

export default MainPage;
