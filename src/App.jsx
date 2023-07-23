import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/product?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProduct(data.products);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(page,'pagepage');
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th> Brand</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.slice(page * 10 - 10, page * 10)?.map((curr, index) => (
                <tr key={index}>
                  <td>{curr.brand}</td>
                  <td>{curr.category}</td>
                  <td>
                    <img src={curr?.images[0]} width={"80"} />
                  </td>
                </tr>
              ))}
            {product?.length > 0 && (
              <div className="pagination">
                <span onClick={()=>setPage(page-1)}>Prev</span>
                {[...Array(product.length / 10)].map((_, index) => {
                  return (
                    <span key={index}  onClick={()=>setPage(index+1)} className={index === page-1 ? "active" : ""}>
                      {index + 1}
                    </span>
                  );
                })}
                <span onClick={()=>setPage(page+1)}>Next</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
