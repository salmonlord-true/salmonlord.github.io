const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')
const b3 = document.getElementById('b3')
const b4 = document.getElementById('b4')
const b5 = document.getElementById('b5')
const b6 = document.getElementById('b6')
const b7 = document.getElementById('b7')
const b8 = document.getElementById('b8')
const b9 = document.getElementById('b9')

const tile1barrel = document.getElementById('tile1barrel')
const tile2barrel = document.getElementById('tile2barrel')
const tile3barrel = document.getElementById('tile3barrel')
const tile4barrel = document.getElementById('tile4barrel')
const tile5barrel = document.getElementById('tile5barrel')
const tile6barrel = document.getElementById('tile6barrel')
const tile7barrel = document.getElementById('tile7barrel')
const tile8barrel = document.getElementById('tile8barrel')
const tile9barrel = document.getElementById('tile9barrel')

const b1p1Info = document.getElementById('b1p1-info')
const b2p1Info = document.getElementById('b2p1-info')
const b3p1Info = document.getElementById('b3p1-info')
const b1p2Info = document.getElementById('b1p2-info')
const b2p2Info = document.getElementById('b2p2-info')
const b3p2Info = document.getElementById('b3p2-info')

class Board {
    constructor(state = [0,0,0,0,0,0,0,0,0], barrels = [99, 99, 99, 99, 99, 99], moving = 'p1') {   //state: number represents what barrel level is on given tile, positives for p1, negatives for p2, 
        this.state = state;
        this.barrels = barrels;
        this.moving = moving;
        this.selected = undefined;
    }

    move(move = {player:'p1', tile:1, barrel:1}) {   //player, tile, type of barrel
        if (!this.isValidMove(move)) return;
        if (this.state[move.tile-1] == 0) {
            switch (move.player) {
                case 'p1': this.state[move.tile-1] = move.barrel; break;
                case 'p2': this.state[move.tile-1] = -move.barrel; break;
            }
        } else if (Math.abs(this.state[move.tile-1]) == move.barrel) {
            switch (move.player) {
                case 'p1': if(this.isEnoughBarrels(move.player, move.barrel)) {this.state[move.tile-1] = move.barrel + 1} else {return}; break;
                case 'p2': this.state[move.tile-1] = -(move.barrel + 1); break;
            }
        } else return;
        switch (move.barrel) {
            case 1: if (move.player == 'p1') {this.barrels[0]--} else {this.barrels[3]--}; break;
            case 2: if (move.player == 'p1') {this.barrels[1]--} else {this.barrels[4]--}; break;
            case 3: if (move.player == 'p1') {this.barrels[2]--} else {this.barrels[5]--}; break;
        }

        if (this.moving == 'p1') {this.moving = 'p2'} else {this.moving = 'p1'}
    }

    isValidMove(move = {}) {
        try {
            if (move.player != 'p1' && move.player != 'p2' && (move.tile < 1 || move.tile > 9) && (move.barrel < 1 || move.barrel > 3)) {
                console.log(`move ${move} is invalid`)
                return false
            }
            if (move.player != this.moving) {
                console.log(`move ${move} blocked: wrong player`)
                return false
            }
            return true;
        } catch (error) {
            if (error == TypeError) {
                console.log(`move ${move} is invalid`)
                return false
            } else {console.log(`i have no fucking clue`); return false}
        }
    }

    isEnoughBarrels(player, barrel) {
        switch (player) {
            case 'p1': if (this.barrels[barrel] >= 1) {return true} else {return false};
            case 'p2': if (this.barrels[barrel+3] >= 1) {return true} else {return false};
        }
    }
}

let board = new Board();

class Misc {
    static allowDrop(ev) {
        ev.preventDefault()
    }

    static dragStart(ev) {
        ev.dataTransfer.setData('id', ev.target.id);
        console.log(ev, ev.dataTransfer.getData('id'))
    }

    static drop(ev, targetTile) {
        const id = ev.dataTransfer.getData('id')
        board.move({player: (id[2]+id[3]), tile: targetTile, barrel: (Number(id[1]))})
    }

    static getBGcolor(barrelId) {
        if (barrelId > 0) return 'rgb(243, 94, 94)'
        if (barrelId < 0) return 'rgb(82, 80, 255)'
        if (barrelId == 0) return 'rgb(165, 165, 165)'
    }
}

function updateUI() {
    b1p1Info.textContent = board.barrels[0];
    b2p1Info.textContent = board.barrels[1];
    b3p1Info.textContent = board.barrels[2];
    b1p2Info.textContent = board.barrels[3];
    b2p2Info.textContent = board.barrels[4];
    b3p2Info.textContent = board.barrels[5];
    tile1barrel.src = `barrels/Barrel_${Math.abs(board.state[0])}.webp`
    tile2barrel.src = `barrels/Barrel_${Math.abs(board.state[1])}.webp`
    tile3barrel.src = `barrels/Barrel_${Math.abs(board.state[2])}.webp`
    tile4barrel.src = `barrels/Barrel_${Math.abs(board.state[3])}.webp`
    tile5barrel.src = `barrels/Barrel_${Math.abs(board.state[4])}.webp`
    tile6barrel.src = `barrels/Barrel_${Math.abs(board.state[5])}.webp`
    tile7barrel.src = `barrels/Barrel_${Math.abs(board.state[6])}.webp`
    tile8barrel.src = `barrels/Barrel_${Math.abs(board.state[7])}.webp`
    tile9barrel.src = `barrels/Barrel_${Math.abs(board.state[8])}.webp`
    tile1barrel.alt = `barrel ${board.state[0]}`
    tile2barrel.alt = `barrel ${board.state[1]}`
    tile3barrel.alt = `barrel ${board.state[2]}`
    tile4barrel.alt = `barrel ${board.state[3]}`
    tile5barrel.alt = `barrel ${board.state[4]}`
    tile6barrel.alt = `barrel ${board.state[5]}`
    tile7barrel.alt = `barrel ${board.state[6]}`
    tile8barrel.alt = `barrel ${board.state[7]}`
    tile9barrel.alt = `barrel ${board.state[8]}`
    b1.style = `background-color: ${Misc.getBGcolor(board.state[0])}`
    b2.style = `background-color: ${Misc.getBGcolor(board.state[1])}`
    b3.style = `background-color: ${Misc.getBGcolor(board.state[2])}`
    b4.style = `background-color: ${Misc.getBGcolor(board.state[3])}`
    b5.style = `background-color: ${Misc.getBGcolor(board.state[4])}`
    b6.style = `background-color: ${Misc.getBGcolor(board.state[5])}`
    b7.style = `background-color: ${Misc.getBGcolor(board.state[6])}`
    b8.style = `background-color: ${Misc.getBGcolor(board.state[7])}`
    b9.style = `background-color: ${Misc.getBGcolor(board.state[8])}`
}

setInterval(() => {
    updateUI();
}, 33)