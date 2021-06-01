$(document).ready(function(){
    console.log("dom ready")
const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

const tableBody=document.getElementById('table-body');
const searchInput=document.getElementById("search-box");

fetch(url).then(resp=>resp.json()).then(data=>{
 
    data.map(({id,firstName,lastName,email,phone,description,address}) => {
        const listTds=`
        <td class="column1">${id}</td>
        <td class="column2">${firstName}</td>
        <td class="column3">${lastName}</td>
        <td class="column4">${email}</td>
        <td class="column5">${phone}</td>`;
        let trData=document.createElement("tr");
        trData.innerHTML=listTds;
        trData.className="data-row";
        tableBody.appendChild(trData) 
        //tRow=trData;
        //console.log(tRow)  
        trData.onclick=function(){          
            
            $(".data-row").removeClass("active");
            trData.classList.add("active")           
            $("#info-content").css({"display":"block"})
            var parent=document.getElementById("info-content")
            var childs=parent.childNodes;      
            childs[1].innerHTML="<b>User selected:</b>"+(firstName+" "+lastName);     
            var textArea=$("textarea")      
            textArea.text(description);         
            let {city,state,streetAddress,zip}=address;
            childs[5].innerHTML="<b>Address:</b>"+streetAddress
            childs[7].innerHTML="<b>City:</b>"+city;
            childs[9].innerHTML="<b>State:</b>"+state;
            childs[11].innerHTML="<b>Zip:</b>"+zip;
          } 
        
        
    })
})

searchInput.onkeyup=function(){
   
    const inputValue=searchInput.value.toUpperCase();
    tableRow=document.getElementsByTagName("tr");
    
    for(let i=1; i<tableRow.length; i++){
        const td=tableRow[i].getElementsByTagName("td")[1];
        if(td){
            const textValue=td.innerText;
           tableRow[i].style.display=textValue.toUpperCase().includes(inputValue)?'':'none';     
          
           
         
           
        }
    }
}
})