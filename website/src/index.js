
const getInputValue = (id) => {
  return document.getElementById(id).value;
}
const confirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
}

async function addUser() {
  if (!confirmPassword(getInputValue('userPassword'), getInputValue('userPasswordConfirm'))) {
    alert('Password does not match');
    return;
  }
  const body = {
    name: getInputValue('userName'),
    email: getInputValue('email'),
    password: getInputValue('userPassword'),
  };
  const req = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  // const res = await req.json();
  const res = await req;
  console.log(res);
}

async function deleteUser() {
  const userId = getInputValue('userId');
  const req = await fetch('http://localhost:3000/users/' + userId, {
    method: 'DELETE',
  });
  // const res = await req.json();
  const res = await req;
  console.log(res);
}

(function getAllTables() {
  fetch('http://localhost:3000/tables')
    .then((res) => res.json())
    .then((data) => {
      const navbar = document.getElementById('navbar');
      data.forEach((table) => {
        navbar.innerHTML += `<a class="mx-2 cursor-pointer" onclick="selectTable('${table.name}')">${table.name}</a>`;
      });
    });
})()
function selectTable(tableName) {
  fetch('http://localhost:3000/columns/' + tableName)
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById('tableView');
      table.innerHTML = '';
      table.style = 'display: grid; grid-template-columns: repeat(' + data.length + ', 1fr);';
      // headers.classList.add('flex');
      data.forEach((row) => {
        table.innerHTML += `<div id="col_${row.name}" class="mx-2">${row.name}</div>`;
      });
      getTableData(tableName);
    });
}
function getTableData(tableName) {
  fetch('http://localhost:3000/rows/' + tableName)
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById('tableView');
      data.forEach((row) => {
        Object.values(row).forEach((value) => {
          table.innerHTML += `<div class="mx-2">${value}</div>`;
        });
      });
    });
}