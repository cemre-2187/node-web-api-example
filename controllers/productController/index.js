// Dbs
const es = require('../../dbs/elasticSearch');
const sequelize = require('../../dbs/postgres');
const client = require('../../dbs/redis');
// Models
const Category = require('../../models/categoryModel');
const GenuineCategory = require('../../models/genuineCategoryModel');
// Functions
const { getChild, getIndices, getChildById } = require('../../utils/productFunctions');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
// Redis key
const redis_key = process.env.redis_prefix + "CATEGORIES";
// Sequelize
const Sequelize = require('sequelize');

// For category main page
exports.getRecords = catchAsync(async (req, res, next) => {
  let { catName } = req.query;
  let catId;
  if (catName) {
    if (catName && catName.includes(',')) catName = catName.replace(',', ' ')
    // catName validation
    if (!catName) return next(new AppError('Kategori ismi eksik', 400));
    // Fetch catName
    let category = await GenuineCategory.findOne(
      {
        where: {
          paths: {
            [Sequelize.Op.contains]: [catName]
          }
        }
      });
    // Category validation
    if (!category) return next(new AppError('Kategori ismi bulunamadı', 400));
    catId = category.id;
  };
  let esParams = {};
  //Prepare query
  let must = [];
  esParams["index"] = "products";
  esParams["size"] = req.query._limit || 20;
  esParams["from"] = req.query.from || 0;
  // TODO: After the changes in the robots, we will add this wildcard property to match the categories
  // must.push({
  //   wildcard: {
  //     "genuine_category_id.keyword": { value: `${catId}*` },
  //   },
  // });
  // Prepare the must
  must = [
    {
      range: {
        price: {
          gte: 0
        }
      },
      range: {
        genuine_category_id: {
          gte: 0
        }
      },
    },
    {
      match: {
        in_stock: true
      }
    },
    {
      match: {
        removed: false
      }
    },
    {
      match: {
        is_shop_product: true
      }
    }
  ]
  if (catName) must.push({
    match: {
      genuine_category_id: catId,
    }
  })
  // Add the must
  must && must.length > 0
    ? (esParams["body"] = {
      query: {
        bool: {
          must: must,
        }
      },
    })
    : null;
  // Sort preference
  esParams["body"].sort = [];
  esParams["body"].sort = [{
    price_change_average: {
      order: "asc",
    }
  }];
  // Make the search
  let products = await es.search(esParams);
  // Products validation
  let productsArray = products.body.hits ? products.body.hits.hits : [];
  // If nothing found, return empty array
  if (productsArray.length == 0) return res.status(200).send({ status: "success", message: [] });
  productsArray = productsArray.map((item) => {
    return item._source;
  });
  return res.status(200).send({ status: "success", message: productsArray, totalCount: products.body.hits.total.value });
});

