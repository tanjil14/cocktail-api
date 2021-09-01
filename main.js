const searchBox=document.getElementById('input-field');
searchBox.addEventListener('keypress',(event)=>{
     if(event.key=='Enter'){
        searchMeal()
     }
})

const searchMeal=async()=>{
    const searchBox=document.getElementById('input-field');
    const searchText=searchBox.value;
    searchBox.value='';
    
    try{
        const res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
    const data=await res.json()
    displayMeal(data.drinks)
    }catch(e){
      console.log(e)
    }
}

const displayMeal=meals=>{
    const resultContainer=document.getElementById('search-result');
    resultContainer.textContent='';
    meals.forEach(meal=>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div onclick="getMealDetail('${meal.idDrink}')" class="card h-100">
        <img src="${meal.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strDrink}</h5>
          <p class="card-text">${meal.strInstructions}</p>
        </div>
      </div>`;
      resultContainer.appendChild(div);
    })
}

//for details
const getMealDetail=async(id)=>{
const URL=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
try{
    const res=await fetch(URL);
const data=await res.json()
displaySingleMeal(data.drinks[0])
}catch(e){
    console.log(e)
}
}
const displaySingleMeal=details=>{
 const singleMealContainer=document.getElementById('meal-details');
 singleMealContainer.innerHTML=` <div class="card" style="width: 24rem;">
 <img src="${details.strDrinkThumb}" class="card-img-top" alt="...">
 <div class="card-body">
   <h5 class="card-title">${details.strDrink}</h5>
   <p class="card-text">${details.strInstructions}</p>
 </div>
 <ul class="list-group list-group-flush">
   <li class="list-group-item"><span class="fw-bold">Category:</span>${details.strCategory}</li>
   <li class="list-group-item"><span class="fw-bold">Ingredient:</span>${details.strIngredient1},${details.strIngredient2},${details.strIngredient3},${details.strIngredient4}</li>
   <li class="list-group-item">
   <span class="fw-bold">Date:</span>${details.dateModified}</li>
 </ul>
 <div class="card-body">
   <a target="_blank" href="${details.strImageSource===null?'#':details.strImageSource}" class="card-link">Source</a>
 </div>
</div>`;
}