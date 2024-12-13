import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState([true]);
  

  useEffect((data) => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
        console.log(res.data)
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            {loading ?
          <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                    <span>2.1 ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>  :
            <div className="col-md-12">   
            <ol className="author_list">
              {sellers.map((s, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${s.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={s.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${s.authorId}`}>{s.authorName}</Link>
                    <span>{s.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
              }  
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
