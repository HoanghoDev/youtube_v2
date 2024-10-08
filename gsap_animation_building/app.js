let background_city = document.getElementById("background_city");
function loadSVG() {
  fetch("city.svg")
    .then((response) => {
      return response.text();
    })
    .then((svgText) => {
      background_city.innerHTML = svgText;
      let city = background_city.querySelector("svg");
      city.setAttribute("preserveAspectRatio", "xMidYMid slice");
      setAnimationScroll();
    });
}
loadSVG();
function setAnimationScroll() {
  gsap.registerPlugin(ScrollTrigger);

  var openup1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#background_city",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: true,
    },
  });
  openup1
    .add(
      [
        gsap.to("#group_layer_1", 2, {
          opacity: 0,
        }),
        gsap.to("#background_city svg", 2, {
          scale: 1.5,
        }),
      ],
      "+=2"
    )
    .add(
      [
        gsap.to("#building_top", 2, {
          attr: { y: -500 },
          opacity: 0,
        }),
        gsap.to("#wall_side", 2, {
          attr: { x: 0 },
          opacity: 0,
        }),
        gsap.to("#wall_front", 2, {
          attr: { x: 1140, y: 832 },
          opacity: 0,
        }),
      ],
      "+=2"
    )
    .add(
      [
        gsap.to("#interior_wall_side", 2, {
          attr: { x: 0 },
          opacity: 0,
        }),
        gsap.to("#interior_wall__top", 2, {
          attr: { y: -500 },
          opacity: 0,
        }),
        gsap.to("#interior_wall_side_2", 2, {
          opacity: 0,
        }),
        gsap.to("#interior_wall_front", 2, {
          opacity: 0,
        }),
      ],
      "+=2"
    );
}
