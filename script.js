document.addEventListener("DOMContentLoaded", function () {
  // task 1 - user profile to local storage
  const userProfile = localStorage.getItem("userProfile");
  if (userProfile) {
    console.log("Stored profile:", JSON.parse(userProfile));
  }
  // task 2  loading notes from local storage
  const notes = sessionStorage.getItem("notes");
  if (notes) {
    document.getElementById("noteInput").value = notes;
  }
  // task 3 - checking cookie consent!
  checkCookieConsent();
  document
    .getElementById("profileSubmit")
    .addEventListener("click", saveUserProfile);

  document.getElementById("saveNote").addEventListener("click", saveNotes);
  document
    .getElementById("acceptCookies")
    .addEventListener("click", acceptCookies);

  // task 4 - clear everything
  document
    .getElementById("clearStorage")
    .addEventListener("click", clearAllStorages);

  // task 5 - Fetch a good ol' dad joke
  document.getElementById("getJoke").addEventListener("click", fetchJoke);

  //task 6 countdown
  document
    .getElementById("startCountdown")
    .addEventListener("click", startCountdown);

  //task 7 - intervaling!
  document
    .getElementById("startTicking")
    .addEventListener("click", startTicking);
  document.getElementById("stopTicking").addEventListener("click", stopTicking);
});

// task 1: function for saving user profile to local storage
function saveUserProfile() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  if (name && email) {
    const profile = { name, email };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    console.log("Profile saved:", profile);
  }
}

// task 2: function for saving notes to session storage
function saveNotes() {
  const notes = document.getElementById("noteInput").value;
  sessionStorage.setItem("notes", notes);
}
// task 3: checking cookie consent via function
//function to set cookie's date
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Strict`;
}

// function to get cookie's value
function getCookie(name) {
  const nameEquals = name + "=";
  const cookies = decodeURIComponent(document.cookie).split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEquals)) {
      return cookie.substring(nameEquals.length);
    }
  }
  return null;
}
//function to check if cookie consent is given
function checkCookieConsent() {
  const consent = getCookie("consent");
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    cookieBanner.style.display = consent === "true" ? "none" : "block";
  }
}
// function to accept cookies and remove the banner
function acceptCookies() {
  setCookie("consent", "true", 7);
  document.getElementById("cookieBanner").style.display = "none";
}

//task 4: removing local, session storages and cookies

function clearAllStorages() {
  localStorage.clear();
  sessionStorage.clear();
  setCookie("consent", "", -1); // delete cookie
  console.log("All storages and cookies cleared.");
}

// task 5 fetch a DAD joke

async function fetchJoke() {
  const output = document.getElementById("jokeOutput");
  output.textContent = "Loading..";
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Network error!");
    const data = await response.json();
    output.textContent = data.joke;
    output.classList.remove("error");
  } catch (error) {
    output.textContent = "Failed to fetch a joke";
    output.classList.add("error");
  }
}
//task 6 - countdowning
function startCountdown() {
  let count = 5;
  const output = document.getElementById("countdownOutput");
  function update() {
    output.innerHTML = `<span class="countdown-number">${
      count > 0 ? count : "Go!"
    }</span><div class="ground crack"></div>`;
    if (count > 0) {
      count--;
      setTimeout(update, 1000);
    }
  }
  update();
}

//task 7 - intervaling
let tickInterval = null;
let tickCount = 0;

function startTicking() {
  if (!tickInterval) {
    tickInterval = setInterval(() => {
      const output = document.getElementById("tickOutput");
      const span = document.createElement("span");
      span.textContent = "Tick ";
      span.style.animationDelay = `${(tickCount % 4) * 0.2}s`;
      output.appendChild(span);
      tickCount++;
    }, 1000);
  }
}

function stopTicking() {
  if (tickInterval) {
    clearInterval(tickInterval);
    tickInterval = null;
  }
}
