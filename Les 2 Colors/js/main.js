class ColorCard{
    id;
    color;
    addToList;
    toBeAddedLi;
    circle;
    text;

    constructor(newId, newColor, addToList){
        this.id = newId;
        this.color = newColor;
        this.addToList = addToList;

        this.toBeAddedLi = document.createElement("li");
        this.toBeAddedLi.classList.add("colors__color");
        this.toBeAddedLi.style.boxShadow = "0 0.8rem 0 0 " + this.color;

        this.circle = document.createElement("figure");
        this.circle.classList.add("colors__colorCircle");
        this.circle.style.background = this.color;

        this.text = document.createElement("p");
        this.text.classList.add("colors__colorText");
        this.text.innerText = "Copied";
        this.toBeAddedLi.onclick = this.onClicked;
        this.render();
    }
    onClicked = () => {
        this.circle.classList.add("colors__colorCircle--selected");
        document.title = this.color;
        window.navigator.clipboard.writeText(this.color);
    }
    render(){
        this.addToList.appendChild(this.toBeAddedLi);
        this.toBeAddedLi.appendChild(this.circle);
        this.toBeAddedLi.appendChild(this.text);
    }
}

class ColorList{
    id;
    toBeAddedUl;
    constructor(newId){
        this.id = newId;
        this.toBeAddedUl = document.createElement("ul");
        this.toBeAddedUl.id = this.id;
        this.toBeAddedUl.classList.add("colors");
        this.render();
    }
    render(){
        document.querySelector("body").appendChild(this.toBeAddedUl);
    }
}
//const colorlist = new ColorList("js--colors");

class HSLGenerator{
    randomHue;
    randomSaturation;
    randomLightness;
    hsl;
    constructor(){
        this.generateHSL();
    }
    generateHue = function(){
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    }
    generateSaturation = function(){
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    }
    generateLightness = function(){
        this.randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%";
    }
    generateHSL = function(){
        this.generateHue();
        this.generateSaturation();
        this.generateLightness();
        this.hsl = `hsl(${this.randomHue} ${this.randomSaturation} ${this.randomLightness})`;
    }
}

class App{
    id;
    colorList;
    HSLGenerator;
    constructor(newId){
        this.id = newId;
        this.list = new ColorList(this.id);
        this.hslGenerator = new HSLGenerator();
        this.generateColorCards();
    }
    generateColorCards = function(){
        for(let i = 1; i <= 100; i++){
            this.hslGenerator.generateHSL()
            new ColorCard(i, this.hslGenerator.hsl, document.getElementById(this.list.id));
        }
    }
}

const app = new App("js--app");