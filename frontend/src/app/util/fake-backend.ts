import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {User, UserType} from '../user/user';
import {Cart, ShopOrder} from "../balance/cart";
import {Order} from "../balance/order";

var PRODUCTS: any[] = [
    {id:0, name: "PrismaPM14", desc:"A simple desk system",
        price: 256, buyers: 12, provider:"NEOCommerce", factory: "Shanghai"},
    {id:1, name: "Drehstuhl", desc: "Office chair",
        price: 128, buyers: 256, provider: "NEOCommerce", factory: "Beijing"},
    {id:2, name: "ChairDesk", desc: "Chair Desk for Schools.",
        price: 233, buyers: 89, provider: "NEOCommerce", factory: "Shenzhen"}
];

class UserCart {
    id: number;
    cart: Cart;
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // array in local storage for registered users
        // localStorage.removeItem("user_carts");

        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // let products: any[] = JSON.parse(localStorage.getItem('products')) || [ { id: 1, name: 'product foo', price: 99, description: 'product description' } ];
        let products: any[] = JSON.parse(localStorage.getItem('products')) || PRODUCTS;
        let carts: UserCart[] = JSON.parse(localStorage.getItem('user_carts')) || [];
        let order_id: number = JSON.parse(localStorage.getItem('order_id')) || 0;

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        let user = filteredUsers[0];
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                name: user.name,
                                token: 'fake-jwt-token',
                                type: user.type,
                            }
                        })));
                    } else {
                        // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                    }
                }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                    }

                    // save new user
                    newUser.id = users.length + 1;
                    newUser.type = UserType.CUSTOMER;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // getAll products
                if (connection.request.url.endsWith('/api/products') && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: products })));
                }

                // getById product
                let m = connection.request.url.match(/\/api\/products\/(\d+)$/);
                if (m && connection.request.method == RequestMethod.Get) {
                    let id = parseInt(m[1]);
                    let matchedProducts = products.filter(prod => prod.id === id);
                    let product = matchedProducts.length > 0? matchedProducts[0]: null;
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: product })));
                }

                // add producct
                if (connection.request.url.endsWith('/api/products') && connection.request.method === RequestMethod.Post) {
                    let newProduct = JSON.parse(connection.request.getBody());
                    newProduct.id = products.length + 1;
                    products.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(products));
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                // add a product to user's cart
                if (connection.request.url.endsWith('/api/cart') && connection.request.method === RequestMethod.Post) {
                    // add a product to user's cart
                    console.log("In fake backend add product");
                    let params =  JSON.parse(connection.request.getBody());
                    let id = params.id;
                    let product = params.product;
                    let token = params.token;
                    if (id <= users.length && token === 'fake-jwt-token') {
                        let user = users[id-1];
                        let newOrder = {id: order_id, user_id: id, product: product, selected: true};
                        let filteredCart = carts.filter(cart => {
                            return cart.id === user.id;
                        });
                        let selectedCart;
                        if (filteredCart.length) {
                            let cart = filteredCart[0].cart;
                            let filteredShopOrders = cart.shopOrders.filter( shop => {
                                return shop.shop === product.provider;
                            });
                            if (filteredShopOrders.length) {
                                let shopOrder = filteredShopOrders[0];
                                shopOrder.orders.push(newOrder);
                            } else {
                                cart.shopOrders.push({shop: product.provider, orders:[newOrder]});
                            }
                            selectedCart = cart;
                        } else {
                            let shop: ShopOrder = {shop: product.provider, orders: [newOrder]};
                            let cart:Cart = {shopOrders: [shop]};
                            carts.push({id: id, cart: cart});
                            selectedCart = carts[0].cart;
                        }
                        order_id += 1;
                        localStorage.setItem("user_carts", JSON.stringify(carts));
                        localStorage.setItem('order_id', JSON.stringify(order_id));
                        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(selectedCart)})));
                    } else {
                        connection.mockError(new Error("No such user. Please log in first."));
                    }
                }

                // get cart of an user
                let n = connection.request.url.match(/\/api\/cart\/(\d+)$/);
                if ( n && connection.request.method == RequestMethod.Get) {
                    console.log("In fake backend get cart");
                    let id = parseInt(n[1]);
                    let filteredUsers = users.filter(user => {
                       return user.id === id;
                    });
                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let filteredCart = carts.filter(cart => {
                            return cart.id === user.id;
                        });
                        if (filteredCart.length)
                            connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(filteredCart[0].cart)})));
                        else
                            connection.mockRespond(new Response(new ResponseOptions({status: 200, body: {shopOrders: []}})));
                    } else {
                        connection.mockError(new Error("user not exist"));
                    }
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};