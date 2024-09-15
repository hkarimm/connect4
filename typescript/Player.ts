export default class Player {
    public name: string;
    public color: 'X' | 'O';

    constructor(name: string, color: 'X' | 'O') {
        this.name = name;
        this.color = color;
    }
}
