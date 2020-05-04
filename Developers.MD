<!--

PACKAGES:
*  yarn add express nodemon dotenv mongo mongoose uuidv1

 -->

<!-- *

Road Map

* APIs setup
* Database setup (NoSQL)
* User registration
* User validation
* User signin using JWT
* Auth/admin middleware (for provision extra access users)
* categories - CRUD (editing categories of products)
* products - CRUD (editing products)
* products by arrival, sold, search (filtered by product states) -> includes a search bar



REACT CLIENT
* setup (set up file structure and component relationship design)
* routing / menu -> react router
* signin / signup -> authentication using JWT
* admin route / private route
* user / admin dashboard -> fetched information
* create category -> CRUD UI
* create product -> CRUD UI
* products by sell -> filter through different component states
* products by arrival
* shop page with filter products by category / price
* filter products based on categories with checkbox
* filter products based on price using radio buttons
* search products based on selectable categories
* single product view (main product purchase page)
* sidebar of related products on single product view page
* cart page
* add product to cart (cart will be sent to backend ONLY after checkout)
* to be able to delete product on cart page OR decrement/increment the same instance of
* show total ONLY on cart page
* payment integration using BRAINTREE
* checkout (sends cart object)


BACKEND/FRONTEND
* API - Payment Processing
* REACT - processing payment with braintree dropin UI (API?)
* delivery address - user inputs
* finalize payment - locks in user state (no longer mutable // sends that object and clears cart)
* send order details to backend - like finalizing payments but sent to separate model
* saving orders - persists with USER validations
* sold products count/update after selling
* view all orders - well designed APIs -> think about adding cache client side
* order status update such as processing / delivered
* profile update
* product update -> CRUD UI only for admin
* deployment

* -->
