const API_URL = "/api/employees";

const form = document.getElementById("employeeForm");
const employeeId = document.getElementById("employeeId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const tableBody = document.getElementById("employeeTableBody");
const formTitle = document.getElementById("formTitle");
const cancelBtn = document.getElementById("cancelBtn");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const employee = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        department: departmentInput.value.trim(),
        salary: Number(salaryInput.value)
    };

    const id = employeeId.value;
    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Request failed");
        }

        resetForm();
        await loadEmployees();
        alert(id ? "Employee updated successfully." : "Employee added successfully.");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

async function loadEmployees() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load employees.");
        }

        const employees = await response.json();
        tableBody.innerHTML = "";

        employees.forEach(employee => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${escapeHtml(employee.name)}</td>
                <td>${escapeHtml(employee.email)}</td>
                <td>${escapeHtml(employee.department)}</td>
                <td>₹${Number(employee.salary).toFixed(2)}</td>
                <td>
                    <button onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="danger" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        tableBody.innerHTML =
            `<tr><td colspan="6">Unable to connect to the backend.</td></tr>`;
    }
}

async function editEmployee(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Employee not found.");
        }

        const employee = await response.json();

        employeeId.value = employee.id;
        nameInput.value = employee.name;
        emailInput.value = employee.email;
        departmentInput.value = employee.department;
        salaryInput.value = employee.salary;

        formTitle.textContent = "Update Employee";
        cancelBtn.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        alert(error.message);
    }
}

async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete employee.");
        }

        await loadEmployees();
        alert("Employee deleted successfully.");
    } catch (error) {
        alert(error.message);
    }
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
    form.reset();
    employeeId.value = "";
    formTitle.textContent = "Add Employee";
    cancelBtn.classList.add("hidden");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadEmployees();
