//Smooth Scroll

function smoothScroll(destination, duration){
    const target = document.querySelector(destination);

    //get the distancen between top of screen window and top of your target
    const targetPosition = target.getBoundingClientRect().top;

    //if you are at the top of screen window, the number is 0,
    //if you scroll down the page, the number will be increased,
    //it is relative to the top of window
    let startPosition = window.pageYOffset;

    //get the distance between target and your starting position
    let distance = targetPosition - startPosition;
    let startTime = null;


    //loop through function animation at 60 FPS
    function animation(currentTime){
        //console.log(startTime, currentTime);
        //startTime is when the page starts refreshing, the page is loaded
        //because we set startTime = null, startTime = currentTime
        //so startTime is time, after page loaded, until user actually clicked button
        if(startTime === null) startTime = currentTime;

        //currentTime is actually keeping tracking current moment, it keeps going
        //until timeElapsed > duration
        let timeElapsed = currentTime - startTime;
        const scrollAnimation = ease(timeElapsed, startPosition, distance, duration);
        //run this function only in vertical direction (horizontal, vertical)
        window.scrollTo(0, scrollAnimation);
        
        //when timeElapsed > duration, then it will not run this loop any more 
        if(timeElapsed < duration) requestAnimationFrame(animation);
        
    }


    //easing in/out - acceleration until halfway, then deceleration
    //make animation looks nice 
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    //do the smooth scroll animation
    requestAnimationFrame(animation);

}

//scroll from box 1 to box 2
const button1 = document.querySelector('.box1 img');
button1.addEventListener('click', () => {
    smoothScroll('.box2', 1000);
});

//scroll back from box 2 to box 1
const button2 = document.querySelector('.box2 img');
button2.addEventListener('click', () => {
    smoothScroll('.box1', 1000);
});



