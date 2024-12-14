import AllProductsSection from "../AllProductsSection";
import PrimeDealsSection from "../PrimeDealsSection";
import Cookies from 'js-cookie'

import { Navigate } from "react-router-dom";

import Header from "../Header";
import { Component } from "react";

import "./index.css";

class ProductsRoute extends Component {
  state = { isShowBanner: true };

  changeBannerStatus = () => {
    this.setState((prevState) => ({ isShowBanner: !prevState.isShowBanner }));
  };
  render() {
    const { isShowBanner } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Navigate to='/login' />;
    }
    return (
      <>
        <Header />
        <div className='product-sections'>
          {isShowBanner && (
            <PrimeDealsSection changeBannerStatus={this.changeBannerStatus} />
          )}
          <AllProductsSection />
        </div>
      </>
    );
  }
}

export default ProductsRoute;
