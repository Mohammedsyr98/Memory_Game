let vegetables = [
  `<img src="img/banana.png" alt="">`,
  `<img src="img/Watermelon.png" alt="">`,
  `<img src="img/squash.png" alt="">`,
  `<img src="img/tomato.png" alt="">`,
  `<img src="img/apple.png" alt="">`,
  `<img src="img/cherry.png" alt="">`,
  `<img src="img/carrot.png" alt="">`,
  `<img src="img/eggplant.png" alt="">`,
  `<img src="img/orange.png" alt="">`,
  `<img src="img/radish.png" alt="">`,
];

let animals = [
  `<img src="img/animal1.png" alt="">`,
  `<img src="img/animal2.png" alt="">`,
  `<img src="img/animal3.png" alt="">`,
  `<img src="img/animal4.png" alt="">`,
  `<img src="img/animal5.png" alt="">`,
  `<img src="img/animal6.png" alt="">`,
  `<img src="img/animal7.png" alt="">`,
  `<img src="img/animal8.png" alt="">`,
  `<img src="img/animal9.png" alt="">`,
  `<img src="img/animal10.png" alt="">`,
];

let shapes = [
  `<img src="img/shape1.png" alt="">`,
  `<img src="img/shape2.png" alt="">`,
  `<img src="img/shape3.png" alt="">`,
  `<img src="img/shape4.png" alt="">`,
  `<img src="img/shape5.png" alt="">`,
  `<img src="img/shape6.png" alt="">`,
  `<img src="img/shape7.png" alt="">`,
  `<img src="img/shape8.png" alt="">`,
  `<img src="img/shape9.png" alt="">`,
  `<img src="img/shape10.png" alt="">`,
];
let emoji = [
  `<img src="img/emoji1.png" alt="">`,
  `<img src="img/emoji2.png" alt="">`,
  `<img src="img/emoji3.png" alt="">`,
  `<img src="img/emoji4.png" alt="">`,
  `<img src="img/emoji5.png" alt="">`,
  `<img src="img/emoji6.png" alt="">`,
  `<img src="img/emoji7.png" alt="">`,
  `<img src="img/emoji8.png" alt="">`,
  `<img src="img/emoji9.png" alt="">`,
  `<img src="img/emoji10.png" alt="">`,
];

let allPhotoes = [vegetables, animals, shapes, emoji];
console.log(allPhotoes);

let randomphotoes = Math.floor(Math.random() * allPhotoes.length);
// select images array from allphotoes
let images = [...allPhotoes[randomphotoes]];
console.log(images);
let newArray = [];
// push images from selected array to new array with random index
while (newArray.length < 20) {
  let randomNum = Math.floor(Math.random() * 20);
  if (!newArray.includes(randomNum)) {
    newArray.push(randomNum);
  }
}

let imageBox = document.querySelectorAll(".box");
let obj = {};
let randomArray = Array.from(new Set(newArray));
let nameInput = document.querySelector("input");
let name = document.querySelector(".name");
let input = document.querySelector(".input");
let button = document.getElementById("start");
document.querySelector(".boxes").classList.add("pointer-events");
document.querySelector(".game").style.filter = "blur(10px)";
let j = 0;

// check if name available in session storage

window.addEventListener("load", checkStoredName());

function checkStoredName() {
  if (sessionStorage.getItem("name") != null) {
    name.textContent = `Hello : ${sessionStorage.getItem("name")}`;
    input.remove();
    document.querySelector(".game").style.filter = "blur(0px)";

    startGame();
    addImagefromarray();
  } else {
    input.classList.remove("opacity");
  }
  if (sessionStorage.getItem("name") == null) {
    button.addEventListener("click", function () {
      if (input.value != "") {
        name.textContent = `Hello : ${nameInput.value}`;
        sessionStorage.setItem("name", nameInput.value);

        input.remove();

        document.querySelector(".game").style.filter = "blur(0px)";
      }
      startGame();
      addImagefromarray();
    });
  }
}

