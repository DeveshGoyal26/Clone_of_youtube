function myFunction(x) {
    x.classList.toggle("change");
}

let logo = document.getElementById("logo_yt");

logo.addEventListener("click", () => {
    window.location.href = "index.html";
})

let mostPopular_container = document.getElementById("container")
let body = document.getElementById("body")
let search_suggestion = document.getElementById("search_suggestion")
let search_btn = document.getElementById("search_btn")
let input = document.getElementById("search")

search_btn.addEventListener("click", () => {
    let sea = search.value

    localStorage.setItem("search_name", JSON.stringify(sea))

    window.location.href = "Search.html"

})

let mp = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=AIzaSyDILqEOK03dPYj3i_pj0h1U2dYoGgKjdWY&maxResults=60`

let mostPopular = async () => {
    try {
        let res = await fetch(mp)

        let results = await res.json()
        console.log('results:', results)

        mostPopular_append(results.items)
    }
    catch (error) {

        console.log('error:', error)

    }
}

if (document.body.id === "body") {

    mostPopular()

}

let mostPopular_append = (data) => {
    mostPopular_container.innerHTML = null
    console.log('data:', data)

    data.map(({ id, snippet: { title, channelTitle, thumbnails } }) => {

        // let div = document.createElement("div")
        let div = document.createElement("div");
        div.addEventListener("click", () => {
            localStorage.setItem("videoId", JSON.stringify(id));
            window.location.href = "video.html";
        });

        let img_div = document.createElement("div")
        let img = document.createElement("img")
        img.src = thumbnails.medium.url
        img_div.append(img)

        let channel_img = document.createElement("div")

        let videos_title = document.createElement("div")
        videos_title.innerText = title
        videos_title.setAttribute("id", "title")

        let channel_name = document.createElement("p")
        channel_name.innerText = channelTitle

        let views = document.createElement("div")

        let time = document.createElement("p")


        div.append(img_div, channel_img, videos_title, channel_name, views, time)

        mostPopular_container.append(div)


    })

}









let search_data = async () => {
    try {
        let search = document.getElementById("search").value

        if (search === "") {
            search_suggestion.style.display = "none";
        }

        let search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=AIzaSyDILqEOK03dPYj3i_pj0h1U2dYoGgKjdWY&maxResults=10`

        let res = await fetch(search_url)

        let data = await res.json()
        console.log('data:', data)

        return data.items;

    }

    catch (error) {

        console.log('error:', error)

    }

}





document.body.addEventListener("focusout", function () {
    setTimeout(function () {
        search_suggestion.style.display = "none"
    }, 100);
})

let search_results = (data) => {
    search_suggestion.style.display = "flex";
    search_suggestion.innerText = null;

    data.map((el) => {

        let name_p = document.createElement("p");

        name_p.innerText = el.snippet.title;

        name_p.addEventListener("click", function () {
            localStorage.setItem("video_id", JSON.stringify(el.id.videoId));
            window.location.href = "video.html";
        });

        search_suggestion.append(name_p);

    })

}




let main = async () => {
    try {
        let data = await search_data()

        if (data === undefined) {
            return false;
        }
        search_results(data)
    }
    catch (error) {

        console.log('error:', error)

    }

}


let timeout;



input.addEventListener("input", () => {

    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        main();
    }, 1000)
})





