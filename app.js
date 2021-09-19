



const firebaseConfig = {
    apiKey: "AIzaSyDWwEbMOMYwDcXb7lLor_HQf5RyrDlv2j0",
    authDomain: "bubble-game-46828.firebaseapp.com",
    projectId: "bubble-game-46828",
    storageBucket: "bubble-game-46828.appspot.com",
    messagingSenderId: "160296978054",
    appId: "1:160296978054:web:7c191f2b73632e6e4cb307",
    measurementId: "G-K65J3XJB75"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = firebase.firestore();


signUp = () => {
    let email = document.getElementById("inputEmail").value
    let password = document.getElementById("inputPassword").value

    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });

}


login = () => {

    let email = document.getElementById("inputEmail").value
    let password = document.getElementById("inputPassword").value

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            window.location.href = "index2.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

}



logOut = () => {

    auth.signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html"

    }).catch((error) => {
        // An error happened.
    });

}



auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        firestore.collection('users').doc(user.uid).set({
            email: user.email,
            lastLoggedInAt: new Date()
        })
            .then(() => {
                console.log("ok");
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
        setData(user)

        document.getElementById("user").innerHTML = user.email;

    } else {
        // User is signed out
        // ...

    }
});



const setData = (user) => {
    firestore.collection('users').doc(user.uid).get().then((querySnapshot) => {
        const data = querySnapshot.data();
        const lastLoggedInAt = data.lastLoggedInAt;
        const lastLoggedInSpan = document.getElementById("lastLoggedIn");
        lastLoggedInSpan.innerHTML = lastLoggedInAt.toDate();
    });
}





let min = 0;
let sec = 0;
let msec = 0;
let interval;

let min1 = document.getElementById("min")
let sec1 = document.getElementById("sec")
let msec1 = document.getElementById("msec")

function timer() {
    msec++
    msec1.innerHTML = ":" + msec;
    if (msec >= 100) {
        sec++
        sec1.innerHTML = ":" + sec;
        msec = 0;
    } else if (sec >= 60) {
        min++
        min1.innerHTML = min;
        sec = 0;
    }
}


let score_num1 = 0;
let score_num = document.getElementById("score_num")

let lives_num1 = 3;
let lives_num = document.getElementById("lives_num")

lives_num.innerHTML = lives_num1

let game_div_child = document.getElementById("game_div_child")
let game_div_child_level2 = document.getElementById("game_div_child_level2")





start = () => {
    interval = setInterval(timer, 10)
    start_btn.disabled = true
    pause_btn.disabled = false
}
    
pause = () => {
    start_btn.disabled = false
    pause_btn.disabled = true
    clearInterval(interval)
}


    


over = (e) => {

    // console.log(e.classList);
    if (e.classList[1] === "yellow-baloon") {
        score_num1++
        score_num.innerHTML = score_num1
        let pop = document.createElement("span")
        let pop_text = document.createTextNode("pop!")
        pop.appendChild(pop_text)
        pop.setAttribute("class", "pop-yellow")
        e.classList.remove("yellow-baloon");
        e.appendChild(pop)
        replacedBaloon = () => {
            e.classList.add("red-baloon")
            pop.remove()
        }
        setTimeout(replacedBaloon, 1000)
    } else if (e.classList[1] === "red-baloon" || e.classList[1] === "blue-baloon") {
        lives_num.innerHTML = lives_num1--
    }
    // console.log(e.classList[0]);



    if (score_num1 >= 10) {

        let winDin = document.createElement("div")
        winDin.setAttribute("class", "win-div")
        let winDinText = document.createTextNode("You win!")
        winDin.appendChild(winDinText)
        game_div_child.appendChild(winDin)
        nextLevel = () => {
            window.location.href = "index3.html"
        }
        setTimeout(nextLevel, 1000)
    }
    else if (lives_num1 === 0) {
        let loseDiv = document.createElement("div")
        loseDiv.setAttribute("class", "win-div")
        let loseDivText = document.createTextNode("You Lose!")
        loseDiv.appendChild(loseDivText)
        game_div_child.appendChild(loseDiv)
        againTry = () => {
            window.location.href = "index2.html"
        }
        setTimeout(againTry, 2000)
    }
    // break

}

round2 = (e) =>{
    
    // console.log(e.classList);
    if (e.classList[1] === "yellow-baloon") {
        score_num1++
        score_num.innerHTML = score_num1
        let pop = document.createElement("span")
        let pop_text = document.createTextNode("pop!")
        pop.appendChild(pop_text)
        pop.setAttribute("class", "pop-yellow")
        e.classList.remove("yellow-baloon");
        e.appendChild(pop)
        replacedBaloon = () => {
            e.classList.add("red-baloon")
            pop.remove()
        }
        setTimeout(replacedBaloon, 1000)
    } else if (e.classList[1] === "red-baloon" || e.classList[1] === "blue-baloon") {
        lives_num.innerHTML = lives_num1--
    }
    // console.log(e.classList[0]);



    if (score_num1 >= 10) {

        let winDin2 = document.createElement("div")
        winDin2.setAttribute("class", "win-div")
        let winDinText2 = document.createTextNode("You win!")
        winDin2.appendChild(winDinText2)
        game_div_child_level2.appendChild(winDin2)
        nextLevel = () => {
            window.location.href = "index3.html"
        }
        setTimeout(nextLevel, 1000)
    }
    else if (lives_num1 === 0) {
        let loseDiv2 = document.createElement("div")
        loseDiv2.setAttribute("class", "win-div")
        let loseDivText2 = document.createTextNode("You Lose!")
        loseDiv2.appendChild(loseDivText2)
        game_div_child_level2.appendChild(loseDiv2)
        againTry = () => {
            window.location.href = "index2.html"
        }
        setTimeout(againTry, 2000)
    }
    // break

}    


