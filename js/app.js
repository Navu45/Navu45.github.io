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
            {name: "Кексы с клубникой", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ],
        [
            {name: "Апельсиновый сок", img_url: "img/menu/orange-juice.jpg", price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"},
            {name: "Яблочный сок", img_url: "img/menu/cream-cake.jpg",  price: "1000 ₽", kjbu: "10/10/10<br>на 100 г"}
        ]
    ];
}

let setProductCard = function (product_card, info, pl_id, pn_id, totally) {
    product_card.querySelector("#product_name").innerHTML = info.name;
    product_card.querySelector("#product_image").setAttribute("src", info.img_url);
    product_card.setAttribute("href", "product_card.html?product_line_id=" + pl_id
        + "&product_name_id=" + pn_id);
    if (totally) {
        product_card.querySelector("#kbju").innerHTML = info.kjbu;
        product_card.querySelector("#price").innerHTML = info.price;
    }
}

let fill_content = function () {
    let section = getSection();
    let subsection = getSubsection();

    let products_content = document.getElementById("products_content")
    let product_line_name_temp = products_content.querySelector("#product_line_name")
    let product_line_temp = products_content.querySelector('#product_line')
    let product_card_temp = products_content.querySelector("#product_card")
    let product_line;
    let product_card;

    for (let i = 1; i <= 2; i++) {
        product_card =  product_card_temp.cloneNode(true)
        setProductCard(product_card, subsection[0][i], 0, i, false)
        product_line_temp.append(product_card)
    }

    for (let i = 1; i < section.length; i++) {
        product_line = product_line_temp.cloneNode(false)
        for (let j = 0; j < subsection[i].length; j++) {
            product_card =  product_card_temp.cloneNode(true)
            setProductCard(product_card, subsection[i][j], i, j,false)
            product_line.append(product_card)
        }
        let product_line_name = product_line_name_temp.cloneNode(false)
        product_line_name.innerHTML = section[i];
        products_content.append(product_line_name);
        products_content.append(product_line);
    }
}


let openProductCard = function () {
    let section = getSection();
    let subsection = getSubsection();

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('product_name');
    document.getElementsByTagName("title").innerHtml = name;

    let i = urlParams.get("product_line_id")
    let j = urlParams.get("product_name_id")
    
    setProductCard(document.getElementById("product_card"),
         subsection[i][j], i, j, true)
}