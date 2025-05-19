const container = document.querySelector(".container");

document.getElementById('submitPost').addEventListener('click', function(e) {
  e.preventDefault();
  
  const postTitle = document.getElementById('postTitle').value;
  const message = document.getElementById('message').value;
  const username = document.getElementById('username').value;
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse) {
      alert("Töltse ki a reCAPTCHA-t!");
      return;
  }

  if (message && username) {
      const postElement = document.createElement('div');
      postElement.className = 'post';

      const title = document.createElement('h3');
      title.innerText = postTitle;

      const content = document.createElement('p');
      content.innerText = message;

      const user = document.createElement('div');
      user.className = 'user';

      const image = document.createElement('img');
      image.src = "img/default.jpg";

      const usernameSpan = document.createElement('span');
      usernameSpan.innerText = username;

      user.appendChild(image);
      user.appendChild(usernameSpan);
      
      postElement.appendChild(title);
      postElement.appendChild(content);
      postElement.appendChild(user);
      
      document.querySelector('.container').prepend(postElement);
      
      document.getElementById('postTitle').value = '';
      document.getElementById('message').value = '';
      document.getElementById('username').value = '';
      grecaptcha.reset();
  }
});

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((users) => {
        posts.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.className = "post";

          const title = document.createElement("h3");
          title.innerText = post.title;

          const content = document.createElement("p");
          content.innerText = post.body;
          
          const user = document.createElement("div");
          user.className = "user";

          const image = document.createElement("img");
          image.src = "img/default.jpg";

          const username = document.createElement("span");
          const userData = users.find(u => u.id === post.userId);
          username.innerText = userData ? userData.username : "Anonymous";

          user.appendChild(image);
          user.appendChild(username);
          
          postElement.appendChild(title);
          postElement.appendChild(content);
          postElement.appendChild(user);
          
          container.appendChild(postElement);
        });
      });
  });