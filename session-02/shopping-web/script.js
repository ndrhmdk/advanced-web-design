const menProducts = [
    Shirt01 = {
        id: "m01",
        name: "White Jersey",
        img: "img/male/shirt01.jpg",
        code: "M01WJS",
        price: "3.500.000 VND",
        sale: "2.899.000 VND",
    },

    Shirt02 = {
        id: "m02",
        name: "Grey T-Shirt",
        img: "img/male/shirt02.jpg",
        code: "M02WTS",
        price: "2.000.000 VND",
        sale: "1.799.000 VND"
    },

    Shirt03 = {
        id: "m03",
        name: "Black MLB T-Shirt",
        img: "img/male/shirt03.jpg",
        code: "M03MLB",
        price: "2.000.000 VND",
        sale: "1.799.000 VND"
    },

    Shirt04 = {
        id: "m04",
        name: "Black NYX T-Shirt",
        img: "img/male/shirt02.jpg",
        code: "M04NYX",
        price: "3.000.000 VND",
        sale: "2.799.000 VND"
    },
];

const womenProducts = [
    Shirt01 = {
        id: "fm01",
        name: "White Dodger",
        img: "img/female/shirt01.jpg",
        code: "F01DDG",
        price: "3.500.000 VND",
        sale: "2.899.000 VND",
    },

    Shirt02 = {
        id: "fm02",
        name: "White Dodger with Numner",
        img: "img/female/shirt02.jpg",
        code: "F01DRN",
        price: "2.000.000 VND",
        sale: "1.799.000 VND"
    },

    Shirt03 = {
        id: "fm03",
        name: "Blue Yankees",
        img: "img/female/shirt03.jpg",
        code: "F03BYK",
        price: "2.000.000 VND",
        sale: "1.799.000 VND"
    },

    Shirt04 = {
        id: "fm04",
        name: "White Yankees T-Shirt",
        img: "img/female/shirt02.jpg",
        code: "F04WYK",
        price: "3.000.000 VND",
        sale: "2.799.000 VND"
    },
]

function listProduct() {
    for (let i = 0; i <= menProducts.length - 1; i++) {
        var demo = '<div class="col-3">';
        demo += '<div class="card" style="width: 18rem; ">';
        demo += '<img src="' + menProducts[i].img + '" class="card-img-top" style="height:400px;">';
        demo += '<div class="card-body">';
        demo += '<h5 class="card-title">' + menProducts[i].name + '</h5>';
        demo += '<p class="card-text">';
        demo += '<del>' + menProducts[i].price + '</del> ';
        demo += '<strong>' + menProducts[i].sale + '</strong>';
        demo += '</p>';
        demo += '<a href="#" class="btn btn-primary" onclick="order()">Order</a>';
        demo += '</div>';
        demo += '</div>';
        demo += '</div>';
        console.log(demo);
        document.getElementById("men").innerHTML += demo;
    }

    for (let i = 0; i <= womenProducts.length - 1; i++) {
        var demo = '<div class="col-3">';
        demo += '<div class="card" style="width: 18rem; ">';
        demo += '<img src="' + womenProducts[i].img + '" class="card-img-top" style="height:400px;">';
        demo += '<div class="card-body">';
        demo += '<h5 class="card-title">' + womenProducts[i].name + '</h5>';
        demo += '<p class="card-text">';
        demo += '<del>' + womenProducts[i].price + '</del> ';
        demo += '<strong>' + womenProducts[i].sale + '</strong>';
        demo += '</p>';
        demo += '<a href="#" class="btn btn-primary" onclick="order()">Order</a>';
        demo += '</div>';
        demo += '</div>';
        demo += '</div>';
        console.log(demo);
        document.getElementById("women").innerHTML += demo;
    }
}

function order() {
    alert("Thank you for your order!");
}
