import { scores } from './global'

export const getColorScore = (score) => {
    switch (score) {
        case ('a'):
            return scores.green;
        case ('b'):
            return scores.lightgreen;
        case ('c'):
            return scores.yellow;
        case ('d'):
            return scores.orange;
        case ('e'):
            return scores.red;
        default:
            return 'grey'
    }
}

export const getColorLevel = (level) => {
    switch (level) {
        case ('low'):
            return scores.green;
        case ('moderate'):
            return scores.yellow;
        case ('high'):
            return scores.red;
        default:
            return 'grey'
    }
}