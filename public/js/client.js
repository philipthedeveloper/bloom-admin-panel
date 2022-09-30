const taskContainer = document.querySelector(".tasks");
let deleteTaskBtn;

const getAllTask = async (url) => {
  try {
    const response = await fetch(url);
    const { data } = await response.json();
    tasksGenerator(data);
  } catch (error) {
    console.log(error);
  }
};

const URI = `${window.location.href}api/v1/tasks`;
getAllTask(URI);

const taskCardContructor = ({
  _id,
  title,
  description,
  createdAt,
  completed,
  imgUrl,
}) => {
  return `
  <div class="task_card">
    <div class="task_info">
      <h2 class="title" style= "${
        completed && "text-decoration:line-through; color: darkgray"
      }">${title}</h2>
      <p class="description">${description.slice(0, 100)}...</p>
      <p class="creation_date">Created On: ${createdAt}</p>
      <p class="imageUrl">Image: ${imgUrl}</p>
    </div>
    <aside>
      <a href="/edit/${_id}">
        <i class="fi fi-sr-pencil"></i>
      </a>
      <button class="delete_task" data-id = ${_id}>
      <i class="fi fi-rr-trash"></i>
      </button>
    </aside>
  </div>
`;
};

const tasksGenerator = (data) => {
  if (data.length == 0)
    return (taskContainer.innerHTML = `<p style="color: white; font-size: 0.9rem; text-align: center">No task found in collection</p>`);
  const list = data.map((task) => taskCardContructor(task));
  taskContainer.innerHTML = list;
  deleteTaskBtn = document.querySelectorAll(".delete_task");
  deleteTaskBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const result = confirm("Are you sure you want to delete this task?");
      if (result) {
        const id = btn.dataset.id;
        const URI = `${location.href}api/v1/tasks/${id}`;
        const options = {
          method: "DELETE",
        };

        fetch(URI, options)
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              alert("Task Sucessfully deleted");
              location.reload();
              return;
            } else {
              alert(data.message);
            }
          });
      } else {
        return;
      }
    });
  });
};
