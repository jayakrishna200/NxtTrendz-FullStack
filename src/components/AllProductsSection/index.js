import { Component } from "react";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";

import FiltersGroup from "../FiltersGroup";
import ProductCard from "../ProductCard";
import ProductsHeader from "../ProductsHeader";

import "./index.css";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "CLOTHING",
  },
  {
    name: "Electronics",
    categoryId: "ELECTRONICS",
  },
  {
    name: "Appliances",
    categoryId: "APPLIANCES",
  },
  {
    name: "Grocery",
    categoryId: "GROCERY",
  },
  {
    name: "Toys",
    categoryId: "TOYS",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: "",
    searchInput: "",
    activeRatingId: "",
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const jwtToken = Cookies.get("jwt_token");
    const { activeOptionId, activeCategoryId, searchInput, activeRatingId } =
      this.state;
    const apiUrl = `https://nxttrendz-backend-irmx.onrender.com/products/?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
    console.log(apiUrl);
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    if (response.ok) {
      console.log(fetchedData);
      const updatedData = fetchedData.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
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

  renderFailureView = () => (
    <div className='products-error-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png'
        alt='all-products-error'
        className='products-failure-img'
      />
      <h1 className='product-failure-heading-text'>
        Oops! Something Went Wrong
      </h1>
      <p className='products-failure-description'>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  changeSortby = (activeOptionId) => {
    this.setState({ activeOptionId }, this.getProducts);
  };

  renderProductsListView = () => {
    const { productsList, activeOptionId } = this.state;
    const shouldShowProductsList = productsList.length > 0;

    return shouldShowProductsList ? (
      <div className='all-products-container'>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className='products-list'>
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className='no-products-view'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png'
          className='no-products-img'
          alt='no products'
        />
        <h1 className='no-products-heading'>No Products Found</h1>
        <p className='no-products-description'>
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  renderAllProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  clearFilters = () => {
    this.setState(
      {
        searchInput: "",
        activeCategoryId: "",
        activeRatingId: "",
      },
      this.getProducts
    );
  };

  changeRating = (activeRatingId) => {
    this.setState({ activeRatingId }, this.getProducts);
  };

  changeCategory = (activeCategoryId) => {
    this.setState({ activeCategoryId }, this.getProducts);
  };

  enterSearchInput = () => {
    this.getProducts();
  };

  changeSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  render() {
    const { activeCategoryId, searchInput, activeRatingId } = this.state;

    return (
      <div className='all-products-section'>
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    );
  }
}

export default AllProductsSection;
