const green = '#3eff30';
const red = '#ff402b';
const blue = '#424bf4';
const yellow = '#f4ee42';

var playLine;
var myObstacles = [];
var clearedObstacles = [];
var myNotes = [];
var playedNotes = [];
var beatCounter = 0;
var keyTracker = 0;
var timing = 120;
var intervalTiming = 5;
const currentSong = [];
var paused = false;
const songAudio = document.getElementById('songAudio');
const songScrollBox = document.getElementsByClassName('song-scroll-box-wrapper')[0];

function startGame() {
    playLine = new component(10, 360, "#6dffd8", 200, 0);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 360;
        this.context = this.canvas.getContext("2d");
        songScrollBox.appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, intervalTiming);
        this.distanceToNextNote = 1;
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, key, pitch) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.type = type;
    this.key = key;
    this.pitch = pitch;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        // if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        //     crash = false;
        // }
        if (myright > otherleft) {
            crash = true;
        }
        return crash;
    }
    this.passWith = function(otherobj) {
      var myright = this.x + (this.width);
      var otherright = otherobj.x + (otherobj.width);
      var pass = false;
      if (myright > otherright) {
        pass = true;
      }
      return pass;
    }
    this.startNote = function(otherobj) {
      let start = false;
      var myright = this.x + (this.width);
      var otherleft = otherobj.x;
      if (myright === otherleft) {
        start = true;
      }
      return start;
    }
    this.stopNote = function(otherobj) {
      let stop = false;
      var myright = this.x + (this.width) + 10;
      var otherright = otherobj.x + (otherobj.width);
      if (myright > otherright) {
        stop = true;
      }
      return stop;
    }
}

