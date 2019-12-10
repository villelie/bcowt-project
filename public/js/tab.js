'use strict';

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    //document.getElementById("myDropdown").classList.toggle("show");
    let drop_down = document.querySelector('#myDropdown');
    let drop_down2 = document.querySelector('#myDropdown2');

    if (drop_down.style.display === "none"){
        drop_down.style.display = "block";
        drop_down2.style.display= "none";
    }else{
        drop_down.style.display = "none";
    }
}

function myFunction2() {
    //document.getElementById("myDropdown2").classList.toggle("show");
    let drop_down = document.querySelector('#myDropdown2');
    let drop_down2 = document.querySelector('#myDropdown');

    if (drop_down.style.display === "none"){
        drop_down.style.display = "block";
        drop_down2.style.display= "none";
    }else{
        drop_down.style.display = "none";
    }

}

function close_tab() {
    document.querySelector('#myDropdown').style.display = "none";
}

function close_tab2() {
    document.querySelector('#myDropdown2').style.display = "none";
}

/*// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};*/
