var myInfoY    = document.getElementById('infoY'),
    
    myInfoX    = document.getElementById('infoX'),
    
    myButton   = document.getElementById('Top'),
    
    myButtonMove = document.getElementById('Move');
   // function when scroll window  to start function specific
window.onscroll = function () {
    // use strict 
'use strict';
    
    // count scroll Y and append this element 
    myInfoY.innerHTML =  ' ' +  window.scrollY + ' ';
    
    // count scroll X and append this element 
    myInfoX.innerHTML =  ' ' +   window.scrollX  + ' ';
}

myButton.onclick = function () {
    'use strict';
    window.scrollTo(0,0);
}
myButtonMove.onclick = function () {
    'use strict';
    window.scrollBy(20,20);
}