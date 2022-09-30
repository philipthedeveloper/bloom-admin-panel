const productContainer = document.querySelector(".products");
let deleteProductBtn;

const getAllProduct = async (url) => {
  try {
    const response = await fetch(url);
    const { data } = await response.json();
    productsGenerator(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const URI = `${window.location.href.replace("store", "")}api/v1/products`;
getAllProduct(URI);

const productCardContructor = ({ _id, name, description, imgUrl, company }) => {
  return `
  <div class="task_card">
    <div class="task_info">
      <h2 class="name">${name}</h2>
      <p class="description">${description.slice(0, 100)}...</p>
      <p class="company">Company: ${company}</p>
      <p class="imageUrl">Image: ${imgUrl}</p>
    </div>
    <aside>
      <a href="/editstore/${_id}">
        <i class="fi fi-sr-pencil"></i>
      </a>
      <button class="delete_task" data-id = ${_id}>
      <i class="fi fi-rr-trash"></i>
      </button>
    </aside>
  </div>
`;
};

const productsGenerator = (data) => {
  if (data.length == 0)
    return (productContainer.innerHTML = `<p style="color: white; font-size: 0.9rem; text-align: center">No Product found in collection</p>`);
  const list = data.map((product) => productCardContructor(product));
  productContainer.innerHTML = list;
  deleteTaskBtn = document.querySelectorAll(".delete_task");
  deleteTaskBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const result = confirm("Are you sure you want to delete this product?");
      if (result) {
        const id = btn.dataset.id;
        const URI = `${location.href.replace(
          "store",
          ""
        )}api/v1/products/${id}`;
        const options = {
          method: "DELETE",
        };

        fetch(URI, options)
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              alert("Product Sucessfully deleted");
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
