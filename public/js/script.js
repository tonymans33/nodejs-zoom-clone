const socket  = io();

const myVideoGridElemnt = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
})

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })


    let text = $('input')

    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length != 0) {
            socket.emit('message', text.val())
            text.val('')
        }
    })

    socket.on('createMessage', message => {
        $('.messages').append(`<li class="message"><b><strong>user</strong></b><br/>${message}</li>`)
    })

});

socket.on('user-disconnected', userId => {
  if (peer[userId]) peer[userId].close()
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);

})

function connectToNewUser(userId, stream){
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    myVideoGridElemnt.append(video);
};


function scrollToBottom() {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

function handleMuteAudio() {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
}
  
function setMuteButton() {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}
  
function setUnmuteButton(){
    const html = `
      <i style="color:#EB534B" class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

function handleStopVideo() {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideoButton()
    } else {
      setStopVideoButton()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  
function setStopVideoButton() {
  const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

function setPlayVideoButton() {
  const html = `
  <i style="color:#EB534B" class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

  