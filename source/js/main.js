"use strict";

// плавная прокрутка
const anchors = [].slice.call(document.querySelectorAll(".main-nav__link")),
   animationTime = 300,
   framesCount = 20;

anchors.forEach(function (item) {
   item.addEventListener("click", function (e) {
      e.preventDefault();

      const coordY =
         document
            .querySelector(item.getAttribute("href"))
            .getBoundingClientRect().top + window.pageYOffset;

      const scroller = setInterval(function () {
         const scrollBy = coordY / framesCount;

         if (
            scrollBy > window.pageYOffset - coordY &&
            window.innerHeight + window.pageYOffset < document.body.offsetHeight
         ) {
            window.scrollBy(0, scrollBy);
         } else {
            window.scrollTo(0, coordY);
            clearInterval(scroller);
         }
      }, animationTime / framesCount);
   });
});
