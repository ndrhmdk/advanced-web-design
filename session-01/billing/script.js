var arr=[];

function save() {
    var a= {
        name: document.getElementById('name').value,
        id: document.getElementById('id').value,
        prdname: document.getElementById('prdname').value,
        qty: document.getElementById('qty').value,
        price: document.getElementById('price').value};

    arr.push(a);
    alert("Saved successfully!");
}

function show() {
    var html='';

    for (var i=0; i < arr.length; i++) {
        var qty=parseFloat(arr[i].qty) || 0;
        var price=parseFloat(arr[i].price) || 0;

        // Calculations: Amount = Qty * Price, Discount = 15%, Total = Amount - Discount
        var amount=qty * price;
        var discount=amount * 0.15;
        var total=amount - discount;

        html+="<tr>";
        html+="<td>"+(i + 1)+"</td>";
        html+="<td>"+arr[i].name+"</td>";
        html+="<td>"+arr[i].id+"</td>";
        html+="<td>"+arr[i].prdname+"</td>";
        html+="<td>"+arr[i].qty+"</td>";
        html+="<td>"+arr[i].price+"</td>";
        html+="<td>"+discount+"</td>";
        html+="<td>"+amount+"</td>";
        html+="<td>"+total+"</td>";
        html+="</tr>";
    }

    document.getElementById('tbl').innerHTML=html;
}

function reset() {
    document.getElementById('name').value='';
    document.getElementById('id').value='';
    document.getElementById('prdname').value='';
    document.getElementById('qty').value='';
    document.getElementById('price').value='';
}