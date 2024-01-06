fetch("simpledata.json")
  .then((response) => response.json())
  .then((data) => {
    populateTable(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Populate table with data
function populateTable(data) {
  const tbody = document.getElementById("employeeDataBody");
  data.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td> <a href="#"> ${employee.name}</a></td>
            <td>${employee.grade}</td>
            <td>${employee.branch}</td>
            <td>${employee.address}</td>
            <td>${employee.phone}</td>
            <td>${employee.id}</td>
        `;
    row.addEventListener("click", () => displaySelectedRow(employee));
    var a = row.count;
    tbody.appendChild(row);
  });
}
// Function to display selected row in a modal
function displaySelectedRow(employee) {
  const modalBody = document.getElementById("selectedRowModalBody");

  // Clear existing content
  modalBody.innerHTML = "";

  // Add content to the modal body

  const content = document.createElement("div");
  content.innerHTML = 
        `<div class="container">
            <div class="row">
                <!-- Employee Picture: This will be on the left in desktop view and top in mobile view -->
                <div class="col-md-4 col-12">
                <img id="employeePicture" src="images/judgepic 6-3-2023/${employee.timerank}" alt="Picture place" class="fixed-size-image">
                </div>
                <!-- Employee Details: This will take the remaining space on the right in desktop view and be below the image in mobile view -->
                <div class="col-md-8 col-12">
                <h2 id="employeeName">${employee.name}</h2>
                <p id="employeeDegree">  الدرجة : ${employee.grade}</p>
                <hr>
                <p id="employeeNumber">  رقم التعريف : ${employee.id}</p>
                <p> الفرع : ${employee.branch}</p>
                <div class="row">
                    <div class="col-6">
                    <p id="employeeAddress">  العنوان : ${employee.address}</p>
                    </div>
                    <div class="col-6">
                    <p id="employeePhone">رقم الهاتف 0${employee.phone}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>`;

    // Add the content to the modal body
  modalBody.appendChild(content);

  // Show the modal
  const modal = new bootstrap.Modal(
    document.getElementById("selectedRowModal")
  );
  modal.show();
}

function filterTable() {
  var input,
    filter,
    table,
    tr,
    td,
    i,
    j,
    txtValue,
    found,
    count = 0;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeDataBody");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    found = false;
    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          found = true;
          break; // Found a match in this row, no need to check further
        }
      }
    }
    if (found) {
      tr[i].style.display = "";
      count++; // Increment the count for a visible row
    } else {
      tr[i].style.display = "none";
    }
  }

  // Update the count display
  document.getElementById("filteredRowCount").innerText =
    "عدد النتائج: " + count;
}

document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here
  var tableRow = document.getElementById("myTableRow");
  var paragraphElement = tableRow.querySelector("p");
  var newData = "New content for the paragraph";
  paragraphElement.innerText = newData;
});

function saveToPhone() {
  // Assume an employee object is available from the modal's context
  const employee = {
    name: document.getElementById("employeeName").innerText,
    phone: document.getElementById("employeePhone").innerText,
    address: document.getElementById("employeeAddress").innerText,
    id: document.getElementById("employeeNumber").innerText,
    grade: document.getElementById("employeeDegree").innerText,
    // Add more fields as necessary
  };

  // Convert employee object to a vCard string
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
TEL;TYPE=WORK,VOICE:${employee.phone}
ADR;TYPE=WORK:;;${employee.address}
END:VCARD
`;

  // Convert vCard string to Blob
  const vCardBlob = new Blob([vCardData], { type: "text/vcard" });

  // Create a temporary link to trigger the download
  const tempLink = document.createElement("a");
  tempLink.href = URL.createObjectURL(vCardBlob);
  tempLink.setAttribute("download", `contact-${employee.name}.vcf`);
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}


// Function to handle the login form submission
document.addEventListener('DOMContentLoaded', (event) => {
    // Trigger the modal to show as soon as the page is fully loaded
    $('#loginModal').modal({
        backdrop: 'static',   // Disable clicking outside the modal to close it
        keyboard: false       // Disable using the keyboard to close the modal
    });
    $('#loginModal').modal('show');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
validateLogin() ;
    function validateLogin() {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;

		// Example: Replace this with your authentication logic
if (username === 'sla' && password === '18761876') {
			// Successful login, redirect to the next page
$('#loginModal').modal('hide');
		} else {
			// Invalid credentials
			alert('Invalid username or password');
		}
	}
    
;
  
});

