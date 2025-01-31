// Card interface
class Card {
  constructor(node, position) {
    this.node = node;
    this.position = position;
  }

  nextPosition() {
    let nextPosition = 1;

    if (this.position != 4) {
      nextPosition = this.position + 1;
    }

    return nextPosition;
  }

  prevPosition() {
    let prevPosition = 4;

    if (this.position != 1) {
      prevPosition = this.position - 1;
    }

    return prevPosition;
  }

  moveNext() {
    this.node.classList.replace(
      `position${this.position}`,
      `position${this.nextPosition()}`
    );

    this.position = this.nextPosition();
  }

  movePrev() {
    this.node.classList.replace(
      `position${this.position}`,
      `position${this.prevPosition()}`
    );

    this.position = this.prevPosition();
  }
}

// Initializations
const [prev, next] = document.querySelectorAll("i");
const gallery = document.querySelector(".gallery");
const cards = [];

// Instantiate cards and populate cards array
document.querySelectorAll(".card").forEach((node, index) => {
  cards.push(new Card(node, index + 1));
});

// Handle click events by swapping the functionality
prev.addEventListener("click", () => {
  cards.forEach((card) => {
    card.moveNext();
  });
});

next.addEventListener("click", () => {
  cards.forEach((card) => {
    card.movePrev();
  });
});

// Handle touch slide events
gallery.addEventListener("touchstart", (event) => {
  start = event.targetTouches[0].screenX;
});

gallery.addEventListener("touchend", (event) => {
  let end = event.changedTouches[0].screenX;
  const range = Math.abs(start - end);

  if (range > 30) {
    if (start < end) {
      cards.forEach((card) => {
        card.movePrev();
      });
    } else if (start > end) {
      cards.forEach((card) => {
        card.moveNext();
      });
    }
  }
});

  // Select all locked level cards
  document.querySelectorAll(".card.locked").forEach(card => {
      card.addEventListener("click", function(event) {
          event.preventDefault(); // Prevents clicking the link
          alert("🔒 This level is locked! Complete previous levels to unlock.");
          console.log(`⛔ Attempted to access a locked level: ${this.id}`);
      });
  });
