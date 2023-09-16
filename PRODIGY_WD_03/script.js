let submit = document.getElementById("button");
let currentID = 1; // Variable to track the current unique ID for new cards

// Function to save the to-do items in local storage
const saveToDos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to retrieve the to-do items from local storage
const getToDos = () => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
};

submit.addEventListener("click", () => {
    let input = document.getElementById("note").value;

    let div = document.createElement("div");
    div.classList.add("container");

    let pTag = document.createElement("p");
    pTag.classList.add("my-note");
    pTag.textContent = input;
    div.appendChild(pTag);

    let status = document.createElement("p");
    status.textContent = "Status: Pending";
    div.appendChild(status);

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    div.appendChild(removeBtn);

    let markCompleteBtn = document.createElement("button");
    markCompleteBtn.classList.add("mrk")
    markCompleteBtn.textContent = "Mark Completed";
    div.appendChild(markCompleteBtn);

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit Note";
    div.appendChild(editBtn);

    let isCompleted = false;
    let cardID = currentID; // Assign the current unique ID to the card
    currentID++; // Increment the unique ID for the next card

    markCompleteBtn.addEventListener("click", () => {
        isCompleted = !isCompleted;

        if (isCompleted) {
            status.textContent = "Status: Completed";
        } else {
            status.textContent = "Status: Pending";
        }
    });

    removeBtn.addEventListener("click", () => {
        div.remove();
        // Update and save the to-do items in local storage after removing an item
        const todos = getToDos().filter((todo) => todo.id !== cardID);
        saveToDos(todos);
    });

    editBtn.addEventListener("click", () => {
        pTag.contentEditable = true;
        pTag.focus();

        let saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        div.appendChild(saveBtn);

        saveBtn.addEventListener("click", () => {
            pTag.contentEditable = false;
            saveBtn.remove();

            // Update and save the to-do items in local storage after editing an item
            const todos = getToDos().map((todo) => {
                if (todo.id === cardID) {
                    return { id: cardID, note: pTag.textContent };
                }
                return todo;
            });
            saveToDos(todos);
        });
    });

    let container = document.getElementById("todo-container");
    container.appendChild(div);

    document.getElementById("note").value = "";

    // Add the new item to the existing to-do items and save in local storage
    const todos = getToDos();
    todos.push({ id: cardID, note: input });
    saveToDos(todos);
});

// Retrieve the saved to-do items from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
    const todos = getToDos();
    todos.forEach((todo) => {
        let div = document.createElement("div");
        div.classList.add("container");

        let pTag = document.createElement("p");
        pTag.classList.add("my-note");
        pTag.textContent = todo.note;
        div.appendChild(pTag);

        let status = document.createElement("p");
        status.textContent = "Status: Pending";
        div.appendChild(status);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        div.appendChild(removeBtn);

        let markCompleteBtn = document.createElement("button");
        markCompleteBtn.classList.add("mrk")
        markCompleteBtn.textContent = "Mark Completed";
        div.appendChild(markCompleteBtn);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit Note";
        div.appendChild(editBtn);

        let isCompleted = false;
        let cardID = todo.id; // Retrieve the unique ID for the card

        markCompleteBtn.addEventListener("click", () => {
            isCompleted = !isCompleted;

            if (isCompleted) {
                status.textContent = "Status: Completed";
            } else {
                status.textContent = "Status: Pending";
            }
        });

        removeBtn.addEventListener("click", () => {
            div.remove();
            // Update and save the to-do items in local storage after removing an item
            const updatedTodos = getToDos().filter((todoItem) => todoItem.id !== cardID);
            saveToDos(updatedTodos);
        });

        editBtn.addEventListener("click", () => {
            pTag.contentEditable = true;
            pTag.focus();

            let saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            div.appendChild(saveBtn);

            saveBtn.addEventListener("click", () => {
                pTag.contentEditable = false;
                saveBtn.remove();

                // Update and save the to-do items in local storage after editing an item
                const updatedTodos = getToDos().map((todoItem) => {
                    if (todoItem.id === cardID) {
                        return { id: cardID, note: pTag.textContent };
                    }
                    return todoItem;
                });
                saveToDos(updatedTodos);
            });
        });

        let container = document.getElementById("todo-container");
        container.appendChild(div);
    });
});