let first = "";
let second = "";
let targetCount = 0;
let wrongTries = 0;
let correctTries = 0;
function startGame() {
  //add question mark photo

  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      imageBox[i].classList.add("rotated");
      imageBox[i].innerHTML = `<img src="img/Asset 2.png" alt="">`;
      document.querySelector(".boxes").classList.remove("pointer-events");
      let display = document.querySelector("#time");

      var twoMinutes = 60 * 1;

      startTimer(twoMinutes, display);
    }
  }, "4000");

  let wrongSpan = document.querySelector(".wrongTries");
  let correctSpan = document.querySelector(".correctTries");

  // reveal cards after click
  for (let n = 0; n < 20; n++) {
    imageBox[n].addEventListener("click", function (e) {
      if (targetCount == 0) {
        first = imageBox[n];
        imageBox[n].innerHTML = obj[n];
        first.classList.add("pointer-events");
        first.classList.remove("rotated");

        targetCount++;
      } else if (targetCount == 1) {
        let second = imageBox[n];
        imageBox[n].innerHTML = obj[n];
        second.classList.add("pointer-events");
        second.classList.remove("rotated");

        targetCount--;

        // Check if clicking on the first card is equal to clicking on the second card

        if (first.innerHTML != second.innerHTML) {
          let wrong = new Audio("wrong.mp3");
          first.style.borderColor = "red";
          second.style.borderColor = "red";
          wrong.play();
          wrongTries++;
          wrongSpan.textContent = `Wrong tries : ${wrongTries} `;
          document.querySelector(".boxes").classList.add("pointer-events");
          setTimeout(() => {
            second.innerHTML = `<img src="img/Asset 2.png" alt="">`;
            first.innerHTML = `<img src="img/Asset 2.png" alt="">`;
            first.style.borderColor = "#3571a4";
            second.style.borderColor = "#3571a4";
            first.classList.remove("pointer-events");
            second.classList.remove("pointer-events");
            first.classList.add("rotated");
            second.classList.add("rotated");
            document.querySelector(".boxes").classList.remove("pointer-events");
          }, 2000);
        } else if (first.innerHTML == second.innerHTML) {
          correctTries++;

          correctSpan.textContent = `Correct tries : ${correctTries}`;
          let correct = new Audio("correct.mp3");
          document.querySelector(".boxes").classList.add("pointer-events");

          setTimeout(() => {
            document.querySelector(".boxes").classList.remove("pointer-events");
          }, 1000);
          first.style.borderColor = "green";
          second.style.borderColor = "green";
          correct.play();
        }
        if (correctTries == 10) {
          endGame(correctTries, wrongTries);
        }
      }
    });
  }
}
console.log(obj);

function addImagefromarray() {
  for (let i = 0; i < images.length; i++) {
    for (let m = 0; m < 2; m++) {
      if (j < 20) {
        imageBox[newArray[j]].innerHTML = images[i];

        obj[newArray[j]] = images[i];

        j++;
      } else {
        break;
      }
    }
  }
}

let result = document.querySelectorAll(".result");

function endGame(correctTries, wrongTries) {
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      imageBox[i].classList.add("pointer-events");
    }
  }, 500);
  let result = document.querySelector(".result");
  document.querySelector(".boxes").classList.add("pointer-events");
  if (correctTries < wrongTries) {
    result.children[0].textContent = `Try Again`;
    result.children[0].style.color = "red";
    result.children[1].textContent = `because your Wrong Tries bigger than Correct tries`;
  } else if (correctTries > wrongTries) {
    result.children[0].textContent = `CONGRATULATIONS!`;
    result.children[0].style.color = "green";
    result.children[1].textContent =
      " Your correct tries bigger than Wrong tries";
  }
}

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(intervalId);
      timer = duration;
      endGame(correctTries, wrongTries);
      console.log("the timer is end");
    }
  }, 1000);
}