exports.searchProducts = catchAsync(async (req, res) => {
  // console.log(JSON.parse(req.query.parameters));
  let parameters = JSON.parse(req.query.parameters)
  console.log(parameters.title);
  let esParams = {};
  //prepare query
  let must = [];
  must = [
    {
      range: {
        price: {
          gte: 0
        }
      },
      // TODO: After the changes in the robots, we will act accordingly
      range: {
        genuine_category_id: {
          gte: 0
        }
      },
    },
    {
      match: {
        is_shop_product: true
      }
    }
  ];
  let must_not = [
    {
      match: {
        in_stock: false
      }
    },
    {
      match: {
        removed: true
      }
    },
  ]
  esParams["index"] = "products";
  esParams["size"] = parameters.size || 20;
  esParams["from"] = parameters.from || 0;
  // Title
  let tmpTitle = "";
  if (parameters.title) {
    parameters.title.includes('-') && parameters.title.split("-").forEach((item) => {
      tmpTitle += "*" + item;
    }
    );
    if (!parameters.title.includes('-')) {
      tmpTitle = '*' + parameters.title
    }
    must.push({
      wildcard: {
        "title.keyword": { value: `${tmpTitle}*`, case_insensitive: true },
      },
    });
  }
  //brand
  if (parameters.brand && parameters.brand.length > 0) {
    must.push({
      wildcard: {
        brand: { value: `${parameters.brand}`, case_insensitive: true },
      },
    });
  }
  //comment
  if (parameters.comment) {
    parameters.comment = JSON.parse(parameters.comment);
    must.push({
      range: {
        comment_count: {
          gte: parameters.comment.min,
          lte: parameters.comment.max,
        },
      },
    });
  }
  //favorite
  if (parameters.favorite) {
    parameters.favorite = JSON.parse(rparameters.favorite);
    must.push({
      range: {
        favorite_count: {
          gte: parameters.favorite.min,
          lte: parameters.favorite.max,
        },
      },
    });
  }
  // Discount
  if (parameters.minDiscount || parameters.maxDiscount) {
    console.log(parameters.minDiscount, parameters.maxDiscount);
    must.push({
      range: {
        price_change_average: {
          gte: (+parameters.maxDiscount * -1),
          lte: (+parameters.minDiscount * -1),
        },
      },
    });
  }
  // Price
  if (parameters.minPrice || parameters.maxPrice) {
    parameters.minPrice === 0
      ? (parameters.minPrice = 1)
      : parameters.minPrice;
    must.push({
      range: {
        price: { gte: parameters.minPrice, lte: parameters.maxPrice },
      },
    });
  }
  // Finalize query
  must.push({ range: { price_change_average: { lt: 0 } } });
  must && must.length > 0
    ? (esParams["body"] = {
      query: {
        bool: {
          must: must,
          must_not: must_not,
        },
      },
    })
    : null;
  esParams["body"].sort = [];
  esParams["body"].sort.push({
    price_change_average: {
      order: "asc",
    },
  });

  // Make the search
  let products = await es.search(esParams);
  // Products validation
  let productsArray = products.body.hits ? products.body.hits.hits : [];
  // If nothing found, return empty array
  if (productsArray.length == 0) return res.status(200).send({ status: "success", message: [] });
  productsArray = productsArray.map((item) => {
    return item._source;
  });
  return res.status(200).send({ status: "success", message: productsArray, totalCount: products.body.hits.total.value });
});
// TODO: Search is not working because Elastic search does not support the array type but we can include it as string
exports.searchHistogram = catchAsync(async (req, res) => {
  let esParams = {};
  //find indices in accordance with the given dates
  let indices = await getIndices(es, "product-logs-");
  //prepare query
  let must = [];
  esParams["index"] = indices;
  esParams["size"] = 0;
  if (req.params.product)
    must.push({ term: { "product_code.keyword": req.params.product } });
  // Finalize query
  must && must.length > 0
    ? (esParams["body"] = {
      query: { bool: { must: must } },
      aggs: {
        entries: {
          date_histogram: {
            field: "created_at",
            calendar_interval: req.params.interval || "hour",
            min_doc_count: 0,
            order: {
              _key: "desc",
            },
          },
          aggs: {
            products: {
              terms: {
                field: "price",
              },
            },
          },
        },
      },
    })
    : null;
  // Search the product data
  let productsLast = await es.search(esParams);
  let products = productsLast.body.aggregations
    ? productsLast.body.aggregations.entries.buckets
    : [];
  products = products.map((item) => {
    return {
      key: item.key,
      price:
        item.doc_count > 0 && item.products.buckets[0].key
          ? item.products.buckets[0].key
          : 0,
    };
  });
  return res.status(200).send({ status: "success", message: products });

});

