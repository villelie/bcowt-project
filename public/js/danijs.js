function clickCounter() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML =localStorage.clickcount + " like(s).";
    } else {
        document.getElementById("result").innerHTML = "your browser is trash";
    }
}

