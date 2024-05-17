document.addEventListener("DOMContentLoaded", function () {
    let meusSeguidores = []

    function carregarPerfill(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const perfilDiv = document.getElementById('perfil')
                perfilDiv.innerHTML = `
                    <h2 class="nome">${data.name}</h2>
                    <img class="perfil-img" src="${data.avatar_url}" alt="Avatar">
                    <p class="bio">${data.bio}</p>
                    
                `

                fetch(data.followers_url)
                    .then(response => response.json())
                    .then(followersData => {
                        meusSeguidores = followersData
                        exibir(meusSeguidores)
                    })
                    .catch(error => console.error('Erro ao carregar:', error))
            })
            .catch(error => console.error('Erro ao carregar perfil:', error))
    }
    function exibir(listaSeguidores) {
        const seguidoresDiv = document.getElementById('seguidores-gh')
        seguidoresDiv.innerHTML = ''

        listaSeguidores.forEach(follower => {
            seguidoresDiv.innerHTML += `
                <div class="seguidor" data-username="${follower.login}">
                    <img src="${follower.avatar_url}" alt="avatar${follower.login}">
                    <p class="seguidor-nome">${follower.login}</p>
                </div>
            `
        })
    }
    function SeguidoresDoSeguidor(username) {
        const url = `https://api.github.com/users/${username}`
        carregarPerfill(url)
    }
    function carregarUserPrincipal() {
        const url = 'https://api.github.com/users/jefersonson'
        carregarPerfill(url)
    }
    document.getElementById('seguidores-gh').addEventListener('click', function (event) {
        if (event.target.classList.contains('seguidor') || event.target.parentNode.classList.contains('seguidor')) {
            const seguidorDiv = event.target.closest('.seguidor')
            const username = seguidorDiv.getAttribute('data-username')
            SeguidoresDoSeguidor(username)
            atualizarLinkHome('Voltar')
        }
    })
    document.getElementById('link-home').addEventListener('click', function () {
        carregarUserPrincipal()
        atualizarLinkHome('Home')
    })
    function atualizarLinkHome(texto) {
        const linkHome = document.getElementById('link-home')
        linkHome.textContent = texto
    }
    carregarUserPrincipal()
})