exports.getProductCategories = catchAsync(async (req, res, next) => {
  // Get categories
  let categories = await client.get(redis_key);
  if (categories && JSON.parse(categories).length > 0) {
    categories = JSON.parse(categories);
    return res.status(200).send({ status: "success", message: categories });
  } else {
    Category.find({}, async (err, categories) => {
      if (err)
        return next(new AppError(err, 400));
      if (categories && categories.length === 0)
        return next(new AppError('No category found', 400));
      let cats = categories
        .filter((category) => {
          return category.parent === null;
        })
        .map((category) => {
          return {
            name: category.name,
            code: category.code,
            children: [],
          };
        });

      await getChild(categories, cats);
      await client.set(redis_key, JSON.stringify(cats));
      return res.status(200).send({ status: "success", message: cats });
    });
  }
});
// For wishlist products
exports.getWishlistProducts = catchAsync(async (req, res, next) => {
  // Get the product codes from request query
  let { productCodes } = req.query;
  let productsInfo;
  // Split them with comma and construct a new array
  if (!productCodes) return next(new AppError('Ürünler bulunamadı.', 400));
  // If more than 1 product code
  if (productCodes.includes(',')) {
    productCodes = productCodes.split(',');
    // Product codes validation
    if (!productCodes.length) return next(new AppError('Ürün kodu tanımlanamadı.', 400));
    // Get the products by their ids
    productsInfo = await es.search({
      index: 'products',
      body: {
        query: {
          ids: {
            values: productCodes
          }
        }
      }
    });
    // If not exist, return error
    if (!productsInfo) return next(new AppError('Ürünler bulunamadı.', 400));
    if (productsInfo.length == 0) return res.status(200).send({ status: 'success', message: [] });
    // Reformat the data
    let products = [];
    productsInfo.body.hits.hits.map((item) => products.push(item._source));
    // Send the response
    return res.status(200).send({ status: "success", message: products });
  } else {
    // If there is only 1 product code
    productsInfo = await es.get({
      index: 'products',
      id: productCodes
    });
    // If not exist, return error
    if (!productsInfo) return next(new AppError('Ürünler bulunamadı.', 400));
    // Send the response
    return res.status(200).send({ status: "success", message: [productsInfo.body._source] });
  }

});

exports.getProductsInfo = catchAsync(async (req, res, next) => {
  // Get the product codes from request query
  let { productCodes } = req.query;
  // Split them with comma and construct a new array
  productCodes = productCodes.split(',');
  // Product codes validation
  if (!productCodes.length) return next(new AppError('Ürün kodu tanımlanamadı.', 400));
  // Get the products by their ids
  let productsInfo = await es.search({
    index: 'products',
    body: {
      query: {
        ids: {
          values: productCodes
        }
      }
    }
  });
  // If not exist, return error
  if (!productsInfo) return next(new AppError('Ürünler bulunamadı.', 400));
  // Send the response
  return res.status(200).send({ status: 'success', message: productsInfo.body.hits.hits })
});

exports.getProductInfo = catchAsync(async (req, res, next) => {
  // Get the product code from request query
  let { productCode } = req.query;
  // Product code validation
  if (!productCode) return next(new AppError('Ürün kodu tanımlanamadı.', 400));
  // Get the product with by its product code
  let productInfo = await es.get({
    index: 'products',
    id: productCode
  });
  let product = productInfo.body._source;
  // Get category
  let category = await GenuineCategory.findOne({
    where: {
      id: String(product.genuine_category_id) // Since type of the id is changed to string to make the search easier, we are changing it to string also
    },
    attributes: [
      'bc1', 'bc2', 'bc3', 'bc4', 'breadcrumb_paths'
    ]
  });
  console.log(category);
  // Set breadcumb
  let breadcrumb = [];
  // Get category names from category
  let categoryNames = [category?.bc1, category?.bc2, category?.bc3, category?.bc4];
  // Remove empty values
  categoryNames = categoryNames.filter((item) => item !== '');
  // Get category paths
  let categoryPaths = category.breadcrumb_paths;
  // Prepare breadcrumb
  categoryPaths.forEach((item, index) => {
    breadcrumb.push({
      name: categoryNames[index],
      path: item
    });
  });
  product.breadcrumb = breadcrumb;
  // If not exist, return error
  if (!productInfo) return next(new AppError('Ürün bulunamadı', 400));
  // Send the response
  return res.status(200).send({ status: 'success', message: product, category: category })
});

