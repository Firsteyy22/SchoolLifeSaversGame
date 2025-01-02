const hoverGroup = document.getElementById('brokenarm');
const hoverImage = document.getElementById('hover-image');

// Show the image on hover
hoverGroup.addEventListener('mouseover', () => {
    hoverImage.style.display = 'block';
});

// Hide the image when the mouse leaves
hoverGroup.addEventListener('mouseout', () => {
    hoverImage.style.display = 'none';
});


const hoverGroup2 = document.getElementById('blood');
const hoverImage2 = document.getElementById('hover-image2');

// Show the image on hover
hoverGroup2.addEventListener('mouseover', () => {
    hoverImage2.style.display = 'block';
});

// Hide the image when the mouse leaves
hoverGroup2.addEventListener('mouseout', () => {
    hoverImage2.style.display = 'none';
});


const hoverGroup3 = document.getElementById('scarleg');
const hoverImage3 = document.getElementById('hover-image3');

// Show the image on hover
hoverGroup3.addEventListener('mouseover', () => {
    hoverImage3.style.display = 'block';
});

// Hide the image when the mouse leaves
hoverGroup3.addEventListener('mouseout', () => {
    hoverImage3.style.display = 'none';
});


const hoverGroup4 = document.getElementById('scararm');
const hoverImage4 = document.getElementById('hover-image4');

// Show the image on hover
hoverGroup4.addEventListener('mouseover', () => {
    hoverImage4.style.display = 'block';
});

// Hide the image when the mouse leaves
hoverGroup4.addEventListener('mouseout', () => {
    hoverImage4.style.display = 'none';
});

const hoverGroup5 = document.getElementById('fire');
const hoverImage5 = document.getElementById('hover-image5');

// Show the image on hover
hoverGroup5.addEventListener('mouseover', () => {
    hoverImage5.style.display = 'block';
});

// Hide the image when the mouse leaves
hoverGroup5.addEventListener('mouseout', () => {
    hoverImage5.style.display = 'none';
});

const clickableGroup = document.getElementById('clickable-group');

clickableGroup.addEventListener('click', () => {
    // Add the 'shake' class
    clickableGroup.classList.add('shake');

    // Remove the 'shake' class after the animation ends
    setTimeout(() => {
        clickableGroup.classList.remove('shake');
    }, 500); // Match the animation duration (0.5s)
});
