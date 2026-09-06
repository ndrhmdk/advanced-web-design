class MyClass {
    /**
     * JavaScript doesn't use keywords, they use . # and static instead. For ex.
     * .a is public
     * #b is private
     * #c is private and static
     */
    a = 1;
    #b = 2;
    static #c = 3;

    incB() {
        this.#b++;
        console.log(this.#b);
    }
}

const m = new MyClass();
m.incB();