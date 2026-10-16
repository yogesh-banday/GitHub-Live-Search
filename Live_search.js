
let user_type = document.getElementById("username")
let result = document.querySelector("#result")
let avtar = document.querySelector(".dp")
let name = document.querySelector("#name")
let card = document.querySelector(".card")
let username = document.querySelector("#username1")
let bio = document.querySelector("#bio")
let repo = document.querySelector(".repo")
let follower = document.querySelector(".follower")
let following = document.querySelector(".following")
let repo_name = document.querySelector(".repo_name")
let follower_name = document.querySelector(".follower_name")
let following_name = document.querySelector(".following_name")
let location1 = document.querySelector(".loacation")
let github_link = document.querySelector(".github_link")
let twitter = document.querySelector(".twitter")
let email = document.querySelector(".email")

// function fetchapi(user_name){
//      console.log("Searching for user name:", user_name);
// }
let controller;
let latest_RequestId = 0; // Variable to track the latest request ID

async function fetchapi(user_name, requestId) {
    try {

        controller = new AbortController();

        let res = await fetch(`https://api.github.com/users/${user_name}`, { signal: controller.signal });
        if (!res.ok) {
            throw new Error("User not found");
        }
        let data = await res.json();
        console.log(data);

        if (requestId !== latest_RequestId) {
            console.log("Ignoring outdated response for user:", user_name);
            return; // Ignore outdated response
        }
        const joinedDate = new Date(data.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        console.log(joinedDate);
        name.innerHTML = `<h2>${data.name}</h2>`;
        name.innerHTML += `<p>Joined ${joinedDate}</p>`;
        username1.innerHTML = `<p>@${data.login}</p>`;
        avtar.innerHTML = `<img src="${data.avatar_url}" alt="Avatar" width="140" height="140"  border-radius= '14px';>`;
        // result.innerHTML = `<p>Name: ${data.name}</p><p>Bio: ${data.bio}</p>`;
        if (data.bio) {
            bio.innerHTML = `<p>${data.bio}</p>`;
        } else {
            bio.innerHTML = "<p>This profile has no bio</p>";
        }
        repo.innerHTML = `<p>${data.public_repos}</p>`;
        follower.innerHTML = `<p>${data.followers}</p>`;
        following.innerHTML = `<p>${data.following}</p>`;
        repo_name.innerHTML = `<p>Repositories</p>`;
        follower_name.innerHTML = `<p>Followers</p>`;
        following_name.innerHTML = `<p>Following</p>`;
        location1.innerHTML = `
         <img src="images/icons8-location-24.png"  alt="" style="width: 20px; height: 20px;">
         <p>${data.location || "Not Available"}</p>`;
        github_link.innerHTML = `
        <img src="images/icons8-link-24.png" alt="" style="width: 20px; height: 20px;">
        <p><a href="${data.html_url}" target="_blank">GitHub Profile</a></p>`;
        twitter.innerHTML = `
        <img src="images/icons8-twitter-bird-50.png" alt="" style="width: 20px; height: 20px;">
        <p>${data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>` : "Not Available"}</p>`;
        email.innerHTML = `
        <img src="images/icons8-email-24.png" alt="" style="width: 20px; height: 20px;">
        <p>${data.email || "Not Available"}</p>`;


        // add fllowers and following count to the respective divs css
        const style = document.createElement("style");

        style.textContent = `
  .reach {
    display: flex;
    width: 100%;
    position: relative;
    left: 18px;
    height: 50px;
    background-color: var(--color-stats);
    border-radius: 10px;
   
  }

  .repo,
  .follower,
  .following {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .repo {
    border-right: 1px solid var(--color-border);
  }

  .follower {
    border-right: 1px solid var(--color-border);
  }
`;

        document.head.appendChild(style);

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("Fetch aborted");
        }
        else if (requestId !== latest_RequestId) {
            console.log("Ignoring outdated response for user:", user_name);
            return; // Ignore outdated response
        } else {
            console.error("Error fetching user data:", error);
            result.innerHTML = "<p>User not found</p>";
        }
    }
}


function debounce(call_back, delay) {
    let timer;

    function debounced(user_name, requestId) {
        clearTimeout(timer)
        if (controller) {
            controller.abort(); // Abort the previous fetch request
        }

        timer = setTimeout(() => {
            name.innerHTML = "Searching...";
            call_back(user_name, requestId);
        }, delay);
    }
    debounced.cancel = function () {
        clearTimeout(timer);
        if (controller) {
            controller.abort(); // Abort the previous fetch request
        }
    };
    return debounced;
};
const call = debounce(fetchapi, 700)


user_type.addEventListener("input", () => {
    const requestId = ++latest_RequestId;
    if (user_type.value.trim() === "") {
        result.innerHTML = "";
        console.log("Input is empty. Please enter a username.");
        call.cancel(); // Cancel the debounce timer and abort the fetch request
        return;
    }

    let user_name = user_type.value
    console.log(user_name)
    call(user_name, requestId)
})
