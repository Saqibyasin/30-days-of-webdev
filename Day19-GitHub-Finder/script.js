const GITHUB_API = 'https://api.github.com/users';

const usernameInput = document.querySelector('#username-input');
const searchBtn = document.querySelector('#search-btn');
const errorMsg = document.querySelector('#error-msg');
const loading = document.querySelector('#loading');
const profileCard = document.querySelector('#profile-card');
const reposSection = document.querySelector('#repos-section');
const reposList = document.querySelector('#repos-list');

const avatar = document.querySelector('#avatar');
const profileName = document.querySelector('#profile-name');
const profileUsername = document.querySelector('#profile-username');
const profileBio = document.querySelector('#profile-bio');
const profileLocation = document.querySelector('#profile-location');
const statRepos = document.querySelector('#stat-repos');
const statFollowers = document.querySelector('#stat-followers');
const statFollowing = document.querySelector('#stat-following');
const statGists = document.querySelector('#stat-gists');
const githubLink = document.querySelector('#github-link');

async function searchUser() {
    const username = usernameInput.value.trim();
    if(!username){
        usernameInput.focus();
        return;
    }
    errorMsg.classList.add('hidden');
    profileCard.classList.add('hidden');
    reposSection.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const profileRes = await fetch(`${GITHUB_API}/${username}`);
        if(!profileRes.ok) throw new Error ('User not found');
        const profileData = await profileRes.json();
        const reposRes = await fetch(`${GITHUB_API}/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposRes.json();

        displayProfile(profileData);
        displayRepos(reposData);
    }
    catch(error){
        loading.classList.add('hidden');
        errorMsg.classList.remove('hidden');
        profileCard.classList.add('hidden');
        reposSection.classList.add('hidden');
    }
}

function displayProfile(data) {
    loading.classList.add('hidden');
    profileCard.classList.remove('hidden');

    avatar.src = data.avatar_url;
    profileName.textContent = data.name || data.login;
    profileUsername.textContent = `@${data.login}`;
    profileBio.textContent = data.bio || 'No bio available';
    profileLocation.textContent = data.location
    ? `📍 ${data.location}`
    : '📍 Location not specified';
    statRepos.textContent = data.public_repos;
    statFollowers.textContent = data.followers;
   statFollowing.textContent = data.following;
    statGists.textContent = data.public_gists;
    githubLink.href = data.html_url;

}

function displayRepos(repos) {
    if(repos.length === 0)return;

    reposSection.classList.remove('hidden');
    reposList.innerHTML = '';
    repos.forEach(function(repo){
        const card = document.createElement('a');
        card.classList.add('repo-card');
        card.href = repo.html_url;
        card.target = '_blank';

        card.innerHTML = `
         <div class="repo-name">${repo.name}</div>
         <div class="repo-desc">${repo.description || 'No description'}</div>
         <div class="repo-stats">
         <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
         <span class="repo-stat">🍴 ${repo.forks_count}</span>
         ${repo.language
          ? `<span class="repo-lang">${repo.language}</span>`
          : ''}
          </div>
        `;
        reposList.appendChild(card);
    });

}


searchBtn.addEventListener('click', searchUser);
usernameInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') searchUser();
});
searchUser();