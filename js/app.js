let getSection = function () {
    return ["Торты", "Чизкейки", "Пирожные", "Напитки"];
}

let getSubsection = function () {
    return [
        [
            {name: "Сметанник", price: "1000 ₽", img_url: "img/menu/cream-cake.jpg",  kjbu: "10/10/10<br>на 100 г"},
            {name: "Три шоколада", price: "1000 ₽", img_url: "img/menu/three-chocolate-cake.jpg",  kjbu: "10/10/10<br>на 100 г"},
            {name: "Прага", price: "1000 ₽", img_url: "img/menu/praga-cake.jpg",  kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Шоколадный чизкейк", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Фруктовый чизкейк", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Эклеры с заварным кремом", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Кексы с клубникой", img_url: "img/menu/cupcakes.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Апельсиновый сок", img_url: "img/menu/orange-juice.jpg", price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Яблочный сок", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ]
    ];
}

let setProductCard = function (product_card, info, pl_id, pn_id, totally, price) {
    product_card.querySelector("#product_name").innerHTML = info.name;
    product_card.querySelector("#product_image").setAttribute("src", info.img_url);
    if (totally) {
        product_card.setAttribute("href", "product_card.html?product_line_id=" + pl_id
            + "&product_name_id=" + pn_id);
        product_card.querySelector("#kbju").innerHTML = info.kjbu;
    }
    if (price)
    {
        product_card.querySelector("#price").innerHTML = info.price;
        //product_card.setAttribute("alt",  info.price)
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

    let i = urlParams.get("product_line_id")
    let j = urlParams.get("product_name_id")

    document.title = subsection[i][j].name;

    let product_card = document.getElementById("products_content").querySelector("#product_card")
    setProductCard(product_card, subsection[i][j], i, j, true, true)
}

let addToBasket = function (shoppingCartImg) {
    if (shoppingCartImg.getAttribute("src") === "img/icons/added.svg") return;
    shoppingCartImg.setAttribute("src", "img/icons/added.svg");
    let selectBasket = document.createElement("a");
    selectBasket.setAttribute("href", "basket.html");
    selectBasket.innerHTML = "Перейти в корзину";
    let description = document.getElementById("description");
    description.append(selectBasket);
    localStorage.setItem(document.title, window.location.search);
}

let fill_basket = function () {
    let basket = document.getElementById("basket");
    let ch_products = document.getElementById("chosen_products");
    let chosen_products = basket.querySelector(".chosen_products");
    chosen_products.innerHTML = "<div id=\"product_card\">\n" +
        "        <a href=\"product_card.html?product_line_id=0&product_name_id=0\">\n" +
        "            <img id=\"product_image\" src=\"img/menu/cream-cake.jpg\" className=\"image\" alt=\"\">\n" +
        "        </a>\n" +
        "        <div id=\"description\">\n" +
        "            <p id=\"product_name\">Сметанник</p>\n" +
        "            <div>\n" +
        "                <div id=\"quantity\">\n" +
        "                    <p>Кол-во:</p>\n" +
        "                    <div>\n" +
        "                        <img src=\"img/icons/add_circle.svg\" alt=\"\">\n" +
        "                            <span>1</span>\n" +
        "                            <img src=\"img/icons/remove_circle.svg\" alt=\"\">\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"
    let product_card = chosen_products.querySelector("#product_card").cloneNode(true);
    //chosen_products.innerHTML = ""
    let urlParams;
    let subsection = getSubsection();
    for (let k = 0; k < localStorage.length; k++) {
        urlParams = new URLSearchParams(localStorage.getItem(localStorage.key(k)));
        alert(urlParams)
        let i = urlParams.get("product_line_id");
        let j = urlParams.get("product_name_id");

        alert(i)
        alert(j)

        setProductCard(product_card, subsection[i][j], i, j, false, true);
        ch_products.append(product_card)
    }
}