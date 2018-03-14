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
var myScore;
var scoreTracker = 0;
var paused = false;
let previousNoteAudio;
let currentNoteAudio;
// const songAudio = document.getElementById('songAudio');
const songScrollBox = document.getElementsByClassName('song-scroll-box-wrapper')[0];

function startGame() {
    playLine = new component(10, 360, "#6dffd8", 200, 0);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
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
    this.score = 0;
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
    this.evaluatePitch = (currentDetectedPitch, currentNoteSciPitch) => {
      let highEnd = sciPitchToHertz[currentNoteSciPitch] + (sciPitchToHertz[currentNoteSciPitch] * .05);
      let lowEnd = sciPitchToHertz[currentNoteSciPitch] - (sciPitchToHertz[currentNoteSciPitch] * .05);
      let currentDetectedPitchOneOctaveDown = currentDetectedPitch / 2;
      let currentDetectedPitchTwoOctavesDown = currentDetectedPitchOneOctaveDown / 2;
      let currentDetectedPitchThreeOctavesDown = currentDetectedPitchTwoOctavesDown / 2;
      if (currentDetectedPitch < highEnd && currentDetectedPitch > lowEnd) {
        return true;
      } else if (currentDetectedPitchOneOctaveDown < highEnd && currentDetectedPitchOneOctaveDown > lowEnd) {
        return true;
      } else if (currentDetectedPitchTwoOctavesDown < highEnd && currentDetectedPitchTwoOctavesDown > lowEnd) {
        return true;
      } else if (currentDetectedPitchThreeOctavesDown < highEnd && currentDetectedPitchThreeOctavesDown > lowEnd) {
        return true;
      }
      return false;
    }
}

function updateGameArea() {
  if (!paused) {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, noteWidth, intervalLength, clearedX, clearedColor, currentInterval, distanceToNextNote;
    for (var i = 0; i < myObstacles.length; i += 1) {
        if (playLine.crashWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
          updatePitch();
          if (playLine.evaluatePitch(currentNotePitchDetected, myObstacles[i].pitch)) {
            scoreTracker++;
          }
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
            } else if (myObstacles[i].color === 'rgba(0,0,0,0)') {
              clearedColor = 'rgba(0,0,0,0)';
            }
            clearedX = myObstacles[i].x;
            clearedObstacles.push(new component(1, 50, clearedColor, clearedX, 180, 0, keyTracker))
          }
          if(playLine.passWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
            myObstacles.splice(i,1);
          }
        }
    }
    if (myNotes[0]) {
      if (playLine.startNote(myNotes[0])) {
        if (currentNoteAudio) {
          previousNoteAudio = currentNoteAudio;
        }
        if (previousNoteAudio) {
          previousNoteAudio.pause();
        }
        if (myNotes[0].pitch === 'rest') {
          currentNoteAudio = null;
        } else {
          currentNoteAudio = document.getElementById('songAudio-' + myNotes[0].pitch);
          // let srcUrl = "../mp3/" + myNotes[0].pitch + ".mp3"
          // songAudio.src = srcUrl;
          // songAudio.play();
          currentNoteAudio.currentTime = 2;
          currentNoteAudio.play();
        }
        currentNote = myNotes[0];
        playedNotes.push(currentNote);
        myNotes.shift();
      }
    }
    if (playedNotes.length > 0) {
      if (playLine.stopNote(playedNotes[0])) {
        if (myNotes.length > 0) {
          if (myNotes[0].pitch !== 'rest' && playedNotes[0].pitch !== 'rest') {
            let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
            let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
            let previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
            previousNote.style.color = 'white';
            previousNote.style.background = 'white';
            let nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
            let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
            let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
            nextNote.style.color = 'black';
            nextNote.style.background = '#3dffe2';
            playedNotes.shift();
          } else if (playedNotes[0].pitch !== 'rest') {
            let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
            let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
            let previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
            previousNote.style.color = 'white';
            previousNote.style.background = 'white';
          } else if (myNotes[0].pitch !== 'rest') {
            let nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
            let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
            let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
            nextNote.style.color = 'black';
            nextNote.style.background = '#3dffe2';
            playedNotes.shift();
          }
        } else {
          let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
          let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
          previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
          previousNote.style.color = 'white';
          previousNote.style.background = 'white';
          paused = true;
          currentNoteAudio.pause();
          // songAudio.pause();
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
        myObstacles.push(new component(noteWidth, 50, noteColor, x, 180, noteLength, keyTracker, notePitch));
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
    myScore.text="SCORE: " + scoreTracker;
    myScore.update();
    playLine.update();
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  let deleteSongButton = document.getElementsByClassName('deleteSongButton')[0];
  let startSongButton = document.getElementsByClassName('startSong')[0];
  let pauseButton = document.getElementsByClassName('pauseButton')[0];
  let resumeButton = document.getElementsByClassName('resumeButton')[0];
  let ajaxRequestUrl = '/api/v1' + document.location.pathname;
  let currentSongIdNum = document.location.pathname.split('/')[2];
  deleteSongButton.addEventListener('click', (event) => {
    let confirm = prompt('Please confirm deletion of this song by entering the deletion keyword and clicking OK');
    if (confirm === 'deleteallthethings') {
      $.ajax({
        method:'DELETE',
        url: ajaxRequestUrl,
        success: () => {
          alert('Song has been deleted!');
        },
        error: () => {
          console.log('error deleting technique');
        }
      })
    }
  })
  startSongButton.addEventListener('click', (event) => {
    event.target.style.display = "none";
    pauseButton.style.display = null;
    startGame();
  })
  pauseButton.addEventListener('click', (event) => {
    event.target.style.display = "none";
    resumeButton.style.display = null;
    paused = true;
    currentNoteAudio.pause();
    // songAudio.pause();
  })
  resumeButton.addEventListener('click', (event) => {
    event.target.style.display = 'none';
    pauseButton.style.display = null;
    paused = false;
    // songAudio.play();
    currentNoteAudio.play();
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
    toggleLiveInput();
  })
  $.ajax({
    method: "GET",
    url: ajaxRequestUrl,
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
        } else if (sciPitchToStrAndFretViolin[currentSongRawData[i].pitch].color === 'none') {
          currentNoteData.color = 'rgba(0,0,0,0)';
        }
        currentSong.push(currentNoteData);
      }
    },
    error: () => {
      console.log('error retrieving current song data');
    }
  })
});
