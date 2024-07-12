document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    const API_URL = 'https://api.github.com';
    const SEARCH_USERS_URL = `${API_URL}/search/users?q=`;
    const USER_REPOS_URL = `${API_URL}/users/`;
  
    githubForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      const url = `${SEARCH_USERS_URL}${username}`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error searching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          </div>
        `;
        userList.appendChild(li);
      });
    }
  
    userList.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        const username = event.target.textContent;
        fetchUserRepos(username);
      }
    });
  
    function fetchUserRepos(username) {
      const url = `${USER_REPOS_URL}${username}/repos`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(repos => {
        displayRepos(repos);
      })
      .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.full_name;
        reposList.appendChild(li);
      });
    }
  });
  