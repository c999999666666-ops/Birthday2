/* =========================================================
   ELEMENTS
========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const birthdayPage =
    document.getElementById("birthdayPage");

const loginForm =
    document.getElementById("loginForm");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const surpriseButton =
    document.getElementById("surpriseButton");

const surpriseOverlay =
    document.getElementById("surpriseOverlay");

const boxOverlay =
    document.getElementById("boxOverlay");

const closeSurprise =
    document.getElementById("closeSurprise");

const closeBox =
    document.getElementById("closeBox");

const giftBox =
    document.getElementById("giftBox");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const fireworks =
    document.getElementById("fireworks");


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const enteredUsername =
        username.value.trim();

    const enteredPassword =
        password.value;

    /*
       Correct credentials:

       Username = Moina
       Password = 24092006
    */

    if (
        enteredUsername === "Moina" &&
        enteredPassword === "24092006"
    ) {

        loginError.textContent = "";

        loginScreen.classList.add("hidden");

        birthdayPage.classList.remove("hidden");

        /*
           Start fireworks when entering
           the birthday page.
        */

        launchFireworks(18);

    } else {

        loginError.textContent =
            "Oops! Please check your username and password ❤️";

        password.value = "";

        username.focus();
    }

});


/* =========================================================
   SURPRISE BUTTON
========================================================= */

surpriseButton.addEventListener("click", function() {

    surpriseOverlay.classList.remove("hidden");

});


/* =========================================================
   CLOSE SURPRISE
========================================================= */

closeSurprise.addEventListener("click", function() {

    surpriseOverlay.classList.add("hidden");

    /*
       Fireworks again when coming
       back to the birthday page.
    */

    launchFireworks(15);

});


/* =========================================================
   OPEN GIFT BOX
========================================================= */

giftBox.addEventListener("click", function() {

    boxOverlay.classList.remove("hidden");

    /*
       IMPORTANT:

       The music is started INSIDE the click event.

       Modern browsers normally allow audio
       when play() is triggered by a user click.
    */

    birthdayMusic.volume = 0.75;

    birthdayMusic.currentTime = 0;

    const musicPromise =
        birthdayMusic.play();

    if (musicPromise !== undefined) {

        musicPromise
            .then(function() {

                console.log(
                    "Birthday music is playing."
                );

            })
            .catch(function(error) {

                console.log(
                    "Music could not autoplay:",
                    error
                );

            });

    }

});


/* =========================================================
   CLOSE GIFT BOX
========================================================= */

closeBox.addEventListener("click", function() {

    boxOverlay.classList.add("hidden");

    /*
       Stop music when leaving the box.
    */

    birthdayMusic.pause();

    birthdayMusic.currentTime = 0;

    /*
       Fireworks again after returning.
    */

    launchFireworks(15);

});


/* =========================================================
   FIREWORKS
========================================================= */

function launchFireworks(number) {

    /*
       Create several fireworks
       around the sky.
    */

    for (let i = 0; i < number; i++) {

        setTimeout(function() {

            createFirework();

        }, i * 180);

    }

}


/* Create one firework */

function createFirework() {

    const firework =
        document.createElement("div");

    firework.classList.add("firework");


    /*
       Keep fireworks mostly in
       the upper part of the screen.
    */

    const x =
        Math.random() * 90 + 5;

    const y =
        Math.random() * 45 + 5;


    firework.style.left =
        x + "vw";

    firework.style.top =
        y + "vh";


    /*
       Different sizes
    */

    const size =
        Math.random() * 4 + 3;

    firework.style.width =
        size + "px";

    firework.style.height =
        size + "px";


    fireworks.appendChild(firework);


    /*
       Remove after animation
    */

    setTimeout(function() {

        firework.remove();

    }, 1400);

}


/* =========================================================
   EXTRA FIREWORK LOOP
========================================================= */

/*
   A small number of fireworks continue
   while the user is on the main birthday
   page.

   They stop naturally when the user opens
   either overlay because the overlays cover
   the page.
*/

let occasionalFireworks =
    setInterval(function() {

        if (
            !birthdayPage.classList.contains("hidden") &&
            surpriseOverlay.classList.contains("hidden") &&
            boxOverlay.classList.contains("hidden")
        ) {

            createFirework();

        }

    }, 4500);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        /*
           Close surprise
        */

        if (
            !surpriseOverlay.classList.contains("hidden")
        ) {

            surpriseOverlay.classList.add("hidden");

            launchFireworks(12);

        }


        /*
           Close gift box
        */

        if (
            !boxOverlay.classList.contains("hidden")
        ) {

            boxOverlay.classList.add("hidden");

            birthdayMusic.pause();

            birthdayMusic.currentTime = 0;

            launchFireworks(12);

        }

    }

});


/* =========================================================
   PREVENT MUSIC FROM CONTINUING IF PAGE IS HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    function() {

        if (document.hidden) {

            birthdayMusic.pause();

        }

    }
);