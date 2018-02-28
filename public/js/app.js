const canvas = document.getElementsByClassName('song-scroll-box')[0];

const green = '#3eff30';
const red = '#ff402b';

const sciPitchToStrAndFretViolin = {
  g3: {
    color: 'yellow',
    fret: 0
  },
  ab3: {
    color: 'yellow',
    fret: 1
  },
  a3: {
    color: 'yellow',
    fret: 2
  },
  bb3: {
    color: 'yellow',
    fret: 3
  },
  b3: {
    color: 'yellow',
    fret: 4
  },
  c4: {
    color: 'yellow',
    fret: 5
  },
  db4: {
    color: 'yellow',
    fret: 6
  },
  d4: {
    color: 'blue',
    fret: 0
  },
  eb4: {
    color: 'blue',
    fret: 1
  },
  e4: {
    color: 'blue',
    fret: 2
  },
  f4: {
    color: 'blue',
    fret: 3
  },
  gb4: {
    color: 'blue',
    fret: 4
  },
  g4: {
    color: 'blue',
    fret: 5
  },
  ab4: {
    color: 'blue',
    fret: 6
  },
  a4: {
    color: 'red',
    fret: 0
  },
  bb4: {
    color: 'red',
    fret: 1
  },
  b4: {
    color: 'red',
    fret: 2
  },
  c5: {
    color: 'red',
    fret: 3
  },
  db5: {
    color: 'red',
    fret: 4
  },
  d5: {
    color: 'red',
    fret: 5
  },
  eb5: {
    color: 'red',
    fret: 6
  },
  e5: {
    color: 'green',
    fret: 0
  },
  f5: {
    color: 'green',
    fret: 1
  },
  gb5: {
    color: 'green',
    fret: 2
  },
  g5: {
    color: 'green',
    fret: 3
  },
  ab5: {
    color: 'green',
    fret: 4
  },
  a5: {
    color: 'green',
    fret: 5
  },
  bb5: {
    color: 'green',
    fret: 6
  },
  b5: {
    color: 'green',
    fret: 7
  }
}

const twinkleTwinkleViolin = [
  {
    'color': red,
    'fret': '0',
    'length': 1,
    'pitch': 'a4'
  },{
    'color': red,
    'fret': '0',
    'length': 1,
    'pitch': 'a4'
  },{
    'color':green,
    'fret': '0',
    'length': 1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'0',
    'length': 1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'2',
    'length': 1,
    'pitch':'gb5'
  },{
    'color':green,
    'fret':'2',
    'length': 1,
    'pitch':'gb5'
  },{
    'color':green,
    'fret':'0',
    'length': 2,
    'pitch':'e5'
  },{
    'color':red,
    'fret':'5',
    'length': 1,
    'pitch': 'd5'
  },{
    'color':red,
    'fret':'5',
    'length': 1,
    'pitch': 'd5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'2',
    'length':1,
    'pitch':'b4'
  },{
    'color':red,
    'fret':'2',
    'length':1,
    'pitch':'b4'
  },{
    'color':red,
    'fret':'0',
    'length':2,
    'pitch':'a4'
  },{
    'color':green,
    'fret':'0',
    'length':1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'0',
    'length':1,
    'pitch':'e5'
  },{
    'color':red,
    'fret':'5',
    'length':1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'5',
    'length':1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'2',
    'length':2,
    'pitch':'b4'
  },{
    'color':green,
    'fret':'0',
    'length':1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'0',
    'length':1,
    'pitch':'e5'
  },{
    'color':red,
    'fret':'5',
    'length':1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'5',
    'length':1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'2',
    'length':2,
    'pitch':'b4'
  },{
    'color': red,
    'fret': '0',
    'length': 1,
    'pitch':'a4'
  },{
    'color': red,
    'fret': '0',
    'length': 1,
    'pitch':'a4'
  },{
    'color':green,
    'fret': '0',
    'length': 1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'0',
    'length': 1,
    'pitch':'e5'
  },{
    'color':green,
    'fret':'2',
    'length': 1,
    'pitch':'gb5'
  },{
    'color':green,
    'fret':'2',
    'length': 1,
    'pitch':'gb5'
  },{
    'color':green,
    'fret':'0',
    'length': 2,
    'pitch':'e5'
  },{
    'color':red,
    'fret':'5',
    'length': 1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'5',
    'length': 1,
    'pitch':'d5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'4',
    'length':1,
    'pitch':'db5'
  },{
    'color':red,
    'fret':'2',
    'length':1,
    'pitch':'b4'
  },{
    'color':red,
    'fret':'2',
    'length':1,
    'pitch':'b4'
  },{
    'color':red,
    'fret':'0',
    'length':2,
    'pitch':'a4'
  }
]


