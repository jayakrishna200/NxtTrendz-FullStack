import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className='not-found-head' >Oops! Page Not Found</h1>
    <p className='not-found-msg' >The page you're looking for doesn't exist or has been moved.</p>
  </div>
)

export default NotFound
