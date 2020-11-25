let setProductCard = function (product_card, info) {
    product_card.querySelector("#product_name").innerHTML = info.name;
    product_card.querySelector("#product_image").setAttribute("src", info.img_url);
}

let fill_content = function () {
    let section = ["Торты", "Чизкейки", "Пирожные", "Напитки"];
    let subsection = [
        [
            {name: "Три шоколада", price: "1000 ₽", img_url: "img/menu/three-chocolate-cake.jpg",  kjbu: "10/10/10<br>на 100 г"},
            {name: "Прага", price: "1000 ₽", img_url: "img/menu/praga-cake.jpg",  kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Шоколадный чизкейк", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Фруктовый чизкейк", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Эклеры с заварным кремом", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Кексы с клубникой", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Апельсиновый сок", img_url: "img/menu/orange-juice.jpg", price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Яблочный сок", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ]
    ];

    /*switch (name) {
        case "Sweet Shop": {
            return;
        }laue
        case "Меню":{

            break;
        }
        case "Моя корзина": {
            return;
        }
        case "Мой профиль": {
            return;
        }
        case "Карточка товара": {
            return;
        }
    }
     */

    let products_content = document.getElementById("products_content")
    let product_line_name_temp = products_content.querySelector("#product_line_name")
    let product_line_temp = products_content.querySelector('#product_line')
    let product_card_temp = products_content.querySelector("#product_card")
    let product_line;
    let product_card;

    for (let i = 0; i < 2; i++) {
        product_card =  product_card_temp.cloneNode(true)
        setProductCard(product_card, subsection[0][i])
        product_line_temp.append(product_card)
    }

    for (let i = 1; i < 4; i++) {
        product_line = product_line_temp.cloneNode(false)
        for (let j = 0; j < 2; j++) {
            product_card =  product_card_temp.cloneNode(true)
            setProductCard(product_card, subsection[i][j])
            product_line.append(product_card)
        }
        let product_line_name = product_line_name_temp.cloneNode(false)
        product_line_name.innerHTML = section[i];
        products_content.append(product_line_name);
        products_content.append(product_line);
    }
}

let openProductCard = function () {

}