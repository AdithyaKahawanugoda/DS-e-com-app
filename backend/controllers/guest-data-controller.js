//............................................................
const Product = require("../models/product-model");
//............................................................


//............................................................
//*******Randika****/
//get single product
exports.getSingleProduct = async (req, res) => {
    let prodictId = req.params.id;
   
    const product = await Product.findById(prodictId)
      .then((product) => {
        res.status(200).send({ status: "product fetched", product });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error in fetching product", error: err.message });
      });
  };

//............................................................