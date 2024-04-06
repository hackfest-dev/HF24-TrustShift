// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract ManufacturerContract {
    uint256 private sellerCount = 0;
    uint256 private productCount = 0;

    struct Seller {
        uint256 sellerId;
        bytes32 sellerName;
        bytes32 sellerBrand;
        bytes32 sellerCode;
        bytes32 sellerAddress;
    }

    struct Product {
        uint256 productId;
        bytes32 productName;
        bytes32 productSN; // Serial Number
        bytes32 productBrand;
        uint256 productPrice;
        bytes32 productStatus; // Available, NA (Not Available)
    }

    mapping(uint256 => Seller) public sellers;
    mapping(uint256 => Product) public products;
    mapping(bytes32 => uint256[]) public productsWithSeller; // Tracks products by seller

    // Add a new seller
    function addSeller(bytes32 _sellerName, bytes32 _sellerBrand, bytes32 _sellerCode, bytes32 _sellerAddress) public {
        uint256 newSellerId = sellerCount++;
        sellers[newSellerId] = Seller(newSellerId, _sellerName, _sellerBrand, _sellerCode, _sellerAddress);
    }

    // Add a new product
    function addProduct(bytes32 _productName, bytes32 _productSN, bytes32 _productBrand, uint256 _productPrice) public {
        uint256 newProductId = productCount++;
        products[newProductId] = Product(newProductId, _productName, _productSN, _productBrand, _productPrice, "Available");
    }

    // Sell a product to a seller
    function sellProductToSeller(uint256 _productId, bytes32 _sellerCode) public {
        require(_productId < productCount, "Product does not exist.");
        require(products[_productId].productStatus == "Available", "Product is not available.");

        products[_productId].productStatus = "NA"; // Marking product as not available
        productsWithSeller[_sellerCode].push(_productId);
    }

    // Query all sellers
    function querySellers() public view returns (Seller[] memory) {
        Seller[] memory sellerList = new Seller[](sellerCount);
        for (uint256 i = 0; i < sellerCount; i++) {
            sellerList[i] = sellers[i];
        }
        return sellerList;
    }

    // Query all products for a specific seller
    function queryProductsForSeller(bytes32 _sellerCode) public view returns (Product[] memory) {
        uint256[] memory productIds = productsWithSeller[_sellerCode];
        Product[] memory sellerProducts = new Product[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            sellerProducts[i] = products[productIds[i]];
        }
        return sellerProducts;
    }
}
