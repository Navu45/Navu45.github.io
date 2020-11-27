let getSection = function () {
    return ["Торты", "Чизкейки", "Пирожные", "Напитки"];
}

let getSubsection = function () {
    return [
        [
            {name: "Сметанник", img_url: "img/menu/cream-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"},
            {name: "Три шоколада", img_url: "img/menu/three-chocolate-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"},
            {name: "Прага", img_url: "img/menu/praga-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Шоколадный чизкейк", img_url: "img/menu/cream-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"},
            {name: "Фруктовый чизкейк", img_url: "img/menu/cream-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Эклеры с заварным кремом", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Кексы с клубникой", img_url: "img/menu/cupcakes.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Апельсиновый сок", img_url: "img/menu/orange-juice.jpg", price: 1000, kjbu: "10/10/10<br>на 100 г"},
            {name: "Яблочный сок", img_url: "img/menu/cream-cake.jpg",  price: 1000, kjbu: "10/10/10<br>на 100 г"}
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

let addProduct = function(key, value) {
    let list = ["temp"];

    if (localStorage.length !== 0)
        list = JSON.parse(localStorage.getItem(key))
    if (list.indexOf(value) === -1)
        list.push(value)
    if (localStorage.length === 0) list.shift()
    localStorage.setItem(key, JSON.stringify(list))
}

let addToBasket = function (shoppingCartImg) {
    if (shoppingCartImg.getAttribute("src") === "img/icons/added.svg") return;
    shoppingCartImg.setAttribute("src", "img/icons/added.svg");
    let selectBasket = document.createElement("a");
    selectBasket.setAttribute("href", "basket.html");
    selectBasket.innerHTML = "Перейти в корзину";
    let description = document.getElementById("description");
    description.append(selectBasket);
    addProduct("product", window.location.search);
}

let fill_basket = function () {
    if (localStorage.length === 0) return;
    let chosen_products = document.getElementById("chosen_products");
    let product_card = chosen_products.querySelector("#product_card");
    let urlParams;
    let subsection = getSubsection();
    let list = JSON.parse(localStorage.getItem("product"))
    let k = 0;
    let sum = 0;
    do {
        urlParams = new URLSearchParams(list[k]);

        let i = urlParams.get("product_line_id");
        let j = urlParams.get("product_name_id");
        setProductCard(product_card, subsection[i][j], i, j, false, false);
        product_card.querySelector("#quantity").setAttribute("alt", subsection[i][j].price)
        chosen_products.append(product_card)
        product_card = product_card.cloneNode(true);
        sum += Number(subsection[i][j].price);
        k++;
    } while (k < list.length)
    document.getElementById("basket").style.display = "flex";
    document.getElementById("num").innerText = "Кол-во:  " + list.length;
    document.getElementById("sum").innerText = "Итого:  " + sum;
}

let clearBasket = function () {
    if (localStorage.length === 0) {
        alert("Вы ничего не выбрали. Зайдите в Меню и добавьте товар в корзину, чтобы оформить заказ.")
        return;
    }
    alert("Спасибо за покупку, заказ №000000 ожидает вас в месте доставки!")
    localStorage.clear()
    location.reload()
}

let plus = function () {
    
}

let minus = function () {

}

let cancel = function () {

}
