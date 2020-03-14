/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const frag = document.createDocumentFragment();
/**
 * End Global Variablesfuc
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu() {
    let listId = 1;
    for(let section of sections){
        let li = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.href = '#' + section.getAttribute('id');
        li.textContent = section.getAttribute('data-nav');
        li.classList.add('menu__link');
        li.id = 'li' + listId;
        frag.appendChild(li);
        listId++;
    }
    navBar.appendChild(frag);
}
// Add class 'active' to section when near top of viewport
function sectionActive() {
    document.addEventListener('scroll',function(){
        const viewPortTop = window.scrollY;
        const viewPortBottom = viewPortTop + document.documentElement.clientHeight;
        for (let section of sections) {
            const sectionY = section.offsetTop + (section.offsetHeight / 2);
            sectionY > viewPortTop && sectionY < viewPortBottom
            ? section.classList.add('your-active-class')
            : section.classList.remove('your-active-class');
        }
    })
}
// Scroll to anchor ID using scrollTO event
function sectionScroll(){
    let li1 = document.querySelector('#li1');
    let li2 = document.querySelector('#li2');
    let li3 = document.querySelector('#li3');
    let li4 = document.querySelector('#li4');
    li1.addEventListener('click',function(){
        let section = document.querySelector('#section1');
        section.scrollIntoView({
            behavior:'smooth',
        });
    })
    li2.addEventListener('click',function(){
        let section = document.querySelector('#section2');
        section.scrollIntoView({
            behavior:'smooth',
        });
    })
    li3.addEventListener('click',function(){
        let section = document.querySelector('#section3');
        section.scrollIntoView({
            behavior:'smooth',
        });
    })
    li4.addEventListener('click',function(){
        let section = document.querySelector('#section4');
        section.scrollIntoView({
            behavior:'smooth',
        });
    })
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu();
// Scroll to section on link click
sectionScroll();
// Set sections as active
sectionActive();

