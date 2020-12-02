let getSection = function () {
    return ["Торты", "Чизкейки", "Пирожные", "Напитки"];
}

let getSubsection = function () {
    return [
        [
            {name: "Сметанник", img_url: "img/menu/cream-cake.jpg",  price: 950, kjbu: "6.5/7.1/42.2<br>на 100 г"},
            {name: "Три шоколада", img_url: "img/menu/three-chocolate-cake.jpg",  price: 950, kjbu: "3.9/20.5/38.1<br>на 100 г"},
            {name: "Прага", img_url: "img/menu/praga-cake.jpg",  price: 950, kjbu: "4.6/26.5/65.1<br>на 100 г"}
        ],
        [
            {name: "Шоколадный чизкейк", img_url: "img/menu/chocolate-cheesecake.jpg",  price: 700, kjbu: "4.3/14.6/32<br>на 100 г"},
            {name: "Фруктовый чизкейк", img_url: "img/menu/fruit-cheesecake.jpg",  price: 700, kjbu: "4.3/14.6/32<br>на 100 г"}
        ],
        [
            {name: "Эклеры с заварным кремом", img_url: "img/menu/eclairs.jpg",  price: 250, kjbu: "4.81/16.88/44.71<br>на 100 г"},
            {name: "Кексы с клубникой", img_url: "img/menu/cupcakes.jpg",  price: 250, kjbu: "8.51/15.16/43.82<br>на 100 г"}
        ],
        [
            {name: "Апельсиновый сок", img_url: "img/menu/orange-juice.jpg", price: 170, kjbu: "2/0.12/9.76<br>на 100 г"},
            {name: "Яблочный сок", img_url: "img/menu/apple-cider.jpg",  price: 170, kjbu: "0.1/0.13/11.3<br>на 100 г"}
        ]
    ];
}

let setProductCard = function (product_card, info, pl_id, pn_id, totally, price) {
    product_card.querySelector("#product_name").innerHTML = info.name;
    product_card.querySelector("#product_image").setAttribute("src", info.img_url);
    product_card.setAttribute("href", "product_card.html?product_line_id=" + pl_id
        + "&product_name_id=" + pn_id);
    if (totally) {
        product_card.querySelector("#kbju").innerHTML = info.kjbu;
    }
    if (price) {
        product_card.querySelector("#price").innerHTML = info.price + " ₽";
    }
}

let fill_menu = function () {
    let section = getSection();
    let sectionNames = ["cakes", "cheesecakes", "pastries", "juices"]
    let subsection = getSubsection();

    let products_content = document.getElementById("products_content")
    let product_line_name_temp = products_content.querySelector("#product_line_name")
    let product_line_temp = products_content.querySelector('#product_line')
    let product_card_temp = products_content.querySelector("#product_card")
    let product_line;
    let product_card;

    for (let i = 1; i < 3; i++) {
        product_card =  product_card_temp.cloneNode(true)
        setProductCard(product_card, subsection[0][i], 0, i, false, false)
        product_line_temp.append(product_card)
    }

    for (let i = 1; i < section.length; i++) {
        product_line = product_line_temp.cloneNode(false)
        for (let j = 0; j < subsection[i].length; j++) {
            product_card =  product_card_temp.cloneNode(true)
            setProductCard(product_card, subsection[i][j], i, j,false, false)
            product_line.append(product_card)
        }
        let product_line_name = product_line_name_temp.cloneNode(false)
        product_line_name.innerHTML = section[i];
        product_line_name.setAttribute("href", "products.html#" + sectionNames[i])
        products_content.append(product_line_name);
        products_content.append(product_line);
    }
}

let openProductCard = function () {
    let subsection = getSubsection();

    const urlParams = new URLSearchParams(window.location.search);
    document.getElementsByTagName("title").innerHtml = urlParams.get('product_name');

    let i = urlParams.get("product_line_id")
    let j = urlParams.get("product_name_id")

    let product_card = document.getElementById("products_content").querySelector("#product_card")
    setProductCard(product_card, subsection[i][j], i, j, true, true)
}

let addProduct = function(value) {
    let listProduct = ["temp"];
    let listNum = ["temp"];

    if (localStorage.length !== 0) {
        listProduct = JSON.parse(localStorage.getItem("product"))
        listNum = JSON.parse(localStorage.getItem("numList"))
    }
    if (listProduct.indexOf(value) === -1) {
        listProduct.push(value)
        listNum.push(1)
    }
    if (localStorage.length === 0) {
        listProduct.shift()
        listNum.shift()
    }
    localStorage.setItem("product", JSON.stringify(listProduct))
    localStorage.setItem("numList", JSON.stringify(listNum))
}

let addToBasket = function (shoppingCartImg) {
    if (shoppingCartImg.getAttribute("src") === "img/icons/added.svg") return;
    shoppingCartImg.setAttribute("src", "img/icons/added.svg");
    let selectBasket = document.createElement("a");
    selectBasket.setAttribute("href", "basket.html");
    selectBasket.innerHTML = "Перейти в корзину";
    let description = document.getElementById("description");
    description.append(selectBasket);
    addProduct(window.location.search);
}

