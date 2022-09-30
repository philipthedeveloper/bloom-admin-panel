const URI = location.href.replace("editstore", "api/v1/products");
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const company = document.querySelector("#company");
const imageUrl = document.querySelector("#imgUrl");
const updateTaskForm = document.forms["update_task_form"];

const getSingleProduct = async (url) => {
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
    const { name, description, company, imgUrl } = await getSingleProduct(URI);
    nameInput.value = name;
    descriptionInput.value = description;
    company.value = company;
    imageUrl.value = imgUrl;
  } catch (error) {
    console.log(error);
  }
})();

updateTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const update = {
    name: nameInput.value,
    description: descriptionInput.value,
    company: company.value,
    imgUrl: imageUrl.value,
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
          "Product successfully updated."
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
