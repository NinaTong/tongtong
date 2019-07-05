
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    const arrayStr = [{ name: "Sledgehammer", price: 125.76 }, { name: "Axe", price: 190.51 }, { name: "Bandsaw", price: 562.14 }, { name: "Chisel", price: 13.9 }, { name: "Hacksaw", price: 19.45 }];

    this.state = { 
      square:arrayStr,
      editArray:JSON.parse(localStorage.getItem('editArray')) || [],
      totalPrice:JSON.parse(localStorage.getItem('totalPrice')) ||0
    };

    this.addFunction = this.addFunction.bind(this);
    this.removeFunction = this.removeFunction.bind(this);
  }

//
// add function 
// note: add product to shopping cart
//
  addFunction(i) {
    var num = 1;  // quantity of the product as default
    
    // check if the product already in the shopping cart
    var filterText =this.state.square[i].name;
    var exist = this.state.editArray.some(item => filterText == item.name);

    // when the iteam already exist, only add by quantity
    if(exist){
      const updatedArr = this.state.editArray;
      const index =  this.state.editArray.findIndex((emp) => emp.name === filterText);

      var numOrg =  this.state.editArray[index].quantity;
      num = 1 + Number(numOrg);
      var price = num * this.state.square[i].price;
      updatedArr[index].quantity = num;
      updatedArr[index].total = price.toFixed(2) ;
      
      this.setState({
        editArray: updatedArr
        },() => {
        localStorage.setItem('editArray', JSON.stringify(this.state.editArray))
       });
    }
    // when add a new product add a new row 
    else{
      var all =  this.state.square[i].price * num;
      var row = this.state.editArray;
      row.push({name:this.state.square[i].name,price:this.state.square[i].price,quantity:num,total:all.toFixed(2)});
      this.setState({
        editArray: row
        },() => {
        localStorage.setItem('editArray', JSON.stringify(this.state.editArray))
       });
    }
    // calculate the total price  
    var total = 0;
    this.state.editArray.map((opt, colIndex) => (
      total =total + Number(opt.total)
    ))

    total = total.toFixed(2);
    this.setState({
      totalPrice:total
      },() => {
    localStorage.setItem('totalPrice', JSON.stringify(this.state.totalPrice))
     });
  }

//
// delete function 
// note: delete product from shopping cart
//
  removeFunction(name){
      const index = this.state.editArray.findIndex((emp) => emp.name === name);
      var numOrg =  this.state.editArray[index].quantity;

      // if the product's quantity is 1,remove the row, others -1 quantity
      if( numOrg == 1 ){
        var arrayCopy = this.state.editArray.filter((row) => row.name !== name);
      }else{
        var num = Number(numOrg) - 1;
        var price = num * this.state.editArray[index].price;
        this.state.editArray[index].quantity = num;
        this.state.editArray[index].total = price.toFixed(2) ;
        arrayCopy = this.state.editArray;
      }

    
    this.setState({
      editArray: arrayCopy
      },() => {
    localStorage.setItem('editArray', JSON.stringify(this.state.editArray))
     });

     // calculate the total price  
    var total = 0;
    arrayCopy.map((opt, colIndex) => (
      total =total + Number(opt.total)
    ))
    total = total.toFixed(2);
    this.setState({
      totalPrice:total
      },() => {
    localStorage.setItem('totalPrice', JSON.stringify(this.state.totalPrice))
     });
  }
  
  render() {
    return (
      <div>
       <div className="products">Products</div>
        <table className="withdraw-list-data-body" >
        <tr><th>Product Name</th><th>Price</th> <th>Add </th></tr>
        {
           this.state.square.map((opt, colIndex) => (
             <tr key={`col-${colIndex}`}>
                <td>{ opt.name } </td>
                <td> { opt.price.toFixed(2) } </td>
                <td className="edit-class" id= { colIndex } onClick={ this.addFunction.bind(this,colIndex)}> +1 </td>
              </tr>  
            ))
        }
        </table>
        <div className="shoppingCart">Shopping Cart</div>
        <table  className= "shoppingCart-list">
          <tr>
            <th> Remove </th>
            <th>Product name</th>
            <th> Price </th>
            <th> Quantity </th>
            <th> Total </th>
          </tr>
         {this.state.editArray.map((arr, index) => (
           <tr key={index+ "-product"} id={index + "-product"}>
           <td className="edit-class"><a id={index + "-remove"} onClick={() => this.removeFunction(arr.name)}> ✕ </a></td>
             <td>{ arr.name }</td>
             <td>{ arr.price.toFixed(2) }</td>
             <td id={index + "-num"} value={arr.quantity}>{ arr.quantity }</td>
             <td id={index + "-total"}>{ arr.total }</td> 
           </tr>
         ))
         }
          <tr>
            <td colspan="4">Total Price</td>
            <td >{ this.state.totalPrice }</td>
          </tr>
        </table>
        </div>
     );
  }

}

export default App;






