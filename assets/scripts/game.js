//criando um objeto game

let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    //criando um método
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    //função para criar as cartas
    createCardsFromTechs: function () {

        this.cards = [];
        for (let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech));
        }
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    //função para criar os pares das cartas com as informações de cada carta(id, nome e a posição da carta(flipped))
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    //função para criar o ID aleatório de cada carta. o Id será composto pelo nome(icon)+ um número qualquer
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000); //parseInt transforma numeros quebrados em numeros inteiros. //math.random retorna um numero aleatorio entre 0 e 1.
    },

    //função q vai embaralhar as cartas para que fiquem misturadas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            //vai interter as posições
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}