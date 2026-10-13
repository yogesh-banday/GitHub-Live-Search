
let user_type = document.getElementById("username")
let result = document.querySelector("#result")
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
        result.innerHTML = `<p>Name: ${data.name}</p><p>Bio: ${data.bio}</p>`;

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
            result.textContent = "Searching...";
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
