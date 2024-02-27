// Registering Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// Requesting permission for Notifications after clicking on the button
const button1 = document.getElementById("notification-in");
button1.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    console.log("permission " + result);
    if (result === "granted") {
      randomNotificationIn();
    }
  });
});

const button2 = document.getElementById("notification-out");
button2.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    console.log("permission " + result);
    if (result === "granted") {
      randomNotificationOut();
    }
  });
});

// Setting up random Notification
function randomNotificationIn() {
  const notifTitle =
    "Takeaways From the Supreme Court Arguments on Social Media Laws";
  const notifBody = `Laws in Texas and Florida seek to limit social media companies’ ability to moderate content on their platforms and could shape the future of speech on the internet.`;
  const notifImg = `data/img/sc.webp`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  notifIn = new Notification(notifTitle, options);
  notifIn.onclick = (event) => {
    // event.preventDefault(); // prevent the browser from focusing the Notification's tab
    // window.open(
    //   "https://www.nytimes.com/2024/02/26/us/politics/supreme-court-social-media-takeaways.html",
    //   "_self"
    // );
    randomNotificationIn();
  };
}

function randomNotificationOut() {
  const notifTitle =
    "Takeaways From the Supreme Court Arguments on Social Media Laws";
  const notifBody = `Laws in Texas and Florida seek to limit social media companies’ ability to moderate content on their platforms and could shape the future of speech on the internet.`;
  const notifImg = `data/img/sc.webp`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  notif_out = new Notification(notifTitle, options);
  notif_out.onclick = (event) => {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open(
      "https://www.nytimes.com/2024/02/26/us/politics/supreme-court-social-media-takeaways.html",
      "_blank"
    );
  };
}
