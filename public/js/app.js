const green = '#3eff30';
const red = '#ff402b';
const blue = '#424bf4';
const yellow = '#f4ee42';

let playLine;
const myObstacles = [];
const clearedObstacles = [];
const myNotes = [];
const playedNotes = [];
let beatCounter = 0;
let keyTracker = 0;
let timing = 120;
let intervalTiming = 5;
const currentSong = [];
let myScore;
let scoreTracker = 0;
let paused = false;
let currentInstrument;
let previousNoteAudio;
let currentNoteAudio;
const songScrollBox = document.getElementsByClassName('song-scroll-box-wrapper')[0];

const startGame = () => {
  playLine = new component(10, 360, "#6dffd8", 200, 0);
  myScore = new component("30px", "Tillana", "black", 280, 40, "text");
  myGameArea.start();
}

const myGameArea = {
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
  this.update = () => {
    let ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.crashWith = (otherobj) => {
    let myright = this.x + (this.width);
    let otherleft = otherobj.x;
    let crash = false;
    if (myright > otherleft) {
      crash = true;
    }
    return crash;
  }
  this.passWith = (otherobj) => {
    let myright = this.x + (this.width);
    let otherright = otherobj.x + (otherobj.width);
    let pass = false;
    if (myright > otherright) {
      pass = true;
    }
    return pass;
  }
  this.startNote = (otherobj) => {
    let start = false;
    let myright = this.x + (this.width);
    let otherleft = otherobj.x;
    if (myright === otherleft) {
      start = true;
    }
    return start;
  }
  this.stopNote = (otherobj) => {
    let stop = false;
    let myright = this.x + (this.width) + 10;
    let otherright = otherobj.x + (otherobj.width);
    if (myright > otherright) {
      stop = true;
    }
    return stop;
  }
  this.evaluatePitch = (currentDetectedPitch, currentNoteSciPitch,currentNote,passedNote) => {
    let result;
    let highEnd = sciPitchToHertz[currentNoteSciPitch] + (sciPitchToHertz[currentNoteSciPitch] * .05);
    let lowEnd = sciPitchToHertz[currentNoteSciPitch] - (sciPitchToHertz[currentNoteSciPitch] * .05);
    let currentDetectedPitchOneOctaveDown = currentDetectedPitch / 2;
    let currentDetectedPitchTwoOctavesDown = currentDetectedPitchOneOctaveDown / 2;
    let currentDetectedPitchThreeOctavesDown = currentDetectedPitchTwoOctavesDown / 2;
    if ((currentDetectedPitch < highEnd && currentDetectedPitch > lowEnd) || (currentDetectedPitchOneOctaveDown < highEnd && currentDetectedPitchOneOctaveDown > lowEnd) || (currentDetectedPitchTwoOctavesDown < highEnd && currentDetectedPitchTwoOctavesDown > lowEnd) || (currentDetectedPitchThreeOctavesDown < highEnd && currentDetectedPitchThreeOctavesDown > lowEnd)) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }
}

const updateGameArea = () => {
  if (!paused) {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap, noteWidth, intervalLength, clearedX, clearedColor, clearedY, currentInterval, distanceToNextNote;
    for (let i = 0; i < myObstacles.length; i += 1) {
      if (playLine.crashWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
        updatePitch();
        if (playLine.evaluatePitch(currentNotePitchDetected, myObstacles[i].pitch, myObstacles[i],clearedObstacles[myObstacles[i].key])) {
          scoreTracker++;
        }
        myObstacles[i].width--;
        myObstacles[i].x++;
        if (clearedObstacles[myObstacles[i].key]) {
          clearedObstacles[myObstacles[i].key].width++;
        } else {
          if (myObstacles[i].color === green) {
            clearedColor = '#224f13';
            clearedY = 60;
          } else if (myObstacles[i].color === red) {
            clearedColor = '#4f1212';
            clearedY = 120;
          } else if (myObstacles[i].color === blue) {
            clearedColor = '#141256';
            clearedY = 180;
          } else if (myObstacles[i].color === yellow) {
            clearedColor = '#665e07';
            clearedY = 240;
          } else if (myObstacles[i].color === 'rgba(0,0,0,0)') {
            clearedColor = 'rgba(0,0,0,0)';
          }
          clearedX = myObstacles[i].x;
          clearedObstacles.push(new component(1, 50, clearedColor, clearedX, clearedY, 0, keyTracker))
        }
        if(playLine.passWith(myObstacles[i])) {
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
          currentNoteAudio.currentTime = 2;
          currentNoteAudio.play();
        }
        playedNotes.push(myNotes[0]);
        myNotes.shift();
      }
    }
    if (playedNotes.length > 0) {
      if (playLine.stopNote(playedNotes[0])) {
        if (myNotes.length > 0) {
          if (myNotes[0].pitch !== 'rest' && playedNotes[0].pitch !== 'rest') {
            let previousNoteFromTable;
            let nextNoteFromTable;
            if (currentInstrument === 'violin') {
              previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
              nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
            } else if (currentInstrument === 'viola') {
              previousNoteFromTable = sciPitchToStrAndFretViola[playedNotes[0].pitch];
              nextNoteFromTable = sciPitchToStrAndFretViola[myNotes[0].pitch];
            } else if (currentInstrument === 'cello') {
              previousNoteFromTable = sciPitchToStrAndFretCello[playedNotes[0].pitch];
              nextNoteFromTable = sciPitchToStrAndFretCello[myNotes[0].pitch];
            }
            let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
            let previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
            previousNote.style.color = 'white';
            previousNote.style.background = 'white';
            let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
            let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
            nextNote.style.color = 'black';
            nextNote.style.background = '#3dffe2';
            playedNotes.shift();
          } else if (playedNotes[0].pitch !== 'rest') {
            let previousNoteFromTable;
            if (currentInstrument === 'violin') {
              previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
            } else if (currentInstrument === 'viola') {
              previousNoteFromTable = sciPitchToStrAndFretViola[playedNotes[0].pitch];
            } else if (currentInstrument === 'cello') {
              previousNoteFromTable = sciPitchToStrAndFretCello[playedNotes[0].pitch];
            }
            let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
            let previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
            previousNote.style.color = 'white';
            previousNote.style.background = 'white';
          } else if (myNotes[0].pitch !== 'rest') {
            let nextNoteFromTable;
            if (currentInstrument === 'violin') {
              nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
            } else if (currentInstrument === 'viola') {
              nextNoteFromTable = sciPitchToStrAndFretViola[myNotes[0].pitch];
            } else if (currentInstrument === 'cello') {
              nextNoteFromTable = sciPitchToStrAndFretCello[myNotes[0].pitch];
            }
            let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
            let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
            nextNote.style.color = 'black';
            nextNote.style.background = '#3dffe2';
            playedNotes.shift();
          }
        } else {
          let previousNoteFromTable;
          if (currentInstrument === 'violin') {
            previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
          } else if (currentInstrument === 'viola') {
            previousNoteFromTable = sciPitchToStrAndFretViola[playedNotes[0].pitch];
          } else if (currentInstrument === 'violin') {
            previousNoteFromTable = sciPitchToStrAndFretCello[playedNotes[0].pitch];
          }
          let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
          previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
          previousNote.style.color = 'white';
          previousNote.style.background = 'white';
          paused = true;
          currentNoteAudio.pause();
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
      yPosition = currentSong[beatCounter].yPosition;
      let fretNoXPos = x + ((noteWidth/ 2) * 0.90);
      let fretNo = new component("30px", "Comic Sans MS", "black", fretNoXPos, (yPosition + 35), "text", keyTracker)
      fretNo.text = currentSong[beatCounter].fret;
      myObstacles.push(new component(noteWidth, 50, noteColor, x, yPosition, noteLength, keyTracker, notePitch));
      myObstacles.push(fretNo);
      myNotes.push(new component(noteWidth, 50, "rgba(0,0,0,0)", x, yPosition, noteLength, keyTracker, notePitch))
      beatCounter++;
      keyTracker++;
      myGameArea.distanceToNextNote = noteLength * timing;
      if (myGameArea.frameNo == 1) {
        let firstNoteFromTable;
        if (currentInstrument === 'violin') {
          firstNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
        } else if (currentInstrument === 'viola') {
          firstNoteFromTable = sciPitchToStrAndFretViola[myNotes[0].pitch];
        } else if (currentInstrument === 'cello') {
          firstNoteFromTable = sciPitchToStrAndFretCello[myNotes[0].pitch];
        }
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

const addNotesToCurrentSong = (sciPitchToStrAndFret, songRawData) => {
  for (let i = 0; i < songRawData.length; i++) {
    let currentNoteData = {};
    currentNoteData.length = songRawData[i].length;
    currentNoteData.pitch = songRawData[i].pitch;
    currentNoteData.fret = sciPitchToStrAndFret[songRawData[i].pitch].fret;
    if (sciPitchToStrAndFret[songRawData[i].pitch].color === 'green') {
      currentNoteData.color = green;
      currentNoteData.yPosition = 60;
    } else if (sciPitchToStrAndFret[songRawData[i].pitch].color === 'red') {
      currentNoteData.color = red;
      currentNoteData.yPosition = 120;
    } else if (sciPitchToStrAndFret[songRawData[i].pitch].color === 'blue') {
      currentNoteData.color = blue;
      currentNoteData.yPosition = 180;
    } else if (sciPitchToStrAndFret[songRawData[i].pitch].color === 'yellow') {
      currentNoteData.color = yellow;
      currentNoteData.yPosition = 240;
    } else if (sciPitchToStrAndFret[songRawData[i].pitch].color === 'none') {
      currentNoteData.color = 'rgba(0,0,0,0)';
    }
    currentSong.push(currentNoteData);
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
      });
    }
  });
  startSongButton.addEventListener('click', (event) => {
    event.target.style.display = "none";
    pauseButton.style.display = null;
    startGame();
  });
  pauseButton.addEventListener('click', (event) => {
    event.target.style.display = "none";
    resumeButton.style.display = null;
    paused = true;
    currentNoteAudio.pause();
  });
  resumeButton.addEventListener('click', (event) => {
    event.target.style.display = 'none';
    pauseButton.style.display = null;
    paused = false;
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
  });
  $.ajax({
    method: "GET",
    url: ajaxRequestUrl,
    success: (json) => {
      let currentSongRawData = json.songData;
      if (json.instrument === 'violin') {
        currentInstrument = 'violin';
        addNotesToCurrentSong(sciPitchToStrAndFretViolin, currentSongRawData);
      } else if (json.instrument === 'viola') {
        currentInstrument = 'viola';
        addNotesToCurrentSong(sciPitchToStrAndFretViola, currentSongRawData);
      } else if (json.instrument === 'cello') {
        currentInstrument = 'cello';
        addNotesToCurrentSong(sciPitchToStrAndFretCello, currentSongRawData);
      }
    },
    error: () => {
      console.log('error retrieving current song data');
    }
  })
});
