let product = {
    name: 'T-Shirt LD02',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias necessitatibus ratione consectetur architecto accusamus iste assumenda velit molestiae reiciendis facere',
    image: 'image.png',
    price: '100 ~ 200',
    children: [
        {color: '#bfb1a4', size: 'M', price: 100},
        {color: '#bfb1a4', size: 'L', price: 120},
        {color: '#bfb1a4', size: 'XL', price: 170},
        {color: '#9c2f46', size: 'M', price: 140},
        {color: '#9c2f46', size: 'L', price: 120},
        {color: '#9c2f46', size: 'XL', price: 150},
    ]
}
let title = document.getElementById('title');
let description = document.getElementById('description');
let image = document.getElementById('image');
let price = document.getElementById('price');
let colorHTML = document.getElementById('colors'); 
let sizeHTML = document.getElementById('sizes'); 

let option = {
    size :  null,
    color : null
}

const initApp = () => {
    title.innerText = product.name;
    description.innerText = product.description;
    price.innerText = product.price;

    // get colors
    let colors = (product.children).map(product => product.color);
    colors = Array.from(new Set(colors));
    if(colors.length > 0){
        colors.forEach(color => {
            let li = document.createElement('li');
            li.style.backgroundColor = color;
            li.setAttribute('data-color', color);
            colorHTML.appendChild(li);
            li.addEventListener('click', () => {
                option.color = option.color !== color ? color : null;
                refreshInfo();
            })
        })
    }
    // get sizes
    let sizes = (product.children).map(product => product.size);
    sizes = Array.from(new Set(sizes));
    if(sizes.length > 0){
        sizes.forEach(size => {
            let li = document.createElement('li');
            li.innerText = size;
            li.setAttribute('data-size', size);
            sizeHTML.appendChild(li);
            li.addEventListener('click', () => {
                option.size = option.size !== size ? size : null;
                refreshInfo();
            })
        })
    }
}
initApp();
const refreshInfo = () => {
    // colors
    colorOldActive = colorHTML.querySelector('li.active');
    if (colorOldActive) colorOldActive.classList.remove('active');
    if(option.color !== null){
        let colorNewActive = colorHTML.querySelector('li[data-color="'+option.color+'"]');
        colorNewActive.classList.add('active');
    }
    // size
    sizeOldActive = sizeHTML.querySelector('li.active');
    if (sizeOldActive) sizeOldActive.classList.remove('active');
    if(option.size !== null){
        let sizeNewActive = sizeHTML.querySelector('li[data-size="'+option.size+'"]');
        sizeNewActive.classList.add('active');
    }

    // set price
    if(option.size === null || option.color === null){
        price.innerText = product.price;
    }else{
        let childFound = (product.children).filter(product => {
            return (product.size == option.size && product.color == option.color);
        })[0];
        price.innerText = childFound.price;
    }
}



