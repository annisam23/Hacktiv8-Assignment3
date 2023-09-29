document.addEventListener("DOMContentLoaded", function () {
    const productTableBody = document.getElementById("product-table-body");

    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((product) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td id="id">${product.id}</td>
                    <td id="title">${product.title}</td>
                    <td id="price">${product.price}</td>
                    <td id="category">${product.category}</td>
                    <td class="">
                        <div class="text-center">
                        <a href="#" class="btn btn-success mb-2" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                        </a>
                        <a href="#" class="btn btn-warning mb-2" onclick="updateProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="btn btn-danger mb-2" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </a>
                        </div>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

function viewProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.style.display = "flex";
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h2 class="heading-detail">Detail Produk</h2>
                    <p>ID: ${product.id}</p>
                    <p>Name: ${product.title}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Description: ${product.description}</p>
                    <p>Rating: ${product.rating.rate}</p>
                    <img src="${product.image}">
                </div>
            `;
            document.body.appendChild(modal);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}

function closeModal() {
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.remove();
    }
}

function updateProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.style.display = "flex";
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h2 class="heading-detail">Edit Produk</h2>
                    <form id="update-form">
                        <input type="number" name="id" value="${product.id}">
                        <label for="title">Name:</label>
                        <input type="text" id="title" name="title" value="${product.title}"><br>
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" value="${product.price}"><br>
                        <label for="category">Category:</label>
                        <input type="text" id="category" name="category" value="${product.category}"><br>
                        <label for="description">Descricption:</label>
                        <input type="text" id="description" name="description" value="${product.description}"><br>
                        <label for="rating">Rating:</label>
                        <input type="text" id="rating" name="rating" value="${product.rating.rate}"><br>
                        <label for="image">Image:</label>
                        <input type="text" id="image" name="image" value="${product.image}"><br>
                        <button type="button" onclick="submitUpdateForm()">Save</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}

function submitUpdateForm() {
    const updateForm = document.getElementById("update-form");
    const formData = new FormData(updateForm);
    const productId = formData.get("id");

    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then(() => {
        const successMessage = `Product with ID ${productId} was updated successfully`;
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("update-alert");
        alertDiv.textContent = successMessage;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);

        closeModal();
    })
    .catch((error) => {
        console.error("Error updating product:", error);
    });
}


function deleteProduct(productId) {
    const confirmationMessage = `Are you sure want to delete this product with ID ${productId}`;
    
    if (confirm(confirmationMessage)) {
        fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status === 200) {
                const successMessage = `Product with ID ${productId} was deleted successfully.`;
                const alertDiv = document.createElement("div");
                alertDiv.classList.add("confirmation-alert");
                alertDiv.textContent = successMessage;
                document.body.appendChild(alertDiv);

                setTimeout(() => {
                    alertDiv.remove();
                }, 3000);
            } else {
                console.error(`Failed to delete product with ID ${productId}.`);
            }
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
        });
    }
}

function addData() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "flex";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2 class="heading-detail">Tambah Data Baru</h2>
            <form id="add-form">
                <label for="title">Name:</label>
                <input class="form-control" type="text" id="title" name="title" required><br>
                <label for="price">Price:</label>
                <input class="form-control" type="number" id="price" name="price" required><br>
                <label for="category">Category:</label>
                <input class="form-control" type="text" id="category" name="category" required><br>
                <label for="description">Descricption:</label>
                <input class="form-control" type="text" id="description" name="description" required><br>
                <label for="rating">Rating:</label>
                <input class="form-control" type="text" id="rating" name="rating" required><br>
                <label for="image">Image:</label>
                <input class="form-control" type="text" id="image" name="image" required><br>
                <button type="button" onclick="validateAndSubmitForm()">Add</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function validateAndSubmitForm() {
    const form = document.getElementById("add-form");
    const requiredFields = form.querySelectorAll('[required]');
    let allFieldsFilled = true;
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            allFieldsFilled = false;
            field.classList.add("empty-field");
        } else {
            field.classList.remove("empty-field");
        }
    });

    if (allFieldsFilled) {
        submitAddForm();
    } else {
        alert("Please fill in all required fields.");
    }
}

function submitAddForm() {
    const addForm = document.getElementById("add-form");
    const formData = new FormData(addForm);
    fetch(`https://fakestoreapi.com/products`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((newProduct) => {
        //alert("New product added successfully");
        addProductToTable(newProduct);
        closeModal();
    })
    .catch((error) => {
        console.error("Error adding new product:", error);
    });
}

function addProductToTable(product) {
    const productTableBody = document.getElementById("product-table-body");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td id="id">${product.id}</td>
        <td id="title">${product.title}</td>
        <td id="price">${product.price}</td>
        <td id="category">${product.category}</td>
        <td>
        <div class="text-center">
            <a href="#" class="btn btn-success" onclick="viewProduct(${product.id})">
            <i class="fas fa-eye"></i>
            </a>
            <a href="#" class="btn btn-warning" onclick="updateProduct(${product.id})">
                <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">
                <i class="fas fa-trash"></i>
            </a>
            </div>
        </td>
    `;
    productTableBody.appendChild(row);
}

