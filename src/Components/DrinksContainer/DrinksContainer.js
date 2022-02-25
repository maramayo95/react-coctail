import {  useState } from 'react'
import Loading from '../Loading/Loading'
import './DrinksContainer.css'

const DrinksContainer = () => {
    
     const [drink, setDrink] = useState([])
     const [loading, setLoading ] = useState(false)

   // console.log(drink)

    

    const fetchingData =  async ()  => {
       const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
       const apiReq = await fetch(url);
       const data = await apiReq.json();
      
       const { drinks } = data 
       setLoading(true)
       setTimeout(() => {
         setDrink(drinks)
         setLoading(false)
       }, 2000);

   }

   const mostrarIngredientes = drinks =>{
    let ingredients = [];
    for(let i =1; i<16; i++){
        if(drinks[`strIngredient${i}`]){
            ingredients.push(
                <li key={drinks[`strIngredient${i}`]}>{drinks[`strIngredient${i}`]} : {drinks[`strMeasure${i}`]}</li>
            )
        }
    }
    return ingredients;
  }
    
    return (
    <div>
        <h1>Pandora's Random Drink</h1>
        <div className="btn">
          <button onClick={ fetchingData}> Click! </button>
        </div>

        { loading ? <Loading /> : 
         <section className="container">
         <div className="card">
           { 
             drink.map(
               ({idDrink, 
                 strDrink, 
                 strDrinkThumb, 
                 strInstructions,
               
               } ) =>  (
               <div key={idDrink} className="drinkCard">
                 <img src={strDrinkThumb} alt={strDrink}/>
                 <h1>{strDrink}</h1>
                 <p>{strInstructions}</p>
                 <ul>
                   {mostrarIngredientes(drink[0])}
                 </ul>
               </div>
             )
             )
           }
         </div>
       
       </section>
   

        }
       
        
    </div>
  )
}


export default DrinksContainer