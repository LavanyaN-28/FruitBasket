const form=document.querySelector('#form');
const notesList=document.getElementById('listOfNotes')
const totalNotes=document.getElementById('totalNotes')
const showNotes=document.getElementById('showing')

let count=0

function handleFormSubmit(event){
     event.preventDefault();

     const title=event.target.title.value;
     const desc=event.target.description.value;
     const notes={
        title,
        desc
     }
     axios.post('https://crudcrud.com/api/90c6145b96204b92af00a4d5927f4f26/notebooks',notes)
    .then(response => {
        displayNotes(notes)
        console.log(response.data)
    })
    .catch((error)=>{
    document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
    console.log(error)
    })

}
window.addEventListener("DOMContentLoaded",()=>{

    axios.get('https://crudcrud.com/api/90c6145b96204b92af00a4d5927f4f26/notebooks')
        .then((response) => {
            for(var i=0;i<response.data.length;i++){
                displayNotes(response.data[i]);
            } 
        })
        .catch((error) => {
            document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(error)
        })
})
function displayNotes(notes){
    const parentElement=document.getElementById('listOfNotes')
    const childElement=`<li id=${notes._id}><h2>${notes.title} </h2><p>${notes.desc}</p>
    <button onclick=deleteNotes('${notes._id}')>Delete</button></li>`
    parentElement.innerHTML=parentElement.innerHTML+childElement
    count+=1
    document.getElementById('totalNotes').value=count
    showNotes.value=count

}

function deleteNotes(notesId){
    removeFromScreen(notesId)
    axios.delete(`https://crudcrud.com/api/90c6145b96204b92af00a4d5927f4f26/notebooks/${notesId}`)
    .then(response => {removeFromScreen(notesId);
    console.log(response.data)})
    .catch((error) => {
        document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error)
    });
}
function removeFromScreen(notesId){
    const notesToBeDeleted= document.getElementById(notesId);
    if(notesToBeDeleted){
    notesList.removeChild(notesToBeDeleted);
    totalNotes.value=count-1
    showNotes.value=count-1
}
}

let search=document.getElementById('search');
search.addEventListener('keyup',searchNotes);
function searchNotes(event){
       
       let notesTitle=event.target.value.toLowerCase();
       let items = notesList.getElementsByTagName('li');
       
        let count=0
       
       //convert to an array
       Array.from(items).forEach(function(item){
           let itemName=item.firstChild.textContent
           if(itemName.toLowerCase().indexOf(notesTitle)!=-1){
               item.style.display='block'
               count+=1
           }
           else{
               item.style.display='none'
           }
       });
       showNotes.value=count
    }