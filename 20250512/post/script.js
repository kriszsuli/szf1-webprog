const container = document.querySelector(".container");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    for (el in json) {
        const post = document.createElement("div");
        post.className = "post";

        const title = document.createElement("h3");
        title.innerText = json[el].title;

        const content = document.createElement("p");
        content.innerText = json[el].body;
        
        post.appendChild(title);
        post.appendChild(content);
        container.appendChild(post);
    }
  });
