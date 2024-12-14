import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from "./components/HomeRoute/index.js";
import RegisterRoute from "./components/RegisterRoute";
import LoginRoute from "./components/LoginRoute";
import NotFoundRoute from "./components/NotFoundRoute";
import ProductsRoute from "./components/ProductsRoute";
import ProductItemDetailsRoute from "./components/ProductItemDetailsRoute";
import CartRoute from "./components/CartRoute";
import CartContext from "./context/CartContext";

class App extends Component {
  state = {
    cartList: [],
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      }),
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === id
    );
    if (productObject.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        }),
      }));
    } else {
      this.removeCartItem(id);
    }
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.id !== id
    );

    this.setState({ cartList: updatedCartList });
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === product.id
    );

    if (productObject) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;

            return { ...eachCartItem, quantity: updatedQuantity };
          }

          return eachCartItem;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];

      this.setState({ cartList: updatedCartList });
    }
  };
  render() {
    const { cartList } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<HomeRoute />} />
            <Route exact path='/register' element={<RegisterRoute />} />
            <Route exact path='/login' element={<LoginRoute />} />
            <Route exact path='/products' element={<ProductsRoute />} />
            <Route
              exact
              path='/products/:id'
              element={<ProductItemDetailsRoute />}
            />
            <Route exact path='/cart' element={<CartRoute />} />
            <Route path='*' element={<NotFoundRoute />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    );
  }
}
export default App;
