const todoValue = document.querySelector(".todo-name");
const todoDateTime = document.querySelector(".todo-time");
const addToDo = document.querySelector(".todo-add");

const toDoDone = document.querySelector(".btn-done");
const toDoDelete = document.querySelector(".btn-delete");

const container = document.querySelector(".show_container");

const toDo = JSON.parse(localStorage.getItem("item")) || [];

renderToDo();

function renderToDo() {
    let html = ``;

    toDo.forEach((element, i) => {
        const { name, date, time, done } = element;
        const doneStyle = done ? `style="color:green"` : ``;

        html += `<div class="todo-list" ${doneStyle}><p class="todo-list-name">${name}</p>
        <p class="todo-list-time">${date}</p>
        <p class="todo-list-time">${time}</p>
        <button class="btn-done" id="done${i}"><i class="ri-check-double-line"></i></button>
        <button class="btn-delete" id="delete${i}"><i class="ri-delete-bin-5-fill"></i></button></div>`;
    });
    container.innerHTML = html;
};

function dateTimeFormate(dateTime) {
    const [numberDate, time] = dateTime.split("T");
    const [year, month, day] = numberDate.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = `${day} ${months[parseInt(month) - 1]} ${year}`;
    return [date, time];
};

addToDo.addEventListener('click', () => {
    const name = todoValue.value;
    const dateTime = todoDateTime.value;
    const [date, time] = dateTimeFormate(dateTime);
    if (name !== `` && date && time) {
        toDo.push({ name, date, time, done: false });
        localStorage.setItem("item", JSON.stringify(toDo));
    }
    todoValue.value = ``;
    todoDateTime.value = ``;
    renderToDo();
});

container.addEventListener('click', (e) => {
    if (e.target.closest('.btn-delete')) {
        const deleteBtn = e.target.closest('.btn-delete');
        const btnId = +deleteBtn.id.replace('delete', ''); // + = parseInt(deleteBtn.id.replace('delete',''))
        toDo.splice(btnId, 1);
        localStorage.setItem("item", JSON.stringify(toDo));
    };

    if (e.target.closest('.btn-done')) {
        const doneBtn = e.target.closest('.btn-done');
        const doneId = +doneBtn.id.replace('done', '');
        toDo[doneId].done = true;
        localStorage.setItem("item", JSON.stringify(toDo));
    };

    renderToDo();
});
