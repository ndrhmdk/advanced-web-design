class MyClass {
    #x = 0;

    // private method (can only be called within the class)
    #incX() {
        this.#x++;
        console.log(`x = ${this.#x}`);
    }

    // private setter (can only be called within the class)
    set #setX(x) {
        this.#x = x;
    }

    // private getter (can only be called within the class)
    get #getX() {
        return this.$x;
    }

    publicIncX() {
        this.#incX();
    }

    publicSetX(x) {
        this.#setX = x;
    }

    publicGetX(x) {
        return this.#getX;
    }
}

const m = new MyClass();
m.publicIncX();

m.publicSetX(100);
m.publicIncX();