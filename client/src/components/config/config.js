export const AdminMenu= [
    
        {id:"dashboard" , label:"Dashboard" },
        {id:"products" , label:"Products" },
        {id:"orders" , label:"Orders" },
        {id:"features" , label:"Features" },
    
]


export const Category= [

{ id: "men", label: "Men" },
{ id: "women", label: "Women" },
{ id: "kids", label: "Kids" },
{ id: "accessories", label: "Accessories" },
{ id: "footwear", label: "Footwear" },
]


export const Brand = [

{ id: "nike", label: "Nike" },
{ id: "adidas", label: "Adidas" },
{ id: "puma", label: "Puma" },
{ id: "levi", label: "Levi's" },
{ id: "zara", label: "Zara" },
{ id: "h&m", label: "H&M" },
{ id: "samsung", label: "Samsung" },
{ id: "titan", label: "Titan" },
]


export const ShopNavLinks = [

     {   id:"home" , label:"Home" , url:"/shop/home"},
     {   id:"shop" , label:"Shop" , url:"/shop/products"},
     {   id:"men" , label:"Men" , url:"/shop/products"},
     {   id:"women" , label:"Women", url:"/shop/products"},
     {   id:"kids" , label:"Kids", url:"/shop/products"},
     {   id:"accessories" , label:"Accessories", url:"/shop/products"},
     {   id:"footwear" , label:"Footwear", url:"/shop/products"},
     {   id:"search" , label:"Search", url:"/shop/search"},
]


export const ProductFilter = {

        category:[

{ id: "men", label: "Men" },
{ id: "women", label: "Women" },
{ id: "kids", label: "Kids" },
{ id: "accessories", label: "Accessories" },
{ id: "footwear", label: "Footwear" },
]
,
brand: [

{ id: "nike", label: "Nike" },
{ id: "adidas", label: "Adidas" },
{ id: "puma", label: "Puma" },
{ id: "levi", label: "Levi's" },
{ id: "zara", label: "Zara" },
{ id: "h&m", label: "H&M" },
{ id: "samsung", label: "Samsung" },
{ id: "titan", label: "Titan" },
]


}


export const Sort =[

        {id:"LH" , label:"Price: Low to High"},
        {id:"HL" , label:"Price: High to Low"},
        {id:"AZ", label:"Title: A to Z"},
        {id:"ZA", label:"Title: Z to A"},
]


export const OrderStatus = [

    {id:"confirmed" , label:"Confirmed"},
    {id:"pending" , label:"Pending"},
    {id:"inProcess" , label:"In Process"},
    {id:"inShipped" , label:"In Shipped"},
    {id:"delivered" , label:"Delivered"},
    {id:"rejected" , label:"Rejected"},
]