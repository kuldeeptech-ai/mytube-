const API_KEY = "AIzaSyBc1FY-6OzcRDAPQFiok_p_h5I1RalcIc0";
let pageToken = "";

function loadHome(q){
  fetch(
    "https://www.googleapis.com/youtube/v3/search"+
    "?part=snippet&type=video&maxResults=12"+
    (q? "&q="+q:"")+
    "&key="+API_KEY
  )
  .then(r=>r.json())
  .then(d=>{
    const feed=document.getElementById("feed");
    feed.innerHTML="";
    d.items.forEach(v=>{
      feed.innerHTML+=`
      <div class="card">
        <a href="watch.html?id=${v.id.videoId}">
          <img src="${v.snippet.thumbnails.medium.url}">
          <h4>${v.snippet.title}</h4>
        </a>
        <a href="channel.html?id=${v.snippet.channelId}">
          ${v.snippet.channelTitle}
        </a>
      </div>`;
    });
  });
}

function playVideo(id){
  document.getElementById("player").src =
    "https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1";
}

function loadRelated(id){
  fetch(
    "https://www.googleapis.com/youtube/v3/search"+
    "?part=snippet&type=video&relatedToVideoId="+id+
    "&maxResults=10&key="+API_KEY
  )
  .then(r=>r.json())
  .then(d=>{
    const rel=document.getElementById("related");
    d.items.forEach(v=>{
      rel.innerHTML+=`
      <a href="watch.html?id=${v.id.videoId}">
        <p>${v.snippet.title}</p>
      </a>`;
    });
  });
}

function loadChannel(cid){
  fetch(
    "https://www.googleapis.com/youtube/v3/search"+
    "?part=snippet&type=video&channelId="+cid+
    "&maxResults=12&key="+API_KEY
  )
  .then(r=>r.json())
  .then(d=>{
    const vids=document.getElementById("videos");
    d.items.forEach(v=>{
      vids.innerHTML+=`
      <a href="watch.html?id=${v.id.videoId}">
        <img src="${v.snippet.thumbnails.medium.url}">
      </a>`;
    });
  });
}

function saveHistory(id){
  let h = JSON.parse(localStorage.getItem("history")||"[]");
  h.unshift(id);
  localStorage.setItem("history",JSON.stringify(h.slice(0,20)));
}
