import { animate, scroll } from "motion";

scroll(
  animate("#title", {
    fontWeight: [400, 900],
  }),
  {
    offset: ["start start", "50% start"],
    target: document.getElementById("scroll-tracker")!,
  }
);

const header = document.getElementById("header")!;
let cancelCallback: VoidFunction | null = null;
function updateHeaderAnimation() {
  if (cancelCallback) {
    cancelCallback();
  }
  // Reset header style to initial state before re-applying animation
  header.style.top = "50%";
  cancelCallback = scroll(
    animate(header, {
      top: ["50%", `${header.offsetHeight / 2}px`],
    }),
    {
      offset: ["start start", "50% start"],
      target: document.getElementById("scroll-tracker")!,
    }
  );
}

updateHeaderAnimation();
window.addEventListener("resize", updateHeaderAnimation);

const initialFadeIn = animate([
  [
    "#title",
    {
      opacity: 1,
    },
    { duration: 1, ease: "easeIn" },
  ],
  [
    "#description",
    {
      opacity: [0, 1],
    },
    { duration: 1, ease: "easeIn", at: "-0.5" },
  ],
  [
    "#content",
    {
      display: ["none", "block"]
    }
  ]
]);

initialFadeIn.finished.then(() => {
  scroll(
    animate("#description", {
      opacity: [1, 0],
    }),
    {
      offset: ["25% start", "50% start"],
      target: document.getElementById("scroll-tracker")!,
    }
  );
});
