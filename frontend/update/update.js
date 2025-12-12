

function updateTask(){
   // DEF: take the Id params form the page :
   const id = new URL(window.location).pathname.split("/").pop()
   
      const formEl = document.querySelector("form");
      const titleEl = formEl.querySelector("#title")
      const descriptionEl = formEl.querySelector("#description");
      
      // DEF: GET the old data to put it in the placeholder:

      fetch(`http://localhost:5000/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
         titleEl.placeholder = data.title
         descriptionEl.placeholder = data.description
      })

      // DEF: add the Eventlistener for the form:
      formEl.addEventListener("submit", (e)=>{
         e.preventDefault();
         const updateTitle = titleEl.value;
         const updateDescription = descriptionEl.value;

         // DEF: PUT the new data on the database :
         fetch(`http://localhost:5000/api/tasks/update/${id}`,{
            method: "PUT",
            headers:{
               "Content-Type": "application/json"
            },
            body : JSON.stringify({ 
                  title: updateTitle,
                  description: updateDescription
               })
            })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               if(data.errors){
                  alert(data.errors[0].msg)
               }else{
                  // DEF : return to the home page after the put request:
                  window.location.href = "/tasks"
               }
            })
})}


updateTask()