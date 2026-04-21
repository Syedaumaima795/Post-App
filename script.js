// Sign Up Logic
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let newUser = {
    name: document.getElementById('regUser').value,
    pass: document.getElementById('regPass').value
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  Swal.fire({
    title: '🎉 Done!',
    text: '✅ Account created successfully 🚀',
    icon: 'success',
    confirmButtonColor: '#FE7B92',
    background: 'rgba(18, 6, 28, 0.95)',
    color: '#ffffff'
  }).then(() => window.location.href = 'login.html');
});

// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  let u = document.getElementById('loginUser').value;
  let p = document.getElementById('loginPass').value;
  let users = JSON.parse(localStorage.getItem('users')) || [];

  let found = users.find(user => user.name === u && user.pass === p);
  if (found) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', u);
    Swal.fire({
      title: '👋 Welcome back!',
      text: '🎯 You are signed in successfully 🚀',
      icon: 'success',
      confirmButtonColor: '#FE7B92',
      background: 'rgba(18, 6, 28, 0.95)',
      color: '#ffffff'
    }).then(() => window.location.href = 'app.html');
  } else {
    Swal.fire({
      title: '❌ Invalid details',
      text: '⚠️ Please check your username and password 😕',
      icon: 'error',
      confirmButtonColor: '#CA00FF',
      background: 'rgba(18, 6, 28, 0.95)',
      color: '#ffffff'
    });
  }
});

// Logout Logic
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
});

var editIndex = null;
var cardBg = "";
var time = moment().format("MMMM Do YYYY, h:mm:ss a");

// EDIT
function editPost(btn) {
  var card = btn.parentNode.parentNode;
  var id = card.getAttribute('data-id');

  var allposts = JSON.parse(localStorage.getItem("posts")) || [];
  var index = allposts.findIndex(post => post.id == id);

  if (index !== -1) {
    var post = allposts[index];

    document.getElementById("title").value = post.title;
    document.getElementById("description").value = post.description;

    editIndex = index;

    Swal.fire({
      icon: "info",
      title: "✏️ Editing Mode",
      text: "📝 Now update your post and click POST button",
      confirmButtonText: "👍 Got it!",
      confirmButtonColor: "#FE7B92",
      background: "rgba(18, 6, 28, 0.95)",
      color: "#ffffff"
    });
  }
}

// render
function rederPost() {
  var posts = document.getElementById("posts");
  posts.innerHTML = "";
  var allposts = JSON.parse(localStorage.getItem("posts")) || [];
  for (var i = allposts.length - 1; i >= 0; i--) {
    var post = allposts[i];
    posts.innerHTML += `
  <div class="card mb-2 mt-4 one" data-id="${post.id}">
    <div class="card-header textcol">
      ${localStorage.getItem("currentUser")} <br>
      <small style="color:#6e8692;">${post.time || time}</small>
    </div>
    <div class="card-body p-2" style="background-image:url(${cardBg}); background-size:cover;">
      <blockquote class="blockquote">
        <p class="p-2" textcol>${post.title}</p>
        <footer class="blockquote-footer p-2 card-text">${post.description}</footer>
      </blockquote>
    </div>
    <div class="d-flex gap-4 ms-auto mt-1 mb-1 ">
      <button class="btn p-2 m-2 w-100 btn-success editBtn" onclick="editPost(this)">
        ✏️ Edit
      </button>
      <button class="btn p-2 m-2 w-100 btn-danger delectBtn" onclick="delPost(this)">
        🗑️ Delete
      </button>
    </div>
    
  </div>
  `;
  }
}

// POST FUNCTION
function post() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");

  if (title.value.trim() && description.value.trim()) {
    var allposts = JSON.parse(localStorage.getItem("posts")) || [];

    if (editIndex !== null) {
      var updatedPost = {
        id: allposts[editIndex].id,
        title: title.value,
        description: description.value,
        time: moment().format("MMMM Do YYYY, h:mm:ss a")
      };

      allposts.splice(editIndex, 1, updatedPost);
      editIndex = null;

    } else {
      var postobj = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        time: moment().format("MMMM Do YYYY, h:mm:ss a")
      };
      allposts.push(postobj);
    }

    localStorage.setItem("posts", JSON.stringify(allposts));
    rederPost();
  }

  title.value = "";
  description.value = "";
}

// DELETE
function delPost(btn) {
  var card = btn.parentNode.parentNode;
  var id = card.getAttribute('data-id');

  Swal.fire({
    title: "⚠️ Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FE7B92",
    cancelButtonColor: "#d33",
    confirmButtonText: "🗑️ Yes, delete it!",
    background: "rgba(18, 6, 28, 0.95)",
    color: "#ffffff"
  }).then((result) => {
    if (result.isConfirmed) {
      var allposts = JSON.parse(localStorage.getItem("posts")) || [];
      var index = allposts.findIndex(post => post.id == id);
      if (index !== -1) {
        allposts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(allposts));
        rederPost();
      }
    }
  });
}

// IMAGE
function addImg(src) {
  cardBg = src;
  var bgImg = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].className = "bgImg";
  }
  event.target.classList.add("addImg");
}
