const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const price = document.getElementById("total");
const pickAMovie = document.getElementById("movie");
populateUi();
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedmovieIndex", movieIndex);
  localStorage.setItem("selectedmoviePrice", moviePrice);
}
let ticketPrice = +pickAMovie.value;
//updating selected value
function updateSelectedCout() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  count.textContent = selectedSeats.length;
  price.textContent = selectedSeats.length * ticketPrice;
  const seatIndex = [...selectedSeats].map((a) => [...selectedSeats].indexOf(a));
  localStorage.setItem("seatsIndex", JSON.stringify(seatIndex));
}
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectMovieIndex = localStorage.getItem("selectedmovieIndex");
  if (selectMovieIndex !== null) {
    pickAMovie.selectedIndex = selectMovieIndex;
  }
}

container.addEventListener("click", (a) => {
  if (a.target.classList.contains("seat") && !a.target.classList.contains("occupied")) {
    a.target.classList.toggle("selected");
    updateSelectedCout();
  }
});

pickAMovie.addEventListener("change", (a) => {
  ticketPrice = +a.target.value;
  setMovieData(a.target.selectedIndex, a.target.value);
  updateSelectedCout();
});
updateSelectedCout();
