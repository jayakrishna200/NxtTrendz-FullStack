import CartContext from "../../context/CartContext";

import Header from "../Header";
import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";
import Cookies from "js-cookie";

import { Navigate } from "react-router-dom";

import "./index.css";

const CartRoute = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to='/login' />;
  }
  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList, removeAllCartItems } = value;
        const showEmptyView = cartList.length === 0;
        const onClickRemoveAllBtn = () => {
          removeAllCartItems();
        };

        return (
          <>
            <Header />
            <div className='cart-container'>
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className='cart-content-container'>
                  <h1 className='cart-heading'>My Cart</h1>
                  <button
                    type='button'
                    className='remove-all-btn'
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <CartSummary />
                </div>
              )}
            </div>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartRoute;
