function myFunction(x) {
  x.classList.toggle("change");
}

let video_div = document.getElementById("video");

let logo = document.getElementById("logo_yt");

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

let video_id = JSON.parse(localStorage.getItem("videoId")) || [];

let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video_id}&key=AIzaSyDILqEOK03dPYj3i_pj0h1U2dYoGgKjdWY`;

const vd_fun = async () => {
  try {
    let res = await fetch(url);

    let data = await res.json();
    video_display(data.items[0]);
  } catch (error) {
    console.log("error:", error);
  }
};

vd_fun();

let video_display = (data) => {
  let div = document.createElement("div");

  let iframe = document.createElement("iframe");

  iframe.src = `https://www.youtube.com/embed/${data.id}`;
  iframe.allow = "fullscreen";

  let t = document.createElement("h3");
  t.innerText = data.snippet.title;

  div.append(iframe, t);

  video_div.append(div);
};
