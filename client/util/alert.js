export class DropDownHolder {
    static dropDown;

    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }

    static getDropDown() {
        return this.dropDown;
    }

    static alert(type, title, message) {
        this.dropDown.alertWithType(type, title, message)
    }
}