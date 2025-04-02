document.addEventListener("DOMContentLoaded", async () => {
    const listaUsuarios = document.getElementById("listaUsuarios");
    const loadingMessage = document.getElementById("loadingMessage");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        const usersWithDetails = users.map(user => {
            const age = Math.floor(Math.random() * 43) + 18; 
            const imgSrc = `./assets/img/${user.id}.jpeg`; 
            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;

            return { ...user, age, imgSrc, address };
        });

        listaUsuarios.innerHTML = usersWithDetails.map(({ name, age, username, imgSrc, phone, email, company, address }) => `
            <li class="usuario-card">
                <img src="${imgSrc}" alt="Foto de ${name}" class="usuario-img">
                <div class="usuario-info">
                    <h2>${name} (${age} años)</h2>
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Teléfono:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Empresa:</strong> ${company.name}</p>
                    <p><strong>Dirección:</strong> ${address}</p>
                </div>
            </li>
        `).join("");

        loadingMessage.style.display = "none";

    } catch (error) {
        console.error("Error obteniendo los usuarios:", error);
        loadingMessage.textContent = "Error al cargar los usuarios.";
    }
});