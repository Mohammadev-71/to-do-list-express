

const bodyEl = document.querySelector("body");
const tasksEl = document.getElementById("my-tasks")
const addBtn = document.createElement("button");
addBtn.innerHTML = `<a href="http://localhost:5000/tasks/add">Add</a>`;
function fetchTasks(){
   fetch("http://localhost:5000/api/tasks")
   .then(res => res.json())
   .then(data=>{
      console.log(data);
      data.forEach(task => {
         const taskEl = document.createElement("div");
         taskEl.classList.add("task");
         const titleEl = document.createElement("div");
         titleEl.classList.add("title")
         const nameEl = document.createElement("p");
         nameEl.classList.add("name");
         nameEl.innerText = task.title;
         const completedBtn = document.createElement("button");
         completedBtn.classList.add("completed");
         completedBtn.innerHTML = `<a href=""><i class="fa-solid fa-circle-check"></i></a>`
         const descriptionEl = document.createElement("div");
         descriptionEl.classList.add("description");
         const descriptionText = document.createElement("p");
         descriptionText.innerText = task.description;
         const deletebtn = document.createElement("button");
         const updatbtn = document.createElement("button");
         deletebtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
         updatbtn.innerHTML = `<a href="http://localhost:5000/tasks/update/${task._id}"><i class="fa-regular fa-pen-to-square"></i></a>`
         deletebtn.classList.add("delete");
         updatbtn.classList.add("update");
         taskEl.appendChild(titleEl);
         taskEl.appendChild(descriptionEl);
         titleEl.appendChild(nameEl);
         descriptionEl.appendChild(descriptionText);
         titleEl.appendChild(deletebtn);
         titleEl.appendChild(updatbtn);
         titleEl.appendChild(completedBtn);
         tasksEl.appendChild(taskEl)
         completedFunction(task.completed, completedBtn)
         completedBtn.addEventListener("click", ()=>{
            const iconEl = completedBtn.querySelector("i");
            if(task.completed){
               changeCompleted(task._id, false)
            }else{
               changeCompleted(task._id, true)
            }
         });
         deletebtn.addEventListener("click",()=>{
            deleteTask(task._id);
            location.reload();
         })
      });
   })
};
bodyEl.appendChild(tasksEl)
bodyEl.appendChild(addBtn)

fetchTasks();

function completedFunction(task, complete){
   if(task){
      const iconEl = complete.querySelector("i");
      iconEl.style.color = "green";
   };
};



function changeCompleted(id, isCompleted){
   fetch(`http://localhost:5000/api/tasks/update/${id}`,{
      method: "PUT",
      headers:{
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: isCompleted })
   }).then(res => res.json()).then(data => console.log(data))
};



function deleteTask(task){
   fetch(`http://localhost:5000/api/tasks/${task}`, {
      method: "DELETE",
   }).then(res => res.json()).then(data => console.log(data))
}