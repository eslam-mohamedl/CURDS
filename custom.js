// get all data
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let btnDelate = document.getElementById("delete");

let mood = 'create';
let tmp;
// get total
function getTotal(){
    if( price.value != ""){
        
        let result  = (+price.value + +taxes.value + +ads.value) - discount.value;

        total.style.flex = "20%"; 
        total.style.background = "#27ae60"; 

        total.innerHTML = "total : " + result;
    }
    else{
        total.style.flex = "5%"; 
        total.style.background = "#e74c3c"; 
        total.innerHTML = "total : ";

    }
    
}

// create project
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)

}
else{
    dataPro = [];
}

function createPro(){
     let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
     }
    if(mood === "create"){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);

            }
    
         }
         else{
            dataPro.push(newPro);
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = "block";
            
         }
    
         
    }
    else{
          dataPro [ tmp  ] = newPro ;
     }
     
    localStorage.setItem('product', JSON.stringify(dataPro)    );
    clearData();
    showData();
}

// FUNCTION clear data

function clearData(){
    price.value = "";
    title.value = "";
    taxes.value = "";
    taxes.value = "";
    discount.value = "";
    total.innerHTML = "total :";
    count.value = "";
    category.value = "";


}

// function read

function showData(){
    
     let table = '';
     for( let i = 0; i < dataPro.length; i++){
        table += `

        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="delateItem(${i})" id="delate">delate</button></td>


    </tr>
        `
        
     }

     document.getElementById("tbody").innerHTML = table;
  if(dataPro.length > 0){
    btnDelate.style.display = "block";
  }
  else{
    btnDelate.style.display = "none";

  }
     
}

// function btnDelate

function delateItem(i){
   dataPro.splice(i,1);
   localStorage.product  = JSON.stringify(dataPro);
   showData();
}

// function clear all data

function DelateAll(){
   localStorage.clear();
   dataPro.splice(0);
   showData();
}
// function update

function update(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.value = dataPro[i].count;
    category.value = dataPro[i].category;
    count.style.display = "none";
    create.innerHTML = 'update';

    mood = 'update';

    tmp = i;
}


// get all 
let searchMood = 'title';
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

function getSearchMethod(id){
  let search = document.getElementById("search");
     if(id == "searchTitle"){
        searchMood = 'title';
        search.placeholder = "search by title";
     }
     else{
        searchMood = 'Category';
        search.placeholder = "search by Category";

     }
     search.focus();
     console.log(searchMood);
 
}

//search data
 function searchData(value){
        let table = '';

        if(searchMood == 'title'){
            for (let i = 0; i < dataPro.length; i++){
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `
    
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="delateItem(${i})" id="delate">delate</button></td>
            
            
                </tr>
                    `
                }
              
            }
        }
        else{
            for (let i = 0; i < dataPro.length; i++){
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
    
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="delateItem(${i})" id="delate">delate</button></td>
            
            
                </tr>
                    `
                }
              
            }
        }
      
    
        document.getElementById("tbody").innerHTML = table;

}