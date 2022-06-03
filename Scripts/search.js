function myFunction(x) {
  x.classList.toggle("change");
}

//  let search = document.getElementById("search")
//  let search_btn = document.getElementById("search_btn")

//  search_btn.addEventListener("click", () => {
//      let search_value = search.value
//      console.log('search_value:', search_value)

//      localStorage.setItem("search_name",JSON.stringify(search_value))

//      window.location.href = "Search.html"

//  })

let results_div = document.getElementById("search_results");

let logo = document.getElementById("logo_yt");
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});



let search_btn = document.getElementById("search_btn");

search_btn.addEventListener("click", () => {
    let input = document.getElementById("search2")
    let n = input.value
    console.log('n:', n)
    localStorage.setItem("search_name",JSON.stringify(n))
  results();
});

const results = async () => {
  try {
    let search_keyword = JSON.parse(localStorage.getItem("search_name"))||[];

    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search_keyword}&type=video&key=AIzaSyBI3XXCba3v0xkHuyKgeOJMhJvztZKMw_E&maxResults=20`;
    console.log('search_keyword:', search_keyword)

    let res = await fetch(url);

    let data = await res.json();
    console.log("data:", data.items);

    results_append(data.items);
  } catch (error) {
    console.log("error:", error);
  }
};

results();

let results_append = (data) => {
  results_div.innerHTML = null;
  data.map(
    ({ snippet: { title, channelTitle, thumbnails }, id: { videoId } }) => {
      let div = document.createElement("div");
      div.addEventListener("click", () => {
        localStorage.setItem("videoId", JSON.stringify(videoId));
        window.location.href = "video.html";
      });

      let inner_div = document.createElement("div");

      let img_div = document.createElement("div");
      let img = document.createElement("img");
      img.src = thumbnails.medium.url;
      img_div.append(img);

      let t = document.createElement("p");
      t.innerText = title;

      let channel_name = document.createElement("p");
      channel_name.innerText = channelTitle;

      inner_div.append(t, channel_name);

      div.append(img_div, inner_div);

      results_div.append(div);
    }
  );
};
