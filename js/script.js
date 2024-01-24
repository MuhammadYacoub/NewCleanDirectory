// Fetch the data from "simpledata.json"
fetch("simpledata.json")
  .then(response => response.json())
  .then(data => {
    populateCards(data);
  })
  .catch(error => console.error("Error fetching data:", error));

// Define the populateCards function outside of the fetch then-clause
function populateCards(data) {
  const cardContainer = document.getElementById("employeeCardContainer");
  cardContainer.innerHTML = ""; 
  
  // Clear existing content

  // Create cards for each employee and append to the container
  data.forEach((employee, index) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    if (index > 6) {
      card.style.display = "none";
    }
    card.innerHTML = `
      <div class="card justify-content-center">
        <img src="Images/judgepic 6-3-2023/${employee.timerank}" alt="${employee.name}" onerror="this.onerror=null;this.src='Images/logo PP.png';" class="employee-photo">
            <div class="card-body">
            <h1 class="card-title">المستشار / <br> ${employee.name}</h1>

            <hr>
             <p class="card-text "> ${employee.grade}</p>
        <!-- <p class="card-text lh-base"> الفرع : ${employee.branch}</p> -->
            </div>
            <button class="btn btn-secondary btn-sm">المزيد</button>
        </div>
    `;
    cardContainer.appendChild(card);
    card.onclick = () => displaySelectedRow(employee); // Attach click event to display modal
    
  });
}



// Function to display selected row in a modal
function displaySelectedRow(employee) {
  const modalBody = document.getElementById("selectedRowModalBody");
  // Clear existing content and add new content for selected employee
  modalBody.innerHTML = `
  <div class="container">
  <div class="row">
      <!-- Employee Picture: This will be on the left in desktop view and top in mobile view -->
      <div class="col-md-4 col-12">
      <img id="employeePicture" src="Images/judgepic 6-3-2023/${employee.timerank}" alt="Picture place" onerror="this.onerror=null;this.src='Images/logo PP.png';" class="fixed-size-image">
      </div>
      <!-- Employee Details: This will take the remaining space on the right in desktop view and be below the image in mobile view -->
      <div class="col-md-8 col-12">
      <h2 id="employeeName">${employee.name}</h2>
      <p id="employeeDegree">  الدرجة : ${employee.grade}</p>
      <hr>
      <!-- <p id="employeeNumber">  رقم التعريف : ${employee.id}</p> -->
      <p> الفرع : ${employee.branch}</p> </div>
      <!-- <p class="card-text lh-base"> الأقدمية : ${employee.id}</p> -->

      <div class="col-12">
      <hr>
  <div class="row col-md-12">
          <div class="d-block p-2 col-6">
          <p id="employeeAddress">  العنوان : ${employee.address}</p>
          </div>
          <div class=" d-block p-2 col-6">
          <p id="employeePhone">رقم الهاتف 0${employee.phone}</p>
          </div>
      </div>
      </div>
  </div>
</div>
  `;
  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("selectedRowModal"));
  modal.show();
}

// Function to filter cards based on search input


function filterCards() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toUpperCase();
  let cardContainer = document.getElementById("employeeCardContainer");
  let cards = cardContainer.getElementsByClassName("employee-card");
  let count = 0;

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let textContent = card.textContent || card.innerText;
    if (textContent.toUpperCase().indexOf(filter) > -1) {
      card.style.display = ""; // Card matches the filter, display it
      count++;
    } else {
      card.style.display = "none"; // Card does not match the filter, hide it
    }
  }
  // Update the count display
  document.getElementById("filteredRowCount").innerText = "عدد النتائج: " + count;
}


// Rest of existing functions and logic, ensure they are correctly referencing updated IDs and classes
// ...

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

// dark theme


  


