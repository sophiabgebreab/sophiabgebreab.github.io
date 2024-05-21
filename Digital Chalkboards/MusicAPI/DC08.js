function searchArtist() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        alert('Please enter an artist name');
        return;
    }
    const baseUrl = 'https://musicbrainz.org/ws/2/artist/?query=';
    const format = '&fmt=json';
    const searchUrl = baseUrl + encodeURIComponent(searchInput) + format;
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.artists);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displaySearchResults(artists) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';
    if (artists.length === 0) {
        searchResultsDiv.textContent = 'No artists found';
        return;
    }
    const resultList = document.createElement('ul');
    artists.forEach(artist => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = artist.name;
        link.href = '#';
        link.onclick = (event) => {
            event.preventDefault();
            fetchAlbums(artist.id);
        };
        listItem.appendChild(link);
        resultList.appendChild(listItem);
    });
    searchResultsDiv.appendChild(resultList);
}

function fetchAlbums(artistId) {
    const baseUrl = 'https://musicbrainz.org/ws/2/release/?artist=';
    const format = '&fmt=json';
    const albumUrl = baseUrl + artistId + format;
    fetch(albumUrl)
        .then(response => response.json())
        .then(data => {
            displayAlbumResults(data.releases);
        })
        .catch(error => {
            console.error('Error fetching albums:', error);
        });
}

function displayAlbumResults(albums) {
    const albumResultsDiv = document.getElementById('albumResults');
    albumResultsDiv.innerHTML = '';
    if (albums.length === 0) {
        albumResultsDiv.textContent = 'No albums found for this artist.';
        return;
    }
    const albumTable = document.createElement('table');
    albumTable.className = 'table table-striped';
    const headerRow = albumTable.insertRow(0);
    const releaseDateHeader = headerRow.insertCell(0);
    const albumNameHeader = headerRow.insertCell(1);
    releaseDateHeader.textContent = 'Release Date';
    albumNameHeader.textContent = 'Name';
    albums.forEach(album => {
        const row = albumTable.insertRow(-1);
        const releaseDateCell = row.insertCell(0);
        const albumNameCell = row.insertCell(1);
        releaseDateCell.textContent = album.date ? album.date : 'N/A';
        albumNameCell.textContent = album.title ? album.title : 'N/A';
    });
    albumResultsDiv.appendChild(albumTable);
}