exports.getCategoryInfo = catchAsync(async (req, res, next) => {
  // Get catName from request query
  let { catName } = req.query;
  if (catName && catName.includes(',')) catName = catName.replace(',', ' ')
  console.log(catName);
  // catName validation
  if (!catName) return next(new AppError('Kategori ismi eksik', 400));
  // Fetch catName
  let category_name = await GenuineCategory.findOne(
    {
      where: {
        category: catName
      }
    });
  // category_name validation
  if (!category_name) return next(new AppError('Kategori ismi bulunamadı', 400));

  let esParams = {};
  //prepare query
  let must = [];
  esParams["index"] = "products";
  esParams["size"] = req.query.size || 25;
  esParams["from"] = req.query.from || 0;
  //title
  let tmpTitle = "";
  if (req.query.title && req.query.title.length > 0) {
    req.query.title.split(" ").forEach((item) => {
      tmpTitle += "*" + item;
    });
    must.push({
      wildcard: {
        "title.keyword": { value: `${tmpTitle}*`, case_insensitive: true },
      },
    });
  }
  //brand
  if (req.query.brand && req.query.brand.length > 0) {
    must.push({
      wildcard: {
        brand: { value: `${req.query.brand}`, case_insensitive: true },
      },
    });
  }
  //category
  must.push({
    wildcard: {
      "genuine_category_id.keyword": { value: `${category_name.id}*` },
    },
  });
  // must.push({ terms: { genuine_category_id: category_name.id } });
  //comment
  if (req.query.comment) {
    req.query.comment = JSON.parse(req.query.comment);
    must.push({
      range: {
        comment_count: {
          gte: req.query.comment.min,
          lte: req.query.comment.max,
        },
      },
    });
  }
  //favorite
  if (req.query.favorite) {
    req.query.favorite = JSON.parse(req.query.favorite);
    must.push({
      range: {
        favorite_count: {
          gte: req.query.favorite.min,
          lte: req.query.favorite.max,
        },
      },
    });
  }
  //price change average
  if (req.query.price_change_average) {
    req.query.price_change_average = JSON.parse(
      req.query.price_change_average
    );
    must.push({
      range: {
        price_change_average: {
          gte: (+req.query.price_change_average.max * -1) / 100,
          lte: (+req.query.price_change_average.min * -1) / 100,
        },
      },
    });
  }
  //price
  if (req.query.price) {
    req.query.price = JSON.parse(req.query.price);
    req.query.price.min === 0
      ? (req.query.price.min = 1)
      : req.query.price.min;
    must.push({
      range: {
        price: { gte: req.query.price.min, lte: req.query.price.max },
      },
    });
  }
  //rank
  if (req.query.rank)
    must.push({ range: { rating: { gte: req.query.rank } } });
  // Finalize query
  must.push({ range: { price_change_average: { lt: 0 } } });
  must && must.length > 0
    ? (esParams["body"] = {
      query: {
        bool: {
          must: must,
          must_not: [
            { term: { in_stock: { value: false } } },
            { term: { removed: { value: true } } },
          ],
        },
      },
    })
    : null;

  let searchedProducts = await es.search(esParams);
  // console.log(searchedProducts.body.hits.hits);
  res.status(200).send({ status: 'success', message: searchedProducts.body.hits.hits })

});

exports.getCategory = catchAsync(async (req, res, next) => {
  const { catName } = req.query;
  console.log(catName);
  // Fetch catName
  let category_name = await GenuineCategory.findOne(
    {
      where: {
        paths: {
          [Sequelize.Op.contains]: [catName]
        }
      }
    });
  // category_name validation
  if (!category_name) return next(new AppError('Kategori ismi bulunamadı', 400));
  return res.status(200).send({ status: 'success', message: category_name })
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  // Get the id
  let id = req.params.id;
  console.log(id);
  // Fetch catName
  let category = await GenuineCategory.findOne({
    where: {
      id: id
    }
  });

  // category_name validation
  if (!category) return next(new AppError('Kategori ismi bulunamadı', 400));
  return res.status(200).send({ status: 'success', category: category.paths[0] })
});

// exports.getProductInfo = catchAsync(async (req, res, next) => {
//   // Get the product title from request query
//   let { productTitle } = req.query;
//   // Define esParams and must
//   let esParams = {};
//   let must = [];
//   // Define the index property as products
//   esParams["index"] = "products";
//   // Set the product title and its wildcard for exact match
//   let productTitleWords = ''
//   if (productTitle) {
//     productTitle.split(' ').map((word) => {
//       productTitleWords += "*" + word;
//     })
//     must.push({
//       wildcard: { "title.keyword": { value: `${productTitleWords}`, case_insensitive: false }, }
//     })
//   }
//   // Set the body of esParams
//   if (must.length) {
//     esParams['body'] = {
//       query: { bool: { must: must } }
//     }
//   };
//   let productInfo = await es.search(esParams);
//   res.status(200).send({ status: 'success', message: productInfo.body.hits.hits[0] });
// })