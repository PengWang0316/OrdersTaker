import anime from 'animejs';

// const ORDER_FLOATING_BUTTON_ID = 'orderFloatingButton';
const ORDER_FLOATING_BUTTON_NUMBER_ID = 'orderNumberBadge';

// let orderFloatingButton;
let orderNumberBadge; // Keeping the number Badge element.
let animateOrderNumberTimeout; // Using to keep the timeout function.

/**
 * Animating the order number in the order floating button.
 * @return {null} No return.
 */
export const animateOrderNumber = () => {
  // if (!orderFloatingButton) orderFloatingButton = document.getElementById(ORDER_FLOATING_BUTTON_ID);
  if (!orderNumberBadge) orderNumberBadge = document.getElementById(ORDER_FLOATING_BUTTON_NUMBER_ID);
  if (orderNumberBadge)
    anime({
      targets: orderNumberBadge,
      scale: [
        { value: 1.5, duration: 350, elasticity: 100 },
        { value: 1, delay: 550, duration: 250, elasticity: 100 }
      ],
      rotate: [
        { value: 360, duration: 700, elasticity: 100 },
        { value: -360, delay: 300, duration: 700, elasticity: 100 }
      ]
    });
  else { // If the html element has not been add to the dom due to the Redux state has not been updated, setting up a timeout function to try it again shortly.
    if (animateOrderNumberTimeout) clearTimeout(animateOrderNumberTimeout); // Making sure just one timeout function will be scheduled.
    animateOrderNumberTimeout = setTimeout(animateOrderNumber, 200);
  }
};

// export const moveToOrderButton = id => {};
export default animateOrderNumber;
