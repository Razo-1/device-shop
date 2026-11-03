# Device Shop

An online electronics store built with Node.js, Express and MongoDB. It includes registration and login, a catalog, filters and search, a wishlist, a cart, purchases, product returns and a user profile.

## Features

- Registration and login (passwords are stored as bcrypt hashes)
- JWT tokens (RS256) in httpOnly cookies: access token for 15 minutes, refresh token for 7 days
- Category catalog and product list with filters (price, brand, in stock, new, rating)
- Search by title
- Wishlist
- Cart and checkout (a single product or the whole cart)
- Returns: the money goes back to the balance and the product goes back to stock
- Profile: balance top-up (0.3% fee), password change, avatar, purchase history

## Tech stack

- Node.js, Express 4
- MongoDB (Atlas), `mongodb` driver
- EJS for pages
- `jsonwebtoken`, `bcrypt`
- `multer` for avatar uploads
- `nodemon` for development

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000/home`.

## Database

- `usersDB`, collection `users`: name, email, password hash, balance, avatar, wishlist, cart, transactions, total spent.
- `Shop`: a `category` collection and one collection per product category.

## Project structure

```
app.js            Express setup and route registration
bin/www           server entry point
DB/               MongoDB connection
routes/           routes
controller/       request handlers
services/         database access and business logic
middleware/       token and password checks, file upload, etc.
views/            EJS templates
public/           scripts, styles, images
upload/           avatars (created automatically)
```

## Routes

Pages (login required, except `/home`, `/start/catalog` and the auth pages):

| Method | Path | Description |
|--------|------|-------------|
| GET | `/home` | home page |
| GET | `/start/catalog` | category catalog |
| GET | `/:endpoint` | products of a category |
| GET | `/profile` | profile |
| GET | `/return-device` | returns page |
| GET | `/user/wishlist` | wishlist |
| GET | `/user/cart` | cart |
| GET | `/device/product` | product page |

Authentication `/auth`:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/sign-in` | login page |
| GET | `/auth/sign-up` | registration page |
| POST | `/auth/register` | register |
| POST | `/auth/login` | log in |
| POST | `/auth/logout` | log out |
| POST | `/auth/refresh-token` | refresh the access token |

Actions:

| Method | Path | Description |
|--------|------|-------------|
| POST | `/device/filter/:endPoint` | filter products |
| GET | `/device/search` | search |
| POST | `/device/wishlist` | add to or remove from the wishlist |
| POST | `/device/cart` | add to cart |
| PATCH | `/product/buy-gadget` | buy a product |
| PATCH | `/user/cart/buy` | buy the cart |
| DELETE | `/user/cart/delete` | remove a product from the cart |
| DELETE | `/user/cart/clear-all` | clear the cart |
| DELETE | `/user/wishlist/clear-all` | clear the wishlist |
| PUT | `/return-device/return` | return a product |
| PATCH | `/profile/deposit` | top up the balance |
| PATCH | `/profile/change-password` | change the password |
| PATCH | `/profile/avatar` | upload an avatar (JPG, PNG, WEBP, up to 2 MB) |
| DELETE | `/profile/remove-avatar` | remove the avatar |

## Known limitations

- The `http://localhost:3000` addresses are hardcoded in the client scripts in `public/javascripts`.
- Prices in the database are divided by 362 when the cost is calculated.
