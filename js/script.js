playing = true;
const roboImage = document.getElementsByClassName("header-robot-image")[0];
const playIcon = document.getElementsByClassName("play-icon")[0];
const pauseIcon = document.getElementsByClassName("pause-icon")[0];
const floatingChatButton = document.getElementsByClassName("floating-chat-button")[0];
const htmlElement = document.getElementsByTagName("html")[0];
const lowerFooterElement = document.getElementsByClassName("footer-bottom")[0];

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

window.onscrollend = () => {
    let scrollPosition = htmlElement.scrollTop;
    let windowHeight = window.innerHeight;
    let scrollHeight = htmlElement.scrollHeight;
    let footerHeight = lowerFooterElement.clientHeight;

    let unscrolledHeight = scrollHeight - (windowHeight + scrollPosition);
    if (unscrolledHeight < footerHeight) floatingChatButton.style.bottom = `${footerHeight - unscrolledHeight + 18}px`
    else floatingChatButton.style.bottom = "36px";
}