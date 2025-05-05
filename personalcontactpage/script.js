// Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email.");
    } else {
      document.getElementById("thankYouMsg").textContent = "Thank you, " + name + "! Your message has been sent.";
      document.getElementById("contactForm").reset();
    }
  });
  
  // To-Do List Functionality
  function addTodo() {
    const task = document.getElementById("todoInput").value.trim();
    if (task === "") {
      alert("Please enter a task.");
      return;
    }
  
    const li = document.createElement("li");
    li.textContent = task;
  
    li.addEventListener("click", () => {
      li.remove();
    });
  
    document.getElementById("todoList").appendChild(li);
    document.getElementById("todoInput").value = "";
  }
  
