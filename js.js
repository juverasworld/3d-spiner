var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  blur.style.left = dets.x - 250 + "px";
  blur.style.top = dets.y - 250 + "px";
});

window.onload = function () {
  const gallery = document.querySelector(".gallery");
  const previewImage = document.querySelector(".preview-img img");

  document.addEventListener("mouseover", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;


    const rotateX = 55 + percentY * 2;
    const rotateY = percentX * 2;


    gsap.to(gallery, {
      duration: 1,
      ease: "power2.out",
      rotateX: rotateX,
      rotateY: rotateY,
      overwrite: "auto",
    });
  });

  for (let i = 0; i < 102; i++) {
    const item = document.createElement("div");
    item.className = "item";
    const img = document.createElement("img");
    img.src = "./assets/" + ((i % 15) + 1) + ".jpg";

    item.appendChild(img);
    gallery.appendChild(item);
  }

  const items = document.querySelectorAll(".item");
  const numeberOfItems = items.length;
  const angleIncrement = 360 / numeberOfItems;

  items.forEach((item, index) => {
    gsap.set(item, {
      rotationY: 90,
      rotationZ: index * angleIncrement - 90,
      transformOrigin: "30% 340px",
    });
    item.addEventListener("mouseover", function () {
      const imgInsideItem = item.querySelector("img");
      previewImage.src = imgInsideItem.src;
      gsap.to(item, {
        x: 10,
        z: 10,
        y: 10,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    item.addEventListener("mouseout", function () {
      previewImage.src = "./assets/1.jpg";
      gsap.to(item, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  });

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
    onRefresh: setupRotation,
    onUpdate: (self) => {
      const rotationProgress = self.progress * 360 * 1;
      items.forEach((item, index) => {
        const currentAngle = index * angleIncrement - 90 + rotationProgress;
        gsap.to(item, {
            rotationZ:currentAngle,
            duration:1,
            ease:"power3.out",
            overwrite: "auto",
        })
      });
    },
  });
};

function setupRotation() {}

var menuToggle = document.getElementById("menuToggle");

var menuBar = gsap.timeline();

menuBar.to('.bar-1', 0.5,{
	attr:{d: "M8,2 L2,8"},
	x:1,
	ease: Power2.easeInOut
}, 'start')

menuBar.to('.bar-2', 0.5,{
	autoAlpha: 0
}, 'start')

menuBar.to('.bar-3', 0.5,{
	attr:{d: "M8,8 L2,2"},
	x:1,
	ease: Power2.easeInOut
}, 'start')

menuBar.reverse();


var tl = gsap.timeline({ paused: true});

tl.to('.fullpage-menu', {
	duration:0,
	display: "block",
	ease: 'Expo.easeInOut',
});

tl.from('.menu-bg span', {
	duration:1,
	x:"100%",
	stagger: 0.1,
	ease: 'Expo.easeInOut'
});

tl.from('.main-menu li a', {
	duration:1.5,
	y:"100%",
	stagger: 0.2,
	ease: 'Expo.easeInOut'
} , "-=0.5");

tl.from('.social-links li', {
	duration:1,
	y:"-100%",
	opacity:0,
	stagger: 0.1,
	ease: 'Expo.easeInOut'
} , "-=0.5");

tl.reverse();

menuToggle.addEventListener('click', function(){
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
});

// window.onload = function () {
//   const gallery = document.querySelector(".gallery");
//   const previewImage = document.querySelector(".preview-img img");

//   document.addEventListener("mouseover", function (event) {
//     const x = event.clientX;
//     const y = event.clientY;

//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;

//     const percentX = (x - centerX) / centerX;
//     const percentY = (y - centerY) / centerY;

//     const rotateX = 55 + percentY * 2;
//     const rotateY = percentX * 2;

//     gsap.to(gallery, {
//       duration: 1,
//       ease: "power2.out",
//       rotateX: rotateX,
//       rotateY: rotateY,
//       overwrite: "auto",
//     });
//   });

//   // Fetch images from Unsplash using their API (replace with your access key)
//   const unsplashAccessKey = "D5uQI-qyQh1uAVOnAqkJPwXpOZyicnGg9HLNEP2e91w"; // Replace with your actual key
//   const numberOfImages = 30;

//   fetch(`https://api.unsplash.com/photos/random?count=${numberOfImages}&client_id=${unsplashAccessKey}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const images = data.map((image) => image.urls.regular); // Extract image URLs

//       for (let i = 0; i < numberOfImages; i++) {
//         const item = document.createElement("div");
//         item.className = "item";
//         const img = document.createElement("img");
//         img.src = images[i];

//         item.appendChild(img);
//         gallery.appendChild(item);
//       }

//       const items = document.querySelectorAll(".item");
//       const angleIncrement = 360 / numberOfImages;

//       items.forEach((item, index) => {
//         gsap.set(item, {
//           rotationY: 90,
//           rotationZ: index * angleIncrement - 90,
//           transformOrigin: "50% 400px",
//         });

//         item.addEventListener("mouseover", function () {
//           const imgInsideItem = item.querySelector("img");
//           previewImage.src = imgInsideItem.src;
//           gsap.to(item, {
//             x: 10,
//             z: 10,
//             y: 10,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });

//         item.addEventListener("mouseout", function () {
//           previewImage.src = "./assets/1.jpg"; // Clear preview image on mouseout
//           gsap.to(item, {
//             x: 0,
//             y: 0,
//             z: 0,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });
//       });

//       ScrollTrigger.create({
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 2,
//         onRefresh: setupRotation,
//         onUpdate: (self) => {
//           const rotationProgress = self.progress * 360 * 1;
//           items.forEach((item, index) => {
//             const currentAngle = index * angleIncrement - 90 + rotationProgress;
//             gsap.to(item, {
//               rotationZ: currentAngle,
//               duration: 1,
//               ease: "power3.out",
//               overwrite: "auto",
//             });
//           });
//         },
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching images from Unsplash:", error);
//     });
// };

// function setupRotation() {}
// "./assets/" + ((i % 15) + 1) + ".jpg"

// window.onload = function () {
//   const gallery = document.querySelector(".gallery");
//   const previewImage = document.querySelector(".preview-img img");

//   document.addEventListener("mouseover", function (event) {
//     const x = event.clientX;
//     const y = event.clientY;

//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;

//     const percentX = (x - centerX) / centerX;
//     const percentY = (y - centerY) / centerY;

//     const rotateX = 55 + percentY * 2;
//     const rotateY = percentX * 2;

//     gsap.to(gallery, {
//       duration: 1,
//       ease: "power2.out",
//       rotateX: rotateX,
//       rotateY: rotateY,
//       overwrite: "auto",
//     });
//   });

//   // Fetch 30 images from Unsplash using their API (replace with your access key)
//   const numberOfUnsplashImages = 25;

//   fetch(`https://api.unsplash.com/photos/random?count=${numberOfUnsplashImages}&client_id=D5uQI-qyQh1uAVOnAqkJPwXpOZyicnGg9HLNEP2e91w`)
//     .then((response) => response.json())
//     .then((data) => {
//       const unsplashImages = data.map((image) => image.urls.regular); // Extract Unsplash image URLs

//       // Calculate total images (30 Unsplash + remaining from local folder)
//       const totalImages = unsplashImages.length + 100; // Adjust 120 as needed for your local images

//       // Generate local image paths dynamically (assuming a specific naming convention)
//       const localImagePaths = [];
//       for (let i = 1; i <= 100; i++) { // Adjust loop range for your local images
//         localImagePaths.push(`./assets/${i}.jpg`); // Adjust path format if needed
//       }

//       const images = unsplashImages.concat(localImagePaths); // Combine Unsplash and local image URLs

//       for (let i = 0; i < totalImages; i++) {
//         const item = document.createElement("div");
//         item.className = "item";
//         const img = document.createElement("img");

//         // Use a conditional statement to determine image source (Unsplash or local)
//         if (i < numberOfUnsplashImages) {
//           img.src = images[i];
//         } else {
//           img.src = images[i]; // Use the generated local image path
//         }

//         item.appendChild(img);
//         gallery.appendChild(item);
//       }

//       const items = document.querySelectorAll(".item");
//       const angleIncrement = 360 / totalImages;

//       items.forEach((item, index) => {
//         gsap.set(item, {
//           rotationY: 90,
//           rotationZ: index * angleIncrement - 90,
//           transformOrigin: "50% 400px",
//         });

//         item.addEventListener("mouseover", function () {
//           const imgInsideItem = item.querySelector("img");
//           previewImage.src = imgInsideItem.src;
//           gsap.to(item, {
//             x: 10,
//             z: 10,
//             y: 10,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });

//         item.addEventListener("mouseout", function () {
//           previewImage.src = ""; // Clear preview image on mouseout
//           gsap.to(item, {
//             x: 0,
//             y: 0,
//             z: 0,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });
//       });
//       ScrollTrigger.create({
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 2,
//         onRefresh: setupRotation,
//         onUpdate: (self) => {
//           const rotationProgress = self.progress * 360 * 1;
//           items.forEach((item, index) => {
//             const currentAngle = index * angleIncrement - 90 + rotationProgress;
//             gsap.to(item, {
//               rotationZ: currentAngle,
//               duration: 1,
//               ease: "power3.out",
//               overwrite: "auto",
//             });
//           });
//         },
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching images from Unsplash:", error);
//     });
// };

// function setupRotation() {
//   // You can add any setup code related to rotation here if needed
// }


// window.onload = function () {
//   const gallery = document.querySelector(".gallery");
//   const previewImage = document.querySelector(".preview-img img");

//   document.addEventListener("mouseover", function (event) {
//     const x = event.clientX;
//     const y = event.clientY;

//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;

//     const percentX = (x - centerX) / centerX;
//     const percentY = (y - centerY) / centerY;

//     const rotateX = 55 + percentY * 2;
//     const rotateY = percentX * 2;

//     gsap.to(gallery, {
//       duration: 1,
//       ease: "power2.out",
//       rotateX: rotateX,
//       rotateY: rotateY,
//       overwrite: "auto",
//     });
//   });

//   // Fetch 30 images from Unsplash using their API (replace with your access key)
//   const numberOfUnsplashImages = 30;

//   fetch(`https://api.unsplash.com/photos/random?count=${numberOfUnsplashImages}&client_id=D5uQI-qyQh1uAVOnAqkJPwXpOZyicnGg9HLNEP2e91w`)
//     .then((response) => response.json())
//     .then((data) => {
//       const unsplashImages = data.map((image) => image.urls.regular); // Extract Unsplash image URLs

//       // Calculate total images (30 Unsplash + remaining from local folder)
//       const totalImages = unsplashImages.length + 99; // Adjust 120 as needed for your local images

//       // Generate local image paths dynamically (assuming a specific naming convention)
//       const localImagePaths = [];
//       for (let i = 1; i <= 99; i++) { // Adjust loop range for your local images
//         localImagePaths.push(`./assets/${i}.jpg`); // Adjust path format if needed
//       }

//       const images = unsplashImages.concat(localImagePaths); // Combine Unsplash and local image URLs

//       for (let i = 0; i < totalImages; i++) {
//         const item = document.createElement("div");
//         item.className = "item";
//         const img = document.createElement("img");

//         // Use a conditional statement to determine image source (Unsplash or local)
//         if (i < numberOfUnsplashImages) {
//           img.src = images[i];
//         } else {
//           img.src = images[i]; // Use the generated local image path
//         }

//         item.appendChild(img);
//         gallery.appendChild(item);
//       }

//       const items = document.querySelectorAll(".item");
//       const angleIncrement = 360 / totalImages;

//       items.forEach((item, index) => {
//         gsap.set(item, {
//           rotationY: 90,
//           rotationZ: index * angleIncrement - 90,
//           transformOrigin: "50% 400px",
//         });

//         item.addEventListener("mouseover", function () {
//           const imgInsideItem = item.querySelector("img");
//           previewImage.src = imgInsideItem.src;
//           gsap.to(item, {
//             x: 10,
//             z: 10,
//             y: 10,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });

//         item.addEventListener("mouseout", function () {
//           previewImage.src = ""; // Clear preview image on mouseout
//           gsap.to(item, {
//             x: 0,
//             y: 0,
//             z: 0,
//             ease: "power2.out",
//             duration: 0.5,
//           });
//         });
//       });
//       ScrollTrigger.create({
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 2,
//         onRefresh: setupRotation,
//         onUpdate: (self) => {
//           const rotationProgress = self.progress * 360 * 1;
//           items.forEach((item, index) => {
//             const currentAngle = index * angleIncrement - 90 + rotationProgress;
//             gsap.to(item, {
//               rotationZ: currentAngle,
//               duration: 1,
//               ease: "power3.out",
//               overwrite: "auto",
//             });
//           });
//         },
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching images from Unsplash:", error);
//     });
// };

// function setupRotation() {
//   // You can add any setup code related to rotation here if needed
// }
