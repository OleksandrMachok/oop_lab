
let state = { loadedUsers: [], editTable: false, sortedAsc: true };

function init() {
  const root = document.getElementById('main');

  const header = document.createElement('header');
  ['User Rating','News','Contacts','About'].forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.className = 'header-btn';
    btn.onclick = () => {
      const title = document.querySelector('#content .content-title');
      if (title) title.textContent = name;
    };
    header.appendChild(btn);
  });

  const mainEl = document.createElement('main');
  mainEl.className = 'app-main';

  const leftPanel = document.createElement('div');
  leftPanel.id = 'leftPanel';
  const content = document.createElement('div');
  content.id = 'content';
  const rightPanel = document.createElement('div');
  rightPanel.id = 'rightPanel';

  [leftPanel, content, rightPanel].forEach(p => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    p.appendChild(loader);
  });

  mainEl.append(leftPanel, content, rightPanel);

  const footer = document.createElement('footer');
  const f1 = document.createElement('div');
  f1.className = 'footer-block';
  f1.innerHTML = 'Current users: <span id="current-count">0</span>';
  const f2 = document.createElement('div');
  f2.className = 'footer-block';
  f2.innerHTML = '<div>New users:</div><ul id="new-users-list"></ul>';
  footer.append(f1, f2);

  root.append(header, mainEl, footer);

  setTimeout(() => {
    content.innerHTML = '<h2 class="content-title">No users</h2>';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Get Users';
    btn.onclick = getUsersHandler;
    content.appendChild(btn);
  }, 1000);

  setTimeout(() => {
    leftPanel.innerHTML = `
      <input id="search-input" placeholder="Пошук..." />
      <button class="btn" id="search-btn">Search</button>
    `;
    document.getElementById('search-btn').onclick = () => {
      const q = document.getElementById('search-input').value.toLowerCase();
      document.querySelectorAll('#content table tbody tr').forEach(tr => {
        tr.classList.toggle('highlight', tr.textContent.toLowerCase().includes(q));
      });
    };
  }, 1000);

  setTimeout(() => {
    rightPanel.innerHTML = `
      <div>Sum: <span id="sum-value">0</span></div>
      <label><input type="checkbox" id="edit-table"> Edit table</label>
    `;
    document.getElementById('edit-table').onchange = (e) => {
      state.editTable = e.target.checked;
      renderTable();
    };
  }, 1000);

  API.getNewUsers().then(users => {
    const list = document.getElementById('new-users-list');
    users.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `${u.firstname} ${u.lastname}`;
      list.appendChild(li);
    });
  });
}

function getUsersHandler() {
  const content = document.getElementById('content');
  const btn = document.querySelector('#content .btn');
  btn.disabled = true;
  btn.textContent = 'Loading...';
  API.fetchUsers().then(users => {
    state.loadedUsers = users;
    renderTable();
  }).finally(() => {
    btn.disabled = false;
    btn.textContent = 'Get Users';
  });
}

function renderTable() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2 class="content-title">Users</h2>';

  if (!state.loadedUsers.length) {
    content.innerHTML += '<p>No users</p>';
    return;
  }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');

  const thLast = document.createElement('th');
  thLast.textContent = 'Lastname';
  thLast.className = 'sortable';
  thLast.onclick = () => {
    state.loadedUsers.sort((a,b) => a.lastname.localeCompare(b.lastname) * (state.sortedAsc ? 1 : -1));
    state.sortedAsc = !state.sortedAsc;
    renderTable();
  };
  trh.appendChild(thLast);

  ['Firstname','Score'].forEach(name => {
    const th = document.createElement('th');
    th.textContent = name;
    trh.appendChild(th);
  });

  if (state.editTable) {
    const th = document.createElement('th');
    th.textContent = 'Actions';
    trh.appendChild(th);
  }

  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  state.loadedUsers.forEach((u, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.lastname}</td><td>${u.firstname}</td><td>${u.score}</td>`;
    if (state.editTable) {
      const td = document.createElement('td');
      const del = document.createElement('button');
      del.className = 'btn btn-danger';
      del.textContent = 'Delete';
      del.onclick = () => {
        state.loadedUsers.splice(i,1);
        renderTable();
      };
      td.appendChild(del);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  content.appendChild(table);

  document.getElementById('current-count').textContent = state.loadedUsers.length;
  const sum = state.loadedUsers.reduce((a,u)=>a+u.score,0);
  document.getElementById('sum-value').textContent = sum;
}

document.addEventListener('DOMContentLoaded', init);
