document.addEventListener("DOMContentLoaded", function() {
    var qty1 = document.getElementById("qty1");
    var price1 = document.getElementById("price1");

    var qty2 = document.getElementById("qty2");
    var price2 = document.getElementById("price2");

    var qty3 = document.getElementById("qty3");
    var price3 = document.getElementById("price3");

    var qty4 = document.getElementById("qty4");
    var price4 = document.getElementById("price4");

    var qty5 = document.getElementById("qty5");
    var price5 = document.getElementById("price5");

    var qty6 = document.getElementById("qty6");
    var price6 = document.getElementById("price6");

    var carts = document.getElementById("carts");
    var total = document.getElementById("total");
    var cash = document.getElementById("cash");
    var change = document.getElementById("change");

    var products = [
        { name: "NIKE SHOES GREEN", price: 0 },
        { name: "NIKE SHOES BLACK", price: 0 },
        { name: "CHAMPION JACKET", price: 0 },
        { name: "TSHIRT GREEN", price: 0 },
        { name: "TSHIRT BLUE", price: 0 },
        { name: "NIKE JACKET", price:  0 }
    ];

    function updateOrders() {
        carts.textContent = ""; 

        products.forEach(function(product, index) {
            var qtyInput = document.getElementById(`qty${index + 1}`);
            var priceLabel = document.getElementById(`price${index + 1}`);

            if (parseFloat(qtyInput.value) > 0) {
                var order = `${qtyInput.value} pc/s x ${priceLabel.textContent} ----- Php ${(parseFloat(qtyInput.value) * parseFloat(priceLabel.textContent)).toFixed(2)}\n`;
                carts.textContent += order;
            }
        });

        calculateTotal(); 
    }

    function calculateTotal() {
        var totalPrice = 0;

        products.forEach(function(product, index) {
            var qtyInput = document.getElementById(`qty${index + 1}`);
            var priceLabel = document.getElementById(`price${index + 1}`);

            if (parseFloat(qtyInput.value) > 0) {
                totalPrice += parseFloat(qtyInput.value) * parseFloat(priceLabel.textContent);
            }
        });

        total.value = `Total: Php ${totalPrice.toFixed(2)}`;

        calculateChange(); 
    }
    function calculateChange() {
        var totalPrice = parseFloat(total.value.replace('Total: Php ', ''));
        var cashAmount = parseFloat(cash.value);

        if (isNaN(cashAmount)) {
            change.value = 'Change: Enter valid cash amount';
        } else {
            var changeAmount = cashAmount - totalPrice;
            change.value = `Change: Php ${changeAmount.toFixed(2)}`;
        }
    }

    function updateProduct(index, name, price) {
        products[index].name = name;
        products[index].price = parseFloat(price).toFixed(2);

        updateUI();
    }

    function updateUI() {

        products.forEach(function(product, index) {
            var productNameLabel = document.getElementById(`product${index + 1}`);
            var priceLabel = document.getElementById(`price${index + 1}`);
            var qtyInput = document.getElementById(`qty${index + 1}`);

            productNameLabel.textContent = product.name;
            priceLabel.textContent = product.price;
            qtyInput.value = "";
        });

        updateOrders(); 
    }

    qty1.addEventListener("keyup", updateOrders);
    qty2.addEventListener("keyup", updateOrders);
    qty3.addEventListener("keyup", updateOrders);
    qty4.addEventListener("keyup", updateOrders);
    qty5.addEventListener("keyup", updateOrders);
    qty6.addEventListener("keyup", updateOrders);
    cash.addEventListener("keyup", calculateChange); 

    function printReceipt() {
        var receiptContent = '';

        receiptContent += '=========================================\n';
        receiptContent += '      JERICO TAMONDON POINT OF SALE       \n';
        receiptContent += '=========================================\n\n';

        receiptContent += 'Orders:\n';
        receiptContent += carts.textContent + '\n';

        receiptContent += total.value + '\n';

        receiptContent += 'Cash Rendered: Php ' + cash.value + '\n';

        receiptContent += change.value + '\n\n';
    
        receiptContent += 'Thank you for shopping with us!\n';

        console.log(receiptContent);

        var printWindow = window.open('', 'PRINT', 'height=400,width=600');
        printWindow.document.write('<html><head><title>Receipt</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<pre>' + receiptContent + '</pre>');
        printWindow.document.write('</body></html>');
        printWindow.document.close(); 
        printWindow.focus(); 
        printWindow.print();
        printWindow.close();

        cash.value = '';
    }

    var printButton = document.getElementById("printButton");
    if (printButton) {
        printButton.addEventListener("click", function() {
            printReceipt();
        });
    }

    var product1Form = document.getElementById("product1Form");
    if (product1Form) {
        product1Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "NIKE SHOES GREEN";
            var productPrice = document.getElementById("productPrice1").value;
            updateProduct(0, productName, productPrice); 
        });
    }

    var product2Form = document.getElementById("product2Form");
    if (product2Form) {
        product2Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "NIKE SHOES BLACK";
            var productPrice = document.getElementById("productPrice2").value;
            updateProduct(1, productName, productPrice); 
        });
    }

    var product3Form = document.getElementById("product3Form");
    if (product3Form) {
        product3Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "CHAMPION JACKET";
            var productPrice = document.getElementById("productPrice3").value;
            updateProduct(2, productName, productPrice); 
        });
    }

    var product4Form = document.getElementById("product4Form");
    if (product4Form) {
        product4Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "TSHIRT GREEN";
            var productPrice = document.getElementById("productPrice4").value;
            updateProduct(3, productName, productPrice); 
        });
    }

    var product5Form = document.getElementById("product5Form");
    if (product5Form) {
        product5Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "TSHIRT BLUE";
            var productPrice = document.getElementById("productPrice5").value;
            updateProduct(4, productName, productPrice);
        });
    }

    var product6Form = document.getElementById("product6Form");
    if (product6Form) {
        product6Form.addEventListener("submit", function(event) {
            event.preventDefault();
            var productName = "NIKE JACKET";
            var productPrice = document.getElementById("productPrice6").value;
            updateProduct(5, productName, productPrice); 
        });
    }

    updateUI();
});