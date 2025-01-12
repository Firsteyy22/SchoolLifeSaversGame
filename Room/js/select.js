'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'next'];
    this.carouselData = [
        { 'id': '3', 'src': '/picture/roompng/Emergency3.png', 'href': '/Room/html/room1.html' },
        { 'id': '4', 'src': '/picture/roompng/Emergency4.png', 'href': '/Room/html/room2.html' },
        { 'id': '1', 'src': '/picture/roompng/Emergency1.png', 'href': '/Room/html/room3.html'},
        { 'id': '2', 'src': '/picture/roompng/Emergency2.png', 'href': '/Room/html/room4.html' },
        // Add more images
    ];
    this.currentItemIndex = 0; // Track the current item
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
    this.addButton();
  }

  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    this.el.append(container, controls);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('img');

      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute('loading', 'lazy');
      carouselItem.setAttribute('data-index', `${index + 1}`);

      container.appendChild(carouselItem);
    });

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');
      btn.textContent = option; // Simplified button text
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);
      controls.appendChild(btn);
    });

    this.setControls([...controls.children]);
    this.carouselContainer = container;
  }

  addButton() {
    const btn = document.createElement('button');
    btn.id = 'visitRoomButton';  // Set the ID for the button
    btn.textContent = 'CONFIRM';
    btn.onclick = () => {
      const href = this.carouselData[this.currentItemIndex].href;
      window.location.href = href;
    };
    this.el.appendChild(btn);
  }  

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();
        const direction = control.getAttribute('data-name');
        this.navigate(direction);
      };
    });
  }

  navigate(direction) {
    if (direction === 'previous') {
      this.currentItemIndex = (this.currentItemIndex - 1 + this.carouselData.length) % this.carouselData.length;
    } else if (direction === 'next') {
      this.currentItemIndex = (this.currentItemIndex + 1) % this.carouselData.length;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    // Update carousel display and adjust button link
    const currentData = this.carouselData[this.currentItemIndex];
    const carouselItems = this.el.querySelectorAll('.carousel-item');

    carouselItems.forEach((item, index) => {
      const dataIndex = (this.currentItemIndex + index) % this.carouselData.length;
      item.src = this.carouselData[dataIndex].src;
    });
  }
}

const el = document.querySelector('.carousel');
const exampleCarousel = new Carousel(el);
exampleCarousel.mounted();
