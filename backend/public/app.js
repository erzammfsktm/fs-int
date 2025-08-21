const form = document.getElementById("studentForm");
const studentsList = document.getElementById("studentsList");

// Load students
async function loadStudents() {
  const res = await fetch("/students");
  const data = await res.json();
  studentsList.innerHTML = "";
  data.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} (${s.email})`;
    studentsList.appendChild(li);
  });
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    coordinator_id: document.getElementById("coordinator").value,
    faculty_supervisor_id: document.getElementById("faculty").value,
    industry_supervisor_id: document.getElementById("industry").value,
  };
  await fetch("/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  form.reset();
  loadStudents();
});

loadStudents();
