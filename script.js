let taskInput = document.getElementById("taskInput");
let addbtn = document.getElementById("addbtn");
let taskList = document.getElementById("taskList");
let total = document.getElementById("total");
let doneTasks = document.getElementById("completed");
let totalTasks = 0;
let completedTasks = 0;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

 taskInput.addEventListener("keydown",function(e){

        if(e.key === "Enter"){

            addTask();
        }
    })


addbtn.addEventListener("click", function () {

    addTask();
   

});



window.addEventListener("DOMContentLoaded", function () {
    tasks.forEach((task, index) => {
        renderTasks(task, index);
        if (task.isDone) {
            completedTasks++;

        }
        else {
            totalTasks++;
        }

    });
    total.textContent = totalTasks;
    doneTasks.textContent = completedTasks;
});

function addTask(){

     let taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please Enter a task.")
        return;
    }

    let taskObj = {
        text: taskText,
        isDone: false
    };

    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(taskObj, tasks.length - 1)

    totalTasks++;
    total.textContent = totalTasks;

    taskInput.value = "";

}

function deleteTasks(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    tasks.forEach((task, i) => renderTasks(task, i));

}

function renderTasks(taskObj, index) {

    let li = document.createElement("li");
    li.style.backgroundColor = "#4d626a";
    li.className = "task";

    let span = document.createElement("span");
    span.textContent = taskObj.text;
    span.className = "taskName";

    if (taskObj.isDone) {
        li.classList.add("done");
        span.classList.add("strike")
    }

    let btndiv = document.createElement("div");
    btndiv.className = "buttons";


    let btn1 = document.createElement("button");
    btn1.textContent = "Done";

    btn1.className = "done-btn"
    btn1.addEventListener("click", function () {
        if (!li.classList.contains("done")) {
            li.classList.add("done");
            span.classList.add("strike")

            taskObj.isDone = true;
            completedTasks++;
            doneTasks.textContent = completedTasks;

            totalTasks--;
            total.textContent = totalTasks;

            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

    });
    let btn2 = document.createElement("button");
    btn2.textContent = "delete";
    btn2.className = "del-btn";

    btn2.addEventListener("click", function () {

        deleteTasks(index);
    });
    li.appendChild(span);
    btndiv.appendChild(btn1);
    btndiv.appendChild(btn2);
    li.appendChild(btndiv);
    taskList.appendChild(li);


}