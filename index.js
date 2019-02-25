new Vue({
  el: "#app",
  data: {
    monsHealthbar: 100,
    plyrHealthbar: 100,
    isGameStarted: false,
    turns: []
  },
  methods: {
    startGame: function () {
        this.monsHealthbar = 100;
        this.plyrHealthbar = 100;
        this.isGameStarted = true;
        this.turns=[]
    },
    attack: function() {
        var damged = this.dmgedCalculate(3, 10);
        this.monsHealthbar -=damged;
        this.turns.unshift({
            isPlayer: true,
            text: 'Player hits for monStar ' + damged
        })
        if(this.chckWin()) {
            this.turns=[]
            return
        }
        this.monsStarAtk();
    },
    speclAttack: function () {
        var damged = this.dmgedCalculate(8, 15);
        this.turns.unshift({
            isPlayer: true,
            text: 'Player hits for monStar ' + damged
        })
        this.monsHealthbar -=damged;
        if(this.chckWin()) {
            this.turns=[]
            return
        }
        this.monsStarAtk()
    },
    heal: function () {
        if(this.plyrHealthbar <= 90 ) {
            this.plyrHealthbar += 10;
        } else {
            this.plyrHealthbar = 100
        }
        
        this.monsHealthbar -=this.dmgedCalculate(3, 10);
     
    },
    giveUp: function () {
        this.isGameStarted = false
    },
    monsStarAtk: function () {
        var damged = this.dmgedCalculate(5, 13);
        this.plyrHealthbar -=damged;
        this.turns.unshift({
            isPlayer: false,
            text: 'Monstar hits for you ' + damged
        })
        this.chckWin()
    },
    dmgedCalculate: function (min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    chckWin: function () {
        if(this.monsHealthbar <= 0) {
            this.monsHealthbar = 0
            if(confirm('You won! New Game ? ')) {
                this.startGame();
            } else {
                this.isGameStarted = false
            }
            return true
        } else if(this.plyrHealthbar <= 0) {
            this.plyrHealthbar = 0
            if(confirm('You lost! New Game ? ')) {
                this.startGame();
            } else {
                this.isGameStarted = false
               
            }
            return true
        }
        return false 
    }
  }
});
