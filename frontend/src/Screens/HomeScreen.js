import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { getProductList } from "../Actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);
  const itemNumber = 6;
  const lastIndex = currentPage * itemNumber - 1 ;
  const firstIndex =  (lastIndex+1) - itemNumber;
  const productSlice = products.slice(firstIndex,lastIndex+1);
  const totalPage = Math.ceil(products.length /itemNumber) ; 

  const prevPage = () =>{
      if(currentPage!==1){
        setCurrentPage(currentPage-1);
      }
  }
  const nextPage =() => {
    if(currentPage!==totalPage){
      setCurrentPage(currentPage+1);
    }
  }

  const selectedPage = (n) => {
      setCurrentPage(n)
  }

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h5>{error}</h5>
      ) : (
        <>
          <h2> Product List</h2>

          <Row>
            {productSlice.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            {products.length>6&&<Col>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  
                  <li className="page-item page-btn">
                    <a className="page-link" onClick={prevPage}>
                      Previous
                    </a>
                  </li>
                  {[...Array(totalPage).keys()].map((n,i)=>{
                    return  <li className="page-item">
                    <a className={currentPage===n+1?"page-link active":"page-link"} 
                       onClick={()=>selectedPage(n+1)}
                    >
                      {n+1}
                    </a>
                  </li>
                  })}
                  <li className="page-item page-btn">
                    <a className="page-link" onClick={nextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
          }
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
