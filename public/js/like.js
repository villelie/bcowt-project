'use strict';

document.querySelectorAll('.like').forEach(function(e) {
  e.addEventListener('click', function() {
    this.style.opacity = "1.0";
  })
});