let fill_basket = function () {
    if (localStorage.length === 0) return;
    let chosen_products = document.getElementById("chosen_products");
    let product_card = chosen_products.querySelector("#product_card");
    let urlParams;
    let subsection = getSubsection();
    let listProducts = JSON.parse(localStorage.getItem("product"))
    let listNum = JSON.parse(localStorage.getItem("numList"))
    let k = 0;
    let sum = 0;
    let num = 0;
    do {
        urlParams = new URLSearchParams(listProducts[k]);

        let i = urlParams.get("product_line_id");
        let j = urlParams.get("product_name_id");
        setProductCard(product_card, subsection[i][j], i, j, false, false);
        product_card.querySelector("a").setAttribute("href", "product_card.html?product_line_id=" + i
            + "&product_name_id=" + j);
        product_card.querySelector("img").setAttribute("alt", k)
        product_card.querySelector("#plus").setAttribute("alt", subsection[i][j].price)
        product_card.querySelector("#minus").setAttribute("alt", subsection[i][j].price)
        product_card.querySelector("#cancel").setAttribute("alt", subsection[i][j].price)
        product_card.querySelector("span").innerHTML = listNum[k];
        chosen_products.append(product_card)
        product_card = product_card.cloneNode(true);
        sum += subsection[i][j].price * listNum[k];
        num += listNum[k]
        k++;

    } while (k < listProducts.length)
    document.getElementById("basket").style.display = "flex";
    document.getElementById("num").innerText = "Кол-во:  " + num;
    document.getElementById("sum").innerText = "Итого:  " + sum;
}

let clearBasket = function () {
    if (localStorage.length === 0) {
        alert("Вы ничего не выбрали. Зайдите в Меню и добавьте товар в корзину, чтобы оформить заказ.")
        return;
    }
    let sum = document.getElementById("sum").innerText
    sum = +/\d+/.exec(sum);
    alert("Спасибо за покупку, заказ №000000 на сумму " + sum + " ₽ ожидает вас в месте доставки!")
    localStorage.clear()
    location.reload()
}

let getParent = function (num, elem) {
    let parent = elem.parentElement;
    let i = num - 1;
    while (i > 0) {
        parent = parent.parentElement;
        i--;
    }
    return parent
}

let plus = function (plus_img) {
    let price = Number(plus_img.getAttribute("alt"));
    let span = plus_img.parentElement.querySelector("span");
    let num = document.getElementById("num").innerText;
    let sum = document.getElementById("sum").innerText
    sum = +/\d+/.exec(sum);
    num = +/\d+/.exec(num);
    num++;
    document.getElementById("num").innerText = "Кол-во:  " + num;
    document.getElementById("sum").innerText = "Итого:   " + (sum + price);
    num = Number(span.innerText) + 1;
    span.innerText = num
    let list = JSON.parse(localStorage.getItem("numList"));
    num = getParent(5, plus_img).querySelector("img").getAttribute("alt");
    list[Number(num)] += 1;
    localStorage.setItem("numList",JSON.stringify(list))
}

let minus = function (minus_img) {
    let price = Number(minus_img.getAttribute("alt"));
    let span = minus_img.parentElement.querySelector("span");
    let num1 = document.getElementById("num").innerText;
    let num2 = span.innerText;
    let sum = document.getElementById("sum").innerText
    sum = +/\d+/.exec(sum);
    num1 = +/\d+/.exec(num1);
    if (num1 !== 1 && Number(num2) !== 1) {
        num1--;
        num2 = Number(num2) - 1;
        document.getElementById("num").innerText = "Кол-во:  " + num1;
        document.getElementById("sum").innerText = "Итого:   " + (sum - price)
        span.innerText = num2
        let list = JSON.parse(localStorage.getItem("numList"));
        num2 = getParent(5, minus_img).querySelector("img").getAttribute("alt");
        list[Number(num2)] -= 1;
        localStorage.setItem("numList",JSON.stringify(list))
    }
}

let cancel = function (cancel_img) {
    let price = Number(cancel_img.getAttribute("alt"));
    let sum = +/\d+/.exec(document.getElementById("sum").innerHTML);
    let num = +/\d+/.exec(document.getElementById("num").innerHTML);
    let temp = Number(cancel_img.parentElement.querySelector("span").innerHTML);

    document.getElementById("sum").innerText = "Итого:   " + (sum - price * temp);
    document.getElementById("num").innerText = "Кол-во:  " + (num - temp);

    temp = cancel_img.parentElement.previousElementSibling.
    getAttribute("href").replace("product_card.html", "")

    let listProducts = JSON.parse(localStorage.getItem("product"))
    let listNum = JSON.parse(localStorage.getItem("numList"))

    for (let i = 0; i < listProducts.length; i++) {
        if (listProducts[i] === temp) {
            listProducts.splice(i, 1);
            listNum.splice(i, 1)
        }
    }

    if (listProducts.length === 0) {
        localStorage.clear()
    }
    else {
        localStorage.setItem("product", JSON.stringify(listProducts))
        localStorage.setItem("product", JSON.stringify(listProducts))
    }
    cancel_img.parentElement.parentElement.remove()
}

let setFooter = function () {
    let content_height = document.querySelector("main").clientHeight;
    let window_height =  window.innerHeight;
    if (content_height >= window_height) {
        document.querySelector(".wrapper").style.height = "initial";
    }
}
