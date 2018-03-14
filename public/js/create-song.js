let newSongNoteList = [];

document.addEventListener("DOMContentLoaded", (event) => {
  let addNoteButton = document.getElementsByClassName('addNoteButton')[0];
  let submitNewSongButton = document.getElementsByClassName('submitNewSongButton')[0];
  addNoteButton.addEventListener('click', (event) => {
    let newNoteToBeAdded = {};
    let newLi = document.createElement('li');
    let newText = document.createTextNode(document.getElementsByClassName('noteSelect')[0].value + document.getElementsByClassName('octaveSelect')[0].value + ' for ' + document.getElementsByClassName('lengthSelect')[0].value + ' beats');
    newLi.appendChild(newText);
    document.getElementsByClassName('addNoteUl')[0].appendChild(newLi);
    newNoteToBeAdded.pitch = (document.getElementsByClassName('noteSelect')[0].value).toLowerCase() + document.getElementsByClassName('octaveSelect')[0].value;
    newNoteToBeAdded.length = Number(document.getElementsByClassName('lengthSelect')[0].value);
    newSongNoteList.push(newNoteToBeAdded);
  })
  submitNewSongButton.addEventListener('click', (event) => {
    let newSongTitle = document.getElementsByClassName('songNameInput')[0].value;
    let newSongDifficulty = document.getElementsByClassName('difficultySelect')[0].value;
    console.log('button is working')
    console.log(newSongNoteList)
    console.log(newSongTitle)
    console.log(newSongDifficulty)
    $.ajax({
      method: 'POST',
      url: '/api/v1/songs',
      data: {
        name: newSongTitle,
        difficulty: newSongDifficulty,
        songData: newSongNoteList,
        arrayLength: newSongNoteList.length
      },
      success: (json) => {
        alert('song was successfully added to db!');
      },
      error: () => {
        console.log('error in adding new song to db');
      }
    })
  })
});
