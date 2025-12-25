const API_KEY = "AIzaSyBc1FY-6OzcRDAPQFiok_p_h5I1RalcIc0";

function goSearch(){
  const q = document.getElementById("q").value;
  location.href = "search.html?q=" + encodeURIComponent(q);
}

function loadTrending(){
  fetch(
    "https://www.googleapis.com/youtube/v3/videos" +
    "?part=snippet&chart=mostPopular&regionCode=IN" +
    "&maxResults=12&key=" + API_KEY
  )
  .then(r=>r.json())
  .then(d=>{
    const feed = document.getElementById("feed");
    d.items.forEach(v=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `
        <a href="watch.html?id=${v.id}">
          <img src="${v.snippet.thumbnails.medium.url}">
          <h4>${v.snippet.title}</h4>
        </a>`;
      feed.appendChild(card);
    });
  });
}

function searchVideos(){
  const q = new URLSearchParams(location.search).get("q");
  fetch(
    "https://www.googleapis.com/youtube/v3/search" +
    "?part=snippet&type=video&q=" + encodeURIComponent(q) +
    "&maxResults=12&key=" + API_KEY
  )
  .then(r=>r.json())
  .then(d=>{
    const results = document.getElementById("results");
    d.items.forEach(v=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `
        <a href="watch.html?id=${v.id.videoId}">
          <img src="${v.snippet.thumbnails.medium.url}">
          <h4>${v.snippet.title}</h4>
        </a>`;
      results.appendChild(card);
    });
  });
}
