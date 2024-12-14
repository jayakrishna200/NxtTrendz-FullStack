import { Component } from "react";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";

import ProductCard from "../ProductCard";
import { BsX } from "react-icons/bs";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getPrimeDeals();
  }

  getPrimeDeals = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = "https://apis.ccbp.in/prime-deals";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);

    console.log(response);

    if (response.ok === true) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      const updatedData = fetchedData.prime_deals.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      this.setState({
        primeDeals: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderPrimeDealsListView = () => {
    const { primeDeals } = this.state;
    return (
      <div>
        <h1 className='primedeals-list-heading'>Exclusive Prime Deals</h1>
        <ul className='products-list'>
          {primeDeals.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  renderPrimeDealsFailureView = () => {
    const { changeBannerStatus } = this.props;
    const onClickRemoveBanner = () => {
      changeBannerStatus();
    };
    return (
      <div className='register-prime-deals-cont'>
        <button className='remove-btn' onClick={onClickRemoveBanner}>
          <BsX size='30' />
        </button>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className='loader-container'>
      <Oval
        height={50}
        width={50}
        color='#87CEEB'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );

  render() {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsListView();
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  }
}

export default PrimeDealsSection;
