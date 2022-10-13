
let Main = new Vue({
    el: '#field',
    data: {
        msgEnd: "Игра окончена",
        isEnd: false,
        field: [],
        queue: this.X, //True is it X
        isWinner: false,
        congrulMsg: "Победа: ",
        win: "",
        X: '',
        O: ''
    },
    mounted() {
        if (localStorage.X) {
            this.X = localStorage.X;
        }
        if (localStorage.O) {
            this.O = localStorage.O;
        }
    },
    methods: {
        persist() {
            localStorage.X = this.X;
            localStorage.O = this.O;
        },
        revertValue: function (id) {
            if (this.isWinner)
                return;
            if (this.field[id] == 0) {
                if (this.queue)
                    Vue.set(this.field, id, 'X');
                else
                    Vue.set(this.field, id, 'O');
                this.queue = !this.queue;
            }
            this.IsOver();
            this.win = this.winner();
        },
        IsOver: function () {
            let sum = 0;
            for (let i = 0; i < 9; ++i) {
                if (this.field[i] == 0)
                    ++sum;
            }
            this.isEnd = sum <= 0;
        },
        newGame: function () {
            this.isEnd = false;
            this.isWinner = false;
            this.win = "";
            for (let i = 0; i < 9; ++i) {
                Vue.set(this.field, i, 0);
            }
        },
        winner: function () {
            //ГОРИЗОНТ
            for (let i = 0; i < 9; i += 3)
                if (this.field[i] == this.field[i + 1] && this.field[i] == this.field[i + 2] && this.field[i] != 0) {
                    this.isWinner = true;
                    if (this.field[i] == "O"){
                        return this.O;
                    }
                    if (this.field[i] == "X"){
                        return this.X;
                    }
                }
            //вертикаль
            for (let i = 0; i < 9; ++i)
                if (this.field[i] == this.field[i + 3] && this.field[i] == this.field[i + 6] && this.field[i] != 0) {
                    this.isWinner = true;
                    if (this.field[i] == "O"){
                        return this.O;
                    }
                    if (this.field[i] == "X"){
                        return this.X;
                    }
                }
            //диагональ
            if (this.field[0] == this.field[4] && this.field[0] == this.field[8] && this.field[0] != 0) {
                this.isWinner = true;
                if (this.field[i] == "O"){
                    return this.O;
                }
                if (this.field[i] == "X"){
                    return this.X;
                }
            }
            if (this.field[2] == this.field[4] && this.field[2] == this.field[6] && this.field[2] != 0) {
                this.isWinner = true;
                if (this.field[i] == "O"){
                    return this.O;
                }
                if (this.field[i] == "X"){
                    return this.X;
                }
            }
        }
    }
});