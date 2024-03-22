class Data{
    url = "";
    data = null;
    constructor(newURL){
        this.url = newURL;

    }
    async getData(){
        if(this.data === null){
            await fetch(this.url)
                .then(function(response){
                    return response.json();
                }).then((data) => {
                    this.data = data;
                });
        }
        return this.data;
    }
}

// const yuh = new Data("data/transactions.json");
// yuh.GetData().then(data => console.log(data));

class Header{
    constructor(){
        this.makeHeader();
    }
    makeHeader(){
        this.header = document.createElement("header");
        this.header.classList.add("header");

        this.extraDiv = document.createElement("extraDiv");

        this.toBeAddedFigure = document.createElement("figure");
        this.toBeAddedFigure.classList.add("headerFigure");

        this.logo = document.createElement("i");
        this.logo.classList.add("fa-solid");
        this.logo.classList.add("fa-piggy-bank");
        this.logo.classList.add("headerFigure__logo");

        this.title = document.createElement("h2");
        this.title.classList.add("headerFigure__title");
        this.title.innerText = "Banky";

        this.avatar = document.createElement("div");
        this.avatar.classList.add("headerAvatar");

        this.icon = document.createElement("i");
        this.icon.classList.add("fa-solid");
        this.icon.classList.add("fa-user");
        this.icon.classList.add("headerAvatar__icon");
        this.render();
    }
    render(){
        const body = document.querySelector("body");
        body.appendChild(this.header);
        this.header.appendChild(this.extraDiv);
        this.header.appendChild(this.toBeAddedFigure);
        this.toBeAddedFigure.appendChild(this.logo);
        this.toBeAddedFigure.appendChild(this.title);
        this.header.appendChild(this.avatar);
        this.avatar.appendChild(this.icon);
    }
}

class Banky{
    constructor(){
        this.banky = document.createElement("main");
        this.banky.classList.add("banky");
        this.leftSection = new BankyLeft(this.banky);
        this.rightSection = new BankyRight(this.banky);
        this.render();
    }
    buttonsFromData(data){
        this.rightSection.buttonsFromData(data);
        this.leftSection.getData("bankaccount",data);
        Object.entries(data);
    }
    render(){
        const body = document.querySelector("body");
        body.appendChild(this.banky);
        this.leftSection.render();
        this.rightSection.render();
    }
}


class BankyLeft{
    banky;
    constructor(banky){
        this.banky = banky;
        this.bankyLeft = document.createElement("section");
        this.bankyLeft.classList.add("bankySection");
        this.bankyLeft.classList.add("bankySection--left");

        this.header = document.createElement("header");
        this.header.classList.add("bankySection__header");

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("bankySection__header--wrapper");

        this.logo = document.createElement("figure");
        this.logo.classList.add("bankySection__header--logo");

        this.icon = document.createElement("i");
        this.icon.classList.add("fa-solid");
        this.icon.classList.add("fa-house");

        this.saldo = document.createElement("h1");
        this.saldo.classList.add("bankySection__header--money");

        this.button = document.createElement("button");
        this.button.classList.add("bankySection__eyeButton");

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList.add("bankySection__header--eye");
        this.eye = document.createElement("i");
        this.eye.classList.add("fa-solid");
        this.eye.classList.add("fa-eye");
        
        this.transactions = document.createElement("ul");
        this.transactions.classList.add("bankySection__transactions");

        this.transfer = document.createElement("button");
        this.transfer.classList.add("bankySection__transferButton");
        this.transfer.innerText = "Transfer";
    }
    getData(accountName, data){
        const dataName = data[accountName];
        let total = 0;
        for(let i = 0; i < dataName.length; i++){
            total += dataName[i].amount;
        }
        console.log(total);
        this.saldo.innerText = "Saldo " + "€" + total;
        for(let i = 0; i < dataName.length; i++){
            this.transaction = document.createElement("li");
            this.transaction.classList.add("bankySection__transactions--transaction");
            this.transactions.appendChild(this.transaction);

            this.name = document.createElement("h3");
            this.name.classList.add("bankySection__transactions--transaction-name");
            this.name.innerText = dataName[i].fromTo;
            this.transaction.appendChild(this.name);

            this.amount = document.createElement("h3");
            this.amount.classList.add("bankySection__transactions--transaction-amount");
            this.amount.innerText = dataName[i].amount;
            this.transaction.appendChild(this.amount);
        }
    }
    render(){
        this.banky.appendChild(this.bankyLeft);
        this.bankyLeft.appendChild(this.header);
        this.header.appendChild(this.wrapper);
        this.wrapper.appendChild(this.logo);
        this.logo.appendChild(this.icon);
        this.wrapper.appendChild(this.saldo);
        this.wrapper.appendChild(this.button);
        this.wrapper.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eye);
        this.bankyLeft.appendChild(this.transactions);
        this.bankyLeft.appendChild(this.transfer);
    }
}

class BankyRight{
    banky;
    constructor(banky){
        this.banky = banky;
        this.bankyRight = document.createElement("section");
        this.bankyRight.classList.add("bankySection");
        this.bankyRight.classList.add("bankySection--right");

        this.accounts = document.createElement("ul");
        this.accounts.classList.add("bankySection__accounts");

    }
    buttonsFromData(data){
        Object.entries(data).forEach((entry) => {
            this.account = document.createElement("li");
            this.account.classList.add("bankySection__accounts--account");
    
            this.switchAccount = document.createElement("button");
            this.switchAccount.classList.add("bankySection__switchAccount");
    
            this.headerLogo = document.createElement("figure");
            this.headerLogo.classList.add("bankySection__header--logo");
    
            this.house = document.createElement("i");
            this.house.classList.add("fa-solid");
            this.house.classList.add("fa-house");
    
            this.accountName = document.createElement("h4");
            this.accountName.classList.add("bankySection__accounts--account-name");
            this.accountName.innerText = entry[0];
            this.bankyRight.appendChild(this.accounts);
            this.accounts.appendChild(this.account);
            this.account.appendChild(this.switchAccount);
            this.switchAccount.appendChild(this.headerLogo);
            this.headerLogo.appendChild(this.house);
            this.account.appendChild(this.accountName);

            const e = document.getElementsByClassName("bankySection__accounts--account");
            for(let i = 0; i < e.length; i++){
                this.account.onclick = () => {
                    
            }};
        });
    }
    render(){
        this.banky.appendChild(this.bankyRight);
    }
}

class App{
    header;
    main;
    loadData;
    constructor(){
        this.header = new Header();
        this.main = new Banky();
        this.loadData = new Data("data/transactions.json");
        this.loadData.getData()
        .then(data => 
            this.main.buttonsFromData(data)
        );

        this.header.render();
        this.main.render();
    }
}

const app = new App();