var playLine;
var myObstacles = [];
var clearedObstacles = [];
var myNotes = [];
var playedNotes = [];
// var myScore;
var beatCounter = 0;
var keyTracker = 0;
// var bpm = 80;
// var timing;
var paused = false;
const songAudio = document.getElementById('songAudio');
const songScrollBox = document.getElementsByClassName('song-scroll-box-wrapper')[0];
console.log(songScrollBox);

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
        this.interval = setInterval(updateGameArea, 5);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, key, pitch) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.key = key;
    this.pitch = pitch;
    // this.gravity = 0;
    // this.gravitySpeed = 0;
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
    this.newPos = function() {
        // this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        // this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            // this.gravitySpeed = 0;
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
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, noteWidth, intervalLength, clearedX, clearedColor, currentInterval;
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
            } else if (myObstacles[i].color === 'blue') {
              clearedColor = '#141256';
            } else if (myObstacles[i].color === 'yellow') {
              clearedColor = '#665e07';
            }
            clearedX = myObstacles[i].x;
            clearedObstacles.push(new component(1, 50, clearedColor, clearedX, 180, 0, keyTracker))
          }
          if(playLine.passWith(myObstacles[i]) && (myObstacles[i].type !== "text")) {
            myObstacles.splice(i,1);
            let timePassed = new Date();
            // console.log(timePassed + ' ' + timePassed.getMilliseconds());
          }
        }
        // if ((myObstacles[i].type == "text")) {
        //   clearedObstacles.push(myObstacles[i])
        //   myObstacles.splice(i,1);
        //   console.log(myObstacles[i].type)
        // }
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
        console.log('my console logs are working!')
        // songAudio.pause();
        let previousNoteFromTable = sciPitchToStrAndFretViolin[playedNotes[0].pitch];
        let previousNoteFretAndColor = previousNoteFromTable.color[0] + previousNoteFromTable.fret;
        previousNote = document.getElementsByClassName(previousNoteFretAndColor)[0];
        previousNote.style.color = 'white';
        let nextNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
        let nextNoteFretAndColor = nextNoteFromTable.color[0] + nextNoteFromTable.fret;
        let nextNote = document.getElementsByClassName(nextNoteFretAndColor)[0];
        nextNote.style.color = 'black';
        playedNotes.shift();
      }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo === 1) {
      currentInterval = 120;
    } else {
      currentInterval = (Number(myObstacles[myObstacles.length - 2].type)) * 120;
    }
    if (myGameArea.frameNo == 1 || everyinterval(currentInterval)) {
        x = myGameArea.canvas.width;
        noteWidth = twinkleTwinkleViolin[beatCounter].length * 110;
        noteColor = twinkleTwinkleViolin[beatCounter].color;
        noteLength = twinkleTwinkleViolin[beatCounter].length;
        notePitch = twinkleTwinkleViolin[beatCounter].pitch;
        let fretNoXPos = x + (noteWidth / 2);
        let fretNo = new component("30px", "Consolas", "black", fretNoXPos, 215, "text", keyTracker)
        fretNo.text = twinkleTwinkleViolin[beatCounter].fret;
        myObstacles.push(new component(noteWidth, 50, noteColor, x, 180, noteLength, keyTracker));
        myObstacles.push(fretNo);
        myNotes.push(new component(noteWidth, 50, "rgba(0,0,0,0)", x, 180, noteLength, keyTracker, notePitch))
        beatCounter++;
        keyTracker++;
        currentInterval = noteLength * 120;
        if (myGameArea.frameNo == 1) {
          let firstNoteFromTable = sciPitchToStrAndFretViolin[myNotes[0].pitch];
          let firstNoteFretAndColor = firstNoteFromTable.color[0] + firstNoteFromTable.fret;
          let firstNote = document.getElementsByClassName(firstNoteFretAndColor)[0];
          firstNote.style.color = 'black';
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
    // myScore.text="SCORE: " + myGameArea.frameNo;
    // myScore.update();
    playLine.newPos();
    playLine.update();
  }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let startSongButton = document.getElementsByClassName('startSong')[0];
  let pauseButton = document.getElementsByClassName('pauseButton')[0];
  let resumeButton = document.getElementsByClassName('resumeButton')[0];
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
    event.target.style.display = "none";
    pauseButton.style.display = null;
    paused = false;
    songAudio.play();
  })
});
