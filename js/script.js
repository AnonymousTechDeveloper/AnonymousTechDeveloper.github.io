playing = true; //? This stores the state of RoboFly Animation

const roboImage = document.getElementsByClassName("header-robot-image")[0];
const playIcon = document.getElementsByClassName("play-icon")[0];
const pauseIcon = document.getElementsByClassName("pause-icon")[0];

const floatingChatButton = document.getElementsByClassName("floating-chat-button")[0];
const htmlElement = document.getElementsByTagName("html")[0];
const lowerFooterElement = document.getElementsByClassName("footer-bottom")[0];

//? Toggles RoboFly animation and the play/pause icons
function toggleRoboAnimation() {
    if (playing) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
        roboImage.style.animationPlayState = "paused";
        console.log(1)
    } 
    else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        roboImage.style.animationPlayState = "running";
        console.log(2)
    }
    playing = !playing;
}

//? Listens to the 'end of scroll' event and triggers a fuction to check scroll position of the page and places the floating chat button accordingly
window.onscrollend = () => {
    let scrollPosition = htmlElement.scrollTop; //? Current (vertical) scroll position of the page
    let windowHeight = window.innerHeight; //? Height of visible section of 
    let scrollHeight = htmlElement.scrollHeight;//? Height of entire document page
    let footerHeight = lowerFooterElement.clientHeight; //? Height of the Lower section of the page footer

    let unscrolledHeight = scrollHeight - (windowHeight + scrollPosition); //? Calculates the unscrolled height of the page

    /**===================================================================================
     * ? Checks if the page has been scrolled beyond the footer height
     *   
     * * If yes, then it will be shifted up
     * ? footerHeight - unscrolledHeight is basically the visible portion of the footer
     * ? '18px' is the gap between the floating button and the footer top
     *===================================================================================**/
    if (unscrolledHeight < footerHeight) floatingChatButton.style.bottom = `${footerHeight - unscrolledHeight + 18}px`
    else floatingChatButton.style.bottom = "36px";
}