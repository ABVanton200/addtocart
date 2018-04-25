window.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector(".list").addEventListener("addtocart", ev => {
        let cartSumEl = ev.target.parentNode.querySelector(".sum"); 
        
        if( ev.detail.price > parseInt(cartSumEl.textContent) ) {            
            ev.preventDefault();
        } else {            
            cartSumEl.textContent -= ev.detail.price;
        }
    }, false);
}

function dragStart(ev) {
    ev.dataTransfer.effectAllowed='copy';
    ev.dataTransfer.dropEffect = "copy";
    ev.dataTransfer.setData("Id", ev.target.getAttribute('id'));
    ev.dataTransfer.setData("Price", ev.target.getAttribute('data-price'));
    ev.dataTransfer.setDragImage(ev.target,110,75);
    return true;
 }

 function dragEnter(ev) {
    ev.preventDefault();
    return true;
 }

 function dragOver(ev) {
    ev.dataTransfer.dropEffect = "copy";
      ev.preventDefault();
 }

 function dragDrop(ev) {
    let customEvent = new CustomEvent("addtocart", {
        bubbles: true,
        cancelable: true,
        detail: {
          price: ev.dataTransfer.getData("Price")
        }
    });

    let allow = document.querySelector(".list").dispatchEvent(customEvent);
    
    if( allow ) {
        let data = ev.dataTransfer.getData("Id");
        let nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = data + "_" + Date.now();    
        ev.target.appendChild(nodeCopy);
        ev.stopPropagation();
        return false;
    } else {
        document.querySelector(".wrapper").classList.add("disallow");
        setTimeout(() => document.querySelector(".wrapper").classList.remove("disallow"), 1000);   
    }
 }