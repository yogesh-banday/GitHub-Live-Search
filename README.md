# GitHub Live Search

A simple GitHub profile search application built with **HTML, CSS, and Vanilla JavaScript** using the GitHub REST API.

Search for a GitHub username and view basic profile information without leaving the page.

## Features

- **GitHub API Integration** — Fetches user profile data from the GitHub REST API.
- **Debounced Search** — Waits until the user pauses typing before making an API request.
- **Request Cancellation** — Uses `AbortController` to cancel outdated fetch requests when possible.
- **Stale Response Protection** — Uses request IDs to prevent outdated responses from updating the UI.
- **Error Handling** — Handles unsuccessful API responses and request errors.
- **Empty Input Handling** — Clears the results and cancels pending search operations when the input is empty.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub REST API

## How It Works

1. Enter a GitHub username in the search field.
2. The application waits for a short pause in typing using debouncing.
3. A request is sent to the GitHub REST API.
4. The response is processed and the profile information is displayed.
5. Outdated requests are ignored to help prevent incorrect results from appearing.

## Getting Started

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/github-live-search.git
   ```

2. Open the project folder:

   ```bash
   cd github-live-search
   ```

3. Open `index.html` in your browser.

No build tools or package installation are required for this basic version.

## What I Learned

This project helped me practise:

- Asynchronous JavaScript with `async/await`
- Fetching data from an external API
- Promises and JSON response handling
- Debouncing with `setTimeout()` and `clearTimeout()`
- Request cancellation with `AbortController`
- Closures and passing arguments through callbacks
- Race conditions and stale response protection
- Error handling with `try/catch`

## Future Improvements

- Improve the UI and make it responsive.
- Add GitHub profile avatars and repository statistics.
- Introduce loading, success, and error states.
- Improve accessibility and user feedback.
- Deploy a live demo using GitHub Pages.

## Acknowledgements

- [GitHub REST API](https://docs.github.com/en/rest/users/users)

---

**Status:** Basic version — ongoing project.
