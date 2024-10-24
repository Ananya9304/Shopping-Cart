import { Fragment } from "react"
import{Route,Routes} from "react-router-dom"
import ProductList from "./pages/productList";
import ProductDetails from "./pages/productDetails";
import CartListPage from "./pages/cartList";



function App() {
  


  return (
    
    <Fragment>
       
      <Routes>
      <Route index element={<ProductList/>}/>
      <Route path="/product-list" element={<ProductList/>}/>
      <Route path="/product-details/:id" element={<ProductDetails/>}/>
      <Route path="/card-list" element={<CartListPage/>}/>
      </Routes>
    
    </Fragment>
     
    
  );
}

export default App
