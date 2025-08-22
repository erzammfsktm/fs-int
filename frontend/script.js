const API = "http://localhost:5000"; // Later replace with Render URL

document.getElementById("studentForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(`${API}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, coordinator_id: null, faculty_supervisor_id: null, industry_supervisor_id: null })
  });

  loadStudents();
});

async function loadStudents() {
  const res = await fetch(`${API}/students`);
  const students = await res.json();
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} (${s.email})`;
    list.appendChild(li);
  });
}

loadStudents();
