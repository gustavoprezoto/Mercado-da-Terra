function generateId() {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    return id;
}

// Função para armazenar um novo usuário com ID gerado
function storeUser() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var date = new Date().toLocaleString();

    if (name && email) {
        var id = generateId(); // Obtém um ID único
        var user = {
            id: id,
            name: name,
            email: email,
            date: date
        };

        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        displayUsers(); // Atualiza lista na interface
        clearFields(); // Limpa campos do formulário
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function displayUsers() {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';

    var users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(function(user, index) {
        var li = document.createElement('li');
        li.innerHTML = `${user.id} - ${user.date} - ${user.name} - ${user.email} <button onclick="deleteUser(${index});">Excluir</button>`;
        userList.appendChild(li);
    });
}

function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function deleteUser(index) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

function deleteAllUsers() {
    localStorage.removeItem('users');
    displayUsers();
}

function searchUsers() {
    var searchValue = document.getElementById('search').value.toLowerCase();
    var userList = document.getElementById('userList');
    userList.innerHTML = '';

    var users = JSON.parse(localStorage.getItem('users')) || [];

    users.filter(function(user) {
        return user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue);
    }).forEach(function(user, index) {
        var li = document.createElement('li');
        li.innerHTML = `${user.date} - ${user.name} - ${user.email} <button onclick="deleteUser(${index});">Excluir</button>`;
        userList.appendChild(li);
    });
}

window.onload = displayUsers;
