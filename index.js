function displayRepositories(event, data) {  
  // var repoList = repos.map(function (repo) {
  //     return repo.name,
  //            repo.html_url
  //     // return `\n<ul><li>name: ${repo.name}\
  //     //   url: ${repo.git_url}</li></ul`              
  //       })
  var repos = JSON.parse(this.responseText)  
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  var username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories)
  url = `https://api.github.com/users/${username}/repos`
  req.open("GET", url)
  req.send()
}


function displayCommits() {
  var commits = JSON.parse(this.responseText)  
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  var username = document.getElementById('username').value
  req.addEventListener("load", displayCommits)
  url = `https://api.github.com/repos/${username}/${name}/commits`
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}

function getBranches(el) {
  const name = el.dataset.repository
  const branch = el.dataset.branch
  const req = new XMLHttpRequest()
  var username = document.getElementById('username').value
  req.addEventListener("load", displayBranches)
  url = `https://api.github.com/repos/${username}/${name}/branches`
  req.open("GET", url)
  req.send()
}