function updateGameArea() {
  if (!paused) {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, noteWidth, intervalLength, clearedX, clearedColor, currentInterval, distanceToNextNote;
    for (var i = 0; i < myObstacles.length; i += 1) {
        if (playLine.crashWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
          myObstacles[i].width--;
          myObstacles[i].x++;
          if (clearedObstacles[myObstacles[i].key]) {
            clearedObstacles[myObstacles[i].key].width++;
            // clearedObstacles[myObstacles[i].key].x--;
          } else {
            if (myObstacles[i].color === green) {
              clearedColor = '#224f13';
            } else if (myObstacles[i].color === red) {
              clearedColor = '#4f1212';
            } else if (myObstacles[i].color === blue) {
              clearedColor = '#141256';
            } else if (myObstacles[i].color === yellow) {
              clearedColor = '#665e07';
            }
            clearedX = myObstacles[i].x;
            clearedObstacles.push(new component(1, 50, clearedColor, clearedX, 180, 0, keyTracker))
          }
          if(playLine.passWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
            myObstacles.splice(i,1);
            // let timePassed = new Date();
            // console.log(timePassed + ' ' + timePassed.getMilliseconds());
          }
        }
    }
    if (myNotes[0]) {
      if (playLine.startNote(myNotes[0])) {
        let srcUrl = "../mp3/" + myNotes[0].pitch + ".mp3"
        songAudio.src = srcUrl;
        songAudio.play();
        currentNote = myNotes[0];
        playedNotes.push(currentNote);
        myNotes.shift();
      }
    }
    if (playedNotes.length > 0) {
      if (playLine.stopNote(playedNotes[0])) {
        if (myNotes.length > 0) {
          let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
          let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
          previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
          previousNote.style.color = 'white';
          previousNote.style.background = 'white';
          let nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
          let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
          let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
          nextNote.style.color = 'black';
          nextNote.style.background = '#3dffe2';
          playedNotes.shift();
        } else {
          let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
          let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
          previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
          previousNote.style.color = 'white';
          previousNote.style.background = 'white';
          paused = true;
          songAudio.pause();
        }
      }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGameArea.distanceToNextNote -= 1;
    if (myGameArea.distanceToNextNote === 0) {
        x = myGameArea.canvas.width;
        noteWidth = currentSong[beatCounter].length * (timing - 10);
        noteColor = currentSong[beatCounter].color;
        noteLength = currentSong[beatCounter].length;
        notePitch = currentSong[beatCounter].pitch;
        let fretNoXPos = x + (noteWidth / 2);
        let fretNo = new component("30px", "Consolas", "black", fretNoXPos, 215, "text", keyTracker)
        fretNo.text = currentSong[beatCounter].fret;
        myObstacles.push(new component(noteWidth, 50, noteColor, x, 180, noteLength, keyTracker));
        myObstacles.push(fretNo);
        myNotes.push(new component(noteWidth, 50, "rgba(0,0,0,0)", x, 180, noteLength, keyTracker, notePitch))
        beatCounter++;
        keyTracker++;
        myGameArea.distanceToNextNote = noteLength * timing;
        if (myGameArea.frameNo == 1) {
          let firstNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
          let firstNoteFretAndColor = firstNoteFromTable.color[0] + firstNoteFromTable.fret;
          let firstNote = document.getElementsByClassName(firstNoteFretAndColor)[0];
          firstNote.style.color = 'black';
          firstNote.style.background = '#3dffe2';
        }
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    for (let i = 0; i < myNotes.length; i += 1) {
        myNotes[i].x += -1;
        myNotes[i].update();
    }
    for (let i = 0; i < playedNotes.length; i++) {
      playedNotes[i].x += -1;
      playedNotes[i].update();
    }
    for (let i = 0; i < clearedObstacles.length; i += 1) {
        clearedObstacles[i].x += -1;
        clearedObstacles[i].update();
    }
    playLine.update();
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  let startSongButton = document.getElementsByClassName('startSong')[0];
  let pauseButton = document.getElementsByClassName('pauseButton')[0];
  let resumeButton = document.getElementsByClassName('resumeButton')[0];
  let getRequestUrl = '/api/v1' + document.location.pathname;
  let currentSongIdNum = document.location.pathname.split('/')[2];
  startSongButton.addEventListener('click', (event) =>{
    event.target.style.display = "none";
    pauseButton.style.display = null;
    startGame();
  })
  pauseButton.addEventListener('click', (event) => {
    event.target.style.display = "none";
    resumeButton.style.display = null;
    paused = true;
    songAudio.pause();
  })
  resumeButton.addEventListener('click', (event) => {
    event.target.style.display = 'none';
    pauseButton.style.display = null;
    paused = false;
    songAudio.play();
  })
  $('.bpmSelectionButton').on('click', (event) => {
    let speedButtons = document.getElementsByClassName('bpmSelectionButton');
    for (let i = 0; i < speedButtons.length; i++) {
      speedButtons[i].style.display = 'none';
    }
    startSongButton.style.display = null;
    document.getElementsByClassName('speedSelectionMessage')[0].style.display = 'none';
    document.getElementsByClassName('fingerboard-wrapper')[0].style.display = null;
    let speed = event.target.dataset.speed;
    if (speed === 'verySlow') {
      intervalTiming = 10;
    } else if (speed === 'slow') {
      intervalTiming = 7;
    } else if (speed === 'normal') {
      intervalTiming = 5;
    } else if (speed === 'fast') {
      intervalTiming = 3;
    }
  })
  $.ajax({
    method: "GET",
    url: getRequestUrl,
    success: (json) => {
      let currentSongRawData = json.songData;
      for (let i = 0; i < currentSongRawData.length; i++) {
        let currentNoteData = {};
        currentNoteData.length = currentSongRawData[i].length;
        currentNoteData.pitch = currentSongRawData[i].pitch;
        currentNoteData.fret = sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].fret;
        if (sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].color === 'green') {
          currentNoteData.color = green;
        } else if (sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].color === 'red') {
          currentNoteData.color = red;
        } else if (sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].color === 'blue') {
          currentNoteData.color = blue;
        } else if (sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].color === 'yellow') {
          currentNoteData.color = yellow;
        }
        currentSong.push(currentNoteData);
      }
    },
    error: () => {
      console.log('error retrieving current song data');
    }
  })

});
