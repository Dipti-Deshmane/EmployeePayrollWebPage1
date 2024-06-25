
document.getElementById('submitbtn').addEventListener("click", function () {

    let valid = true;

    const name = document.getElementById("fname").value;
    const nameRegex =/^[A-Za-z\s]+$/;
    if (name.trim() === "" || !nameRegex.test(name)) {
        document.querySelector(".name-Input-msg span").style.display = "block";
        valid=false;
    } else {
        document.querySelector(".name-Input-msg span").style.display = "none";
    }

   
    const profileImage = document.querySelector('input[name="proImg"]:checked');
    if (!profileImage) {
        document.querySelector(".profile-Input-msg span").style.display = "block";
        valid = false;
    } else {
        document.querySelector(".profile-Input-msg span").style.display = "none";
    }

    const gender = document.querySelector('input[name=fgender]:checked');
    if(!gender){
        document.querySelector(".gender-Input-msg span").style.display="block";
        valid=false;
    }else{
        document.querySelector(".gender-Input-msg span").style.display="none";
    }


    const departmentElements = document.querySelectorAll('input[name=fdepartment]:checked');
    const departments = Array.from(departmentElements).map(element => element.value);
    if (departments.length === 0) {
        document.querySelector(".depart-Input-msg span").style.display="block";
        valid=false;
    }else{
        document.querySelector(".depart-Input-msg span").style.display="none";
    }

    const salary = document.getElementById('fsalary').value;
    const salaryRegex = /^[0-9]+$/;
    if(!salary || !salaryRegex.test(salary)){
        document.querySelector(".salary-Input-msg span").style.display="block";
        valid=false;
    }else{
      
        document.querySelector(".salary-Input-msg span").style.display="none";
    }

    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    if (day === "" || month === "" || year === ""){
        document.querySelector(".startdate-Input-msg span").style.display="block";
        valid=false;
    }else{
        document.querySelector(".startdate-Input-msg span").style.display="none";
    }

    const notes = document.getElementById('fnotes').value;
    if(!notes){
        document.querySelector(".notes-Input-msg span").style.display="block";
        valid=false;
    }else{
        document.querySelector(".notes-Input-msg span").style.display="none";
    }

    if(valid){
    console.log("Name: ", name);
    console.log("Profile Image: ", profileImage.value);
    console.log("Gender: ", gender.value);
    console.log("Departments: ",  departments.join(", "));
    console.log("Salary: ", salary);
    console.log("Start Date: ", `${day} ${month} ${year}`);
    console.log("Notes: ", notes);
    }

    const employee = {
        "name": name,
        "profile_image": profileImage.value,
        "gender": gender.value,
        "departments": departments,
        "salary": salary,
         "notes": notes,
        "start_date": `${day} ${month} ${year}`
        }

    
    
        window.location.href = "EmployeeDetails.html";
    

postData(employee)


});

function postData(employee) {
    $.ajax({  
        url: 'http://localhost:3000/employee',  
        type: 'POST', 
        data: JSON.stringify(employee) ,
          success: function(data) {  
          console.log(data)   
          alert("data posted successfully")            
          }  
        });  
}

document.getElementById('updatebtn').addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const startDate = `${day} ${month} ${year}`;
    const employee = {
        "name": document.getElementById("fname").value,
        "profile_image": document.querySelector('input[name="proImg"]:checked').value,
        "gender": document.querySelector('input[name=fgender]:checked').value,
        "departments": Array.from(document.querySelectorAll('input[name=fdepartment]:checked')).map(element => element.value),
        "salary": document.getElementById('fsalary').value,
        "start_date": startDate,
    };

    $.ajax({
        url: 'http://localhost:3000/employee/' + employeeId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (updatedEmployee) {
            console.log(updatedEmployee);
            alert("Data updated successfully");
            window.location.href = "EmployeeDetails.html"; // Redirect back to EmployeeDetails page
        },
        error: function (error) {
            console.log(error);
        }
    });
});
