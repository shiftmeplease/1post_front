import anime from "animejs";

export function slide() {
  const self = {};
  self.slideFn = (node, props) => {
    if (!props) return;
    const { duration, delay } = props;
    const style = getComputedStyle(node);
    const nodeHeigth = parseFloat(style.height);
    //   const padding_top = parseFloat(style.paddingTop);
    //   const padding_bottom = parseFloat(style.paddingBottom);
    //   const margin_top = parseFloat(style.marginTop);
    //   const margin_bottom = parseFloat(style.marginBottom);
    //   const border_top_width = parseFloat(style.borderTopWidth);
    //   const border_bottom_width = parseFloat(style.borderBottomWidth);
    let animation = anime({
      targets: node,
      duration: duration,
      // delay: delay,
      loop: true,
      autoplay: false,
      easing: "easeInOutCirc",
      // opacity: [0, 1],
      height: [0, nodeHeigth],
      // "padding-top": [padding_top, 0],
      // "padding-bottom": [padding_bottom, 0],
      // "margin-top": [margin_top, 0],
      // "margin-bottom": [margin_bottom, 0],
      // "border-top-width": [border_top_width, 0],
      // "border-bottom-width": [border_bottom_width, 0],
      // translateY: {
      //   value: [30, 0],
      //   duration: 250,
      // },
      loopBegin: () => {
        self.loopBegin && self.loopBegin();
      },
      loopComplete: () => {
        self.loopComplete && self.loopComplete();
      },
      // "max-height": "100%",
      // scale: [0, 1],
      // delay: anime.stagger(200),
    });
    return {
      delay: delay,
      duration: duration,
      tick: (t) => {
        const tick = t * duration;
        animation.seek(tick);
      },
    };
  };
  return self;
}

// function reverse(node, { animated, duration }) {
//     if (!animated) return;
//     const style = getComputedStyle(node);
//     const nodeHeigth = parseFloat(style.height);
//     if (animation) {
//       // animation.pause();
//       animation.reset();
//     }
//     animation = anime({
//       targets: node,
//       duration,
//       easing: "easeInOutCirc",
//       opacity: [1, 0],
//       height: [nodeHeigth, 0],
//       // scale: [1, 0],
//       // delay: anime.stagger(200),
//     });

//     return {
//       duration,
//     };
//   }
//   function forward(node, { animated, duration }) {
//     if (!animated) return;
//     const style = getComputedStyle(node);
//     const nodeHeigth = parseFloat(style.height);
//     animation && animation.reset();
//     animation = anime({
//       targets: node,
//       duration,
//       easing: "easeInOutCirc",
//       opacity: [0, 1],
//       height: [0, nodeHeigth],
//       // scale: [0, 1],
//       // delay: anime.stagger(200),
//     });
//     return {
//       duration,
//     };
//   }
