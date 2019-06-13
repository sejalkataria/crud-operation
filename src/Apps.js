import React from "react";
import ProductItem from "./productsItem"
import AddProduct from "./AddProduct"
import "./App.css";


const products=[
  {
    name:"ipad",
    price:200
  },
  {
    name:"iphone",
    price:500
  }
];
localStorage.setItem("products",JSON.stringify(products));


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      products:JSON.parse(localStorage.getItem('products'))
    }
    this.onAdd=this.onAdd.bind(this);
    this.onDelete=this.onDelete.bind(this);
    this.onEditSubmit=this.onEditSubmit.bind(this);
    
  }
  componentWillMount(){
  const products=this.getProducts();
  this.setState({products})
  }
  getProducts(){
    return this.state.products
 
    
  }
  onAdd(name,price){
      const products=this.getProducts();
      products.push({
          name,price
      });
      this.setState({products})

  }
  onDelete(name){
    const products=this.getProducts();
    const filterproducts=products.filter(product =>{
        return product.name !== name
    })
    console.log(filterproducts);
    this.setState({products:filterproducts})
  }
  onEditSubmit(name,price,originalName){
         let products=this.getProducts();
         products=products.map(product =>{
           
            if(product.name === originalName){
                product.name=name;
                product.price=price;
            }
            return product;
         });
         this.setState({products})
  }
  render(){
    return(
      <div className="App">
          <AddProduct 
          onAdd={this.onAdd} />
        <h1>Product Manager</h1>
        {
          this.state.products.map(product =>{
            return(
              <ProductItem 
              key={product.name}
              {...product}
              onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit}
              />
            )
          })
        }
      </div>
    )
  }


}
export default App