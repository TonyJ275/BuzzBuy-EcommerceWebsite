import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { Link } from 'react-router-dom';

const HomeScreen = () => {
   const { pageNumber, keyword } = useParams();

   const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber }); //returns data renamed to products
   return (
      <>
         {keyword && <Link to='/' className='btn btn-light mb-3'> Go Back </Link>}
         {isLoading ? (
            <h2><Loader /></h2>
         ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
         ) : (
            <>
               {!keyword && <h1> Latest Products </h1>}
               <Row>
                  {data.products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword ? keyword : ''}
               />
            </>
         )}
      </>
   );
};

export default HomeScreen;
