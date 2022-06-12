const sections = document.querySelectorAll('section');
const progress = document.querySelector('.progress h2');
const circles = document.querySelectorAll('.circle');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const grapesImg = document.querySelector('.grapes-img');
const section3Wrapper = document.querySelector('.section-3-wrapper');
const section1Wrapper = document.querySelector('.section-1-wrapper');
const section5Wrapper = document.querySelector('.section-5-wrapper');
const menu = document.querySelector('.menu');
const navList = document.querySelector('.nav-list');
const menuLines = document.querySelectorAll('.menu-line');

section1Wrapper.style.transform = 'scale(1)';

let counter1 = 0;
let counter2 = 1;
let bool = true;

// window.addEventListener('scroll', (e) => {
//     console.log(e);
// });

//page progress count function
const progressCounter = () => {
    progress.textContent = `${counter2}/${sections.length}`;

    Array.from(circles).forEach((circle) => {
        circle.style.backgroundColor = "transparent";
    });

    document.querySelector(`.circle${counter2}`).style.backgroundColor = "#ddd";
};

//page controlling function for all sections
const pageController = () => {
    bool = true;
    if(counter1 === 5){
        Array.from(sections).forEach((section) => {
            section.style.left = '0';
        });
        counter1 = 0;
        counter2 = 1; 
        section1Wrapper.style.transform = 'scale(1)';
        section5Wrapper.style.transform = 'scale(1.5)';
        progressCounter();
        bool = false;
    }

    if(counter1 === -1){
        Array.from(sections).forEach((section) => {
            if(section.classList[0] === 'section-5'){
                return;
            }
            section.style.left = '-100vw';
        });
        counter1 = 4;
        counter2 = 5; 
        section1Wrapper.style.transform = 'scale(1.5)';
        section5Wrapper.style.transform = 'scale(1)';
        progressCounter();
        bool = false;
    }

    progressCounter();
    return bool;
}

// wheel event on mouse scroll(delta Y wheel scroll down/up)
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if(e.deltaY > 0){
        counter1++;
        counter2++;
    } else{
        counter1--;
        counter2--;
    }

    pageController();
    progressCounter();

    if(bool){
        document.querySelector(`.section-${e.deltaY > 0 ? counter1 : counter2}`).style.left = `${e.deltaY > 0 ? '-100vw' : '0'}`;

        document.querySelector(`.section-${e.deltaY > 0 ? counter1 : counter2}-wrapper`).style.transform = `scale(${e.deltaY > 0 ? "1.5" : "1"})`;

        document.querySelector(`.section-${e.deltaY > 0 ? counter1 + 1 : counter2 + 1}-wrapper`).style.transform = `scale(${e.deltaY > 0 ? "1" : "1.5"})`;
    }

});

//click events for arrow buttons
leftBtn.addEventListener('click', () => {
    counter1--;
    counter2--;

    pageController() && 
        (document.querySelector(`.section-${counter2}`).style.left = '0');

    if(bool){
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
        document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform = 'scale(1.5)';
    }
});

rightBtn.addEventListener('click', () => {
    counter1++;
    counter2++;

    pageController() && 
        (document.querySelector(`.section-${counter1}`).style.left = '-100vw');

    if(bool){
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
        document.querySelector(`.section-${counter1}-wrapper`).style.transform = 'scale(1.5)';
    }
});

//mouse over event on grapes images
grapesImg.addEventListener('mouseover', () => {
    section3Wrapper.style.opacity = "0.5";
});

//mouse out event on grapes images
grapesImg.addEventListener('mouseout', () => {
    section3Wrapper.style.opacity = "1";
});

menu.addEventListener('click', (e) => {
    navList.classList.toggle("change");
    menuLines.forEach((menuLine) => {
        menuLine.classList.toggle("change")
    });
});