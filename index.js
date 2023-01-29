"use strict";

var rand_name = document.querySelector(".rand_name");
var rand_name_arr = [];
var gs_count = Number(document.querySelector(".gs_count").textContent);
var guesses = document.querySelector(".guesses");
var guesses_array = [];
var image = document.querySelector(".image_item");
var wins_count = Number(document.querySelector(".wins_count").textContent);
var t;
class HangMan {
  randomPerson;
  rand_name_array;
  rand_name;
  image_item;
  as;
  t;
  gs_count;
  guesses;
  guesses_array;
  wins_count;
  constructor(
    rand_name,
    rand_name_arr,
    gs_count,
    guesses,
    guesses_array,
    wins_count
  ) {
    this.rand_name_array = rand_name_arr;
    this.rand_name = rand_name;
    this.gs_count = gs_count;
    this.guesses = guesses;
    this.guesses_array = guesses_array;
    this.wins_count = wins_count;
  }
  RandomPerson() {
    const actors = [
      {
        id: 1,
        name: "Leonardo DiCaprio",
        img: "img/leonardo.jfif",
      },
      {
        id: 2,
        name: "Jordan Belfort",
        img: "img/jordan.jfif",
      },
      {
        id: 3,
        name: "Martin Scorsese",
        img: "img/martin.jfif",
      },
      {
        id: 4,
        name: "Margot Robbie",
        img: "img/margot.jfif",
      },
      {
        id: 5,
        name: "Matthew McConaughey",
        img: "img/matthew.jfif",
      },
    ];
    let index = Math.floor(Math.random() * actors.length);
    return actors[index];
  }
  randomPerson = this.RandomPerson();
  image_item = this.randomPerson.name;
  RandomPersonName() {
    for (let i = 0; i < this.randomPerson.name.length; i++) {
      if (this.randomPerson.name[i] !== " ") {
        this.rand_name_array.push("_");
      } else {
        this.rand_name_array.push(" ");
      }
    }
  }
  RandomPersonNamePrint() {
    // console.log(this.rand_name_array);
    for (let i of this.rand_name_array) {
      this.rand_name.textContent += " " + i;
    }
  }
  Reset() {
    this.gs_count = 13;
    this.randomPerson = this.RandomPerson();
    this.guesses.textContent = "";
    this.guesses_array = [];
    this.as = "";
    this.t++;
    this.rand_name_array = [];
    // console.log(this.randomPerson);
    this.RandomPersonName();
    this.image_item = this.randomPerson.img;
  }

  EventListener(e) {
    this.as = e;
    this.t = 0;

    for (let i = 0; i < this.randomPerson.name.length; i++) {
      if (this.randomPerson.name[i].toLowerCase() === this.as) {
        this.rand_name_array[i] = this.as;
        this.t++;
      }
    }

    if (this.gs_count <= 1 && this.t === 0) {
      this.image_item = "img/person.png";
      this.Reset();
    }
    if (!this.rand_name_array.includes("_")) {
      this.wins_count++;
      this.Reset();
    }
    if (this.t === 0 && !this.guesses_array.includes(this.as)) {
      this.gs_count--;
      this.guesses_array.push(this.as);
    }
    this.rand_name.textContent = "";

    this.RandomPersonNamePrint();
    this.guesses.textContent = this.guesses_array;
  }
}

const hangman = new HangMan(
  rand_name,
  rand_name_arr,
  gs_count,
  guesses,
  guesses_array,
  wins_count
);
window.addEventListener("DOMContentLoaded", (e) => {
  hangman.EventListener(e.key);
  document.querySelector(".gs_count").textContent = hangman.gs_count;
  document.querySelector(".wins_count").textContent = hangman.wins_count;
  image.src = hangman.image_item;
});
window.addEventListener("keyup", (e) => {
  hangman.EventListener(e.key);
  document.querySelector(".gs_count").textContent = hangman.gs_count;
  document.querySelector(".wins_count").textContent = hangman.wins_count;
  image.src = hangman.image_item;
});
