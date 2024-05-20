const socket = io();

//elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector('#messages');

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const urlTemplate = document.querySelector('#url-template').innerHTML;

//options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})


socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (location) =>{
    const html = Mustache.render(urlTemplate, {
        url: location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
      });
  $messages.insertAdjacentHTML('beforeend', html);
    console.log(location)
})

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  $messageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, () => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    console.log("The message was delivered");
  });
});

$sendLocationButton.addEventListener("click", (e) => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");

  try {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      socket.emit(
        "sendLocation",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        (message) => {
          $sendLocationButton.removeAttribute("disabled");

          console.log(message);
        }
      );
    });
  } catch (error) {
    $sendLocationButton.removeAttribute("disabled");
    console.log("Sorry cannot get the location");
  }
})

socket.emit('join',{username, room})
