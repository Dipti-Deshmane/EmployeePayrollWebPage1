
function getData() {
    $.ajax({
        url: 'http://localhost:3000/employee',
        type: 'GET',
        success: function (data) {
            console.log(data);
            displayEmployeeData(data);
            alert("Data fetched successfully");
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function openEmployeeForm() {
    localStorage.setItem('formAction', 'add');
    console.log('formAction set to add');
    window.location.href = "EmployeeForm.html";
}

function postData(employee) {
    $.ajax({
        url: 'http://localhost:3000/employee',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (newEmployee) {
            console.log(newEmployee);
            addEmployeeToTable(newEmployee);
            alert("Data posted successfully");
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function displayEmployeeData(data) {
    const table = document.querySelector('.tableContainer tbody');

    // Clear existing table rows
    table.innerHTML = '';

    // Loop through the data and add rows to the table
    data.forEach(employee => {
        addEmployeeToTable(employee);
    });
}

function addEmployeeToTable(employee) {
    const table = document.querySelector('.tableContainer tbody');
    const row = table.insertRow();

    row.innerHTML = `
        <td><img class="proImg" src="${employee.profileImage}"></td>
        <td>${employee.name}</td>
        <td>${employee.gender}</td>
        <td>${employee.departments}</td>
        <td>${employee.salary}</td>
        <td>${employee.start_date}</td>
        <td>
            <i class="fa-solid fa-trash"></i>
            <i class="fa-solid fa-pen" data-employee-id="${employee.id}"></i>
        </td>
    `;

    row.querySelector(".fa-trash").addEventListener("click", function () {
        var employeeId = employee.id; 
        $.ajax({
            url: 'http://localhost:3000/employee/' + employeeId,
            type: 'DELETE',
            success: function (data) {
                console.log(data);
                row.remove();
                alert("Data deleted successfully");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    row.querySelector(".fa-pen").addEventListener("click", function () {
        var employeeId = employee.id;
      window.location.href= `EmployeeForm.html?id=${employeeId}`;

    localStorage.setItem('formAction', 'edit');
    localStorage.setItem('editEmployeeId', employeeId);
    });
    
}
function adjustButtonVisibility() {
    const formAction = localStorage.getItem('formAction');
    console.log('formAction:', formAction);

    if (formAction === 'add') {
        console.log('Adjusting buttons for add action');
        document.getElementById("submitbtn").style.display = "block";
        document.getElementById("resetbtn").style.display = "block";
        document.getElementById("updatebtn").style.display = "none";
        document.getElementById("cancelbtn").style.display = "block";
    } else if (formAction === 'edit') {
        console.log('Adjusting buttons for edit action');
        document.getElementById("submitbtn").style.display = "none";
        document.getElementById("resetbtn").style.display = "block";
        document.getElementById("updatebtn").style.display = "block";
        document.getElementById("cancelbtn").style.display = "block";
    }
}
window.addEventListener('load', adjustButtonVisibility);

$(document).ready(function () {
    getData();
    
});
