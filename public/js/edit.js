const URI = location.href.replace("edit", "api/v1/tasks");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const completedCheckbox = document.querySelector("#completed");
const imageUrl = document.querySelector("#imgUrl");
const updateTaskForm = document.forms["update_task_form"];

const getSingleTask = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

(async function () {
  try {
    const { title, description, completed, imgUrl } = await getSingleTask(URI);
    titleInput.value = title;
    imageUrl.value = imgUrl;
    descriptionInput.value = description;
    completedCheckbox.checked = completed;
  } catch (error) {
    console.log(error);
  }
})();

updateTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const update = {
    title: titleInput.value,
    description: descriptionInput.value,
    completed: completedCheckbox.checked,
  };
  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(update),
  };

  fetch(URI, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        const completeEle = document.createElement("p");
        const textElement = document.createTextNode(
          "Task successfully updated."
        );
        completeEle.id = "alertText";
        completeEle.appendChild(textElement);
        document.body.appendChild(completeEle);
        // location.pathname = "/";
      } else {
        alert(data.message);
      }
    });
});
