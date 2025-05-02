document.getElementById("aboutForm").addEventListener("submit", function(event){
    event.preventDefault(); 
    const name=document.getElementById("name").value;
    const bio=document.getElementById("bio").value;
    const hobbies=document.getElementById("hobbies").value.split(',');
    document.getElementById("displayName").textContent = name;
    document.getElementById("displayBio").textContent = bio;
    const hobbyList = document.getElementById("displayHobbies");
    hobbyList.innerHTML = ""; 
    hobbies.forEach(hobby => {
      const li = document.createElement("li");
      li.textContent = hobby.trim();
      hobbyList.appendChild(li);
    });
    document.getElementById("result").classList.remove("hidden");
  });
  
