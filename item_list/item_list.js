"use strict"
window.onload = (function() {
    var parentDiv;
    var ul;
    var li;
    var liStructure;
    var liName;
    var liDescription;
    var liButtons;
    var liBtnAdd;
    var liBtnRemove;
    var unit = "px";
    var liArray = [];
    var rmBtnClass = "";
    var addBtnClass = "";
    var id = 1;

    parentDiv = document.getElementById("parent-div");
    ul = document.createElement("ul");

    ul.style.position = "absolute";
    ul.style.left = "50px";
    ul.style.top = "100px";
    ul.style.width = "500px";
    ul.style.height = "auto";

    parentDiv.appendChild(ul);

    function getRandomColor() {
        return "#" + Math.round(Math.random() * 0xffffff).toString(16);
        /*var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
        */
    }

    function generateNameAndDescription(text, id) {
        var text = text + id;

        return text;
    }

    function generateLi(id) {
        var liConfig = {};
        li = document.createElement("li");
        liStructure = document.createElement("div");
        liName = document.createElement("div");
        liDescription = document.createElement("div");
        liButtons = document.createElement("div");
        liBtnAdd = document.createElement("button");
        liBtnRemove = document.createElement("button");

        li.style.listStyleType = "none";
        liStructure.style.position = "relative";
        liStructure.style.marginTop = "5px";
        li.id = id;

        liName.style.height = "25px";
        liName.style.backgroundColor = getRandomColor();
        liName.innerHTML = generateNameAndDescription("item", id);

        liDescription.style.height = "25px";
        liDescription.style.backgroundColor = getRandomColor();
        liDescription.innerHTML = generateNameAndDescription("description", id);

        liButtons.style.position = "absolute";
        liButtons.style.height = "50px";
        liButtons.style.width = "50px";
        liButtons.style.backgroundColor = getRandomColor();
        liButtons.style.left = "500px";
        liButtons.style.top = "0px";

        liBtnAdd.style.top = "0px";
        liBtnAdd.style.height = "20px";
        liBtnAdd.style.width = "50px";
        liBtnAdd.innerHTML = "+";
        liBtnAdd.className = "add" + id;

        liBtnRemove.style.top = "0px";
        liBtnRemove.style.height = "20px";
        liBtnRemove.style.width = "50px";
        liBtnRemove.innerHTML = "-";
        liBtnRemove.className = "remove" + id;

        ul.appendChild(li);
        li.appendChild(liStructure);
        liStructure.appendChild(liName);
        liStructure.appendChild(liDescription);
        liStructure.appendChild(liButtons);
        liButtons.appendChild(liBtnAdd);
        liButtons.appendChild(liBtnRemove);

        liConfig.el = li;
        liConfig.removeBtn = liBtnRemove;
        liConfig.addBtn = liBtnAdd;
        liArray[liArray.length] = liConfig;
        addBtnEvent(liConfig);

        return li;
    }

    generateLi(id);

    function removeElement(event) {
        var element;
        for(var i = 0; i < liArray.length; i++) {
            if(event.currentTarget.className === liArray[i].removeBtn.className) {
                element = liArray[i];
                element.removeBtn.removeEventListener("click", removeElement);
                element.addBtn.removeEventListener("click", addElement);
                ul.removeChild(element.el);
                liArray.splice(i,1);
            }
        }
        console.log(liArray);
    }

    function addElement(event) {
        var element;
        for(var i = 0; i < liArray.length; i++) {
            if(event.currentTarget.className === liArray[i].addBtn.className) {
                element = liArray[i].el;
                id++;
                insertAfter(generateLi(id), element);
            }

            console.log(liArray);
        }
    }

    function insertAfter(newEl, oldEl) {
        oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
    }

    function addBtnEvent(el) {
        //el.addEventListener("click", getIdOfClickedElement);
        el.addBtn.addEventListener("click", addElement);
        el.removeBtn.addEventListener("click", removeElement);
    }
}());