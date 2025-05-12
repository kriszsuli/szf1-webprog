const container = document.querySelector(".container");

fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            const name = document.createElement("h2");
            name.className = "user-name";
            name.innerText = user.name;

            const username = document.createElement("p");
            username.className = "username";
            username.innerText = `@${user.username}`;

            const contactInfo = document.createElement("div");
            contactInfo.className = "contact-info";
            contactInfo.innerHTML = `
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
            <p>🌍 ${user.website}</p>
            <p>🏠 ${user.address.street}, ${user.address.suite}<br>
            ${user.address.city}, ${user.address.zipcode}</p>
        `;

            const mapContainer = document.createElement("div");
            mapContainer.className = "map-container";
            mapContainer.id = `map-${user.id}`;

            const company = document.createElement("div");
            company.className = "company";
            company.innerHTML = `
            <p>🏢 ${user.company.name}</p>
            <p>"${user.company.catchPhrase}"</p>
            <p>${user.company.bs}</p>
        `;

            card.appendChild(name);
            card.appendChild(username);
            card.appendChild(contactInfo);
            card.appendChild(mapContainer);
            card.appendChild(company);
            container.appendChild(card);

            setTimeout(() => {
                const lat = parseFloat(user.address.geo.lat);
                const lng = parseFloat(user.address.geo.lng);

                const map = L.map(`map-${user.id}`).setView([lat, lng], 5);

                L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([lat, lng]).addTo(map)
                    .bindPopup(`<b>${user.name}</b><br>${user.address.city}`)
                    .openPopup();
            }, 0);
        });
    })