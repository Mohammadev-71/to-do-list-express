

async function addTask(){
   const formEl = document.querySelector("form");
   const titleEl = formEl.querySelector("#title");
   const descriptionEl = formEl.querySelector("#description");
   const submitBtn = formEl.querySelector("button");
   // const response = await fetch("http://localhost:5000/tasks/add");
   // const data = await response.json();
      // if(data.errors){
      //    console.log(data)
      //    const bodyEl = document.querySelector("body")
      //    bodyEl.innerText = data.errors[0].msg
      //    return
      // }
   formEl.addEventListener("submit", (e)=>{
      e.preventDefault();
      const newTitle = titleEl.value;
      const newDescription = descriptionEl.value;
      fetch("http://localhost:5000/api/tasks/add", {
         method: "POST",
         headers:{
            "Content-type": "application/json",
         },
         body: JSON.stringify({
            title: newTitle,
            description: newDescription
         })
      }).then(res => res.json()).then(data => {
         
         try {
            console.log(data);
            if(data.errors){
               alert(data.errors[0].msg);
            }else{
               window.location.href = "/tasks"
            }
         } catch (error) {
            console.log(error)
         }
      });
      
   })
}

addTask()