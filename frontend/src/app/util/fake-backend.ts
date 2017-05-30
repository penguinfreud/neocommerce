import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {User, UserType} from '../user/user';
import {Cart, ShopOrder} from "../balance/cart";
import {Order} from "../balance/order";

var PRODUCTS: any[] = [
    // {id:1, name: "Hetzer_2", desc: "The Jagdpanzer 38 (Sd.Kfz. 138/2), later known as Hetzer (\"pursuer/hunter\"), was a German light tank destroyer of the Second World War based on a modified Czechoslovakian Panzer 38(t) chassis. The project was inspired by the Romanian \"Mareşal\" tank destroyer.",
    //     price: 6553600, buyers: 64, provider: "NEOCommerce", factory: "Shanghai"},
    {id:0, name: "PrismaPM14", desc:"A simple desk system",
        price: 256, buyers: 12, provider:"NEOCommerce", factory: "Shanghai"},
    {id:1, name: "Mercedes-Benz-G500", desc: "The Mercedes-Benz G-Class or G-Wagen, short for Geländewagen (or cross-country vehicle), is a four-wheel drive vehicle / sport utility vehicle (SUV) produced by German automaker Mercedes-Benz. It was borne by proposals for a military vehicle in the early 1970s by the Shah Mohammad Reza Pahlavi of Iran, a major Daimler-Benz shareholder. Developed in co-operation with the Austrian car manufacturer Steyr-Daimler-Puch, production of the G-Class began in 1979 with the 460 Series models. The G-Class has been sold under the Puch name in certain markets, and the Peugeot P4 is a variant made under license, with a Peugeot engine and other equipment. The chassis was revised for 1990 as the W463 with anti-lock brakes, full-time 4WD and a full trio of electronically-locking differentials. The interior was totally upgraded, finished with wooden accents and optional leather upholstery.",
        price: 88888, buyers: 256, provider: "NEOCommerce", factory: "Beijing"},
    {id:2, name: "mystik_dsrv_CC50", desc: "DSRV-1 Mystic is a Deep Submergence Rescue Vehicle that is rated to dive up to 5000 feet (1500 m). DSRV-1 was built by Lockheed for the U.S. Navy at a construction cost of $41 million and launched 24 January 1970. She was declared fully operational in 1977 and named \"Mystic\". The submarine, intended to be air transportable, was 50 feet (15 m) long, 8 feet (2.4 m) in diameter, and weighed 37 tons. The sub was capable of descending to 5,000 feet (1,500 m) below the surface and could carry 24 passengers at a time in addition to her crew.",
        price: 12335242, buyers: 8, provider: "NEOCommerce", factory: "Shenzhen"}
];
class UserCart {
    user: User;
    cart: Cart;

}
export function showOrders(cart: UserCart): void {
    console.log("user id:" + cart.user.id);
    let shops = cart.cart.shopOrders;
    for (let shop of shops) {
        console.log("shop name:" + shop.shop);
        let orders = shop.orders;
        for (let order of orders) {
            console.log("  id:" + order.id + " user:" + order.user.id + " product:"+order.product.name);
        }
    }
}
export function showOrder(cart: Cart): void {
    let shops = cart.shopOrders;
    for (let shop of shops) {
        console.log("shop name:" + shop.shop);
        let orders = shop.orders;
        for (let order of orders) {
            console.log("  id:" + order.id + " user:" + order.user.id + " product:"+order.product.name);
        }
    }
}
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // array in local storage for registered users
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
                // TODO: duralize to storage undone
                if (connection.request.url.endsWith('/api/cart') && connection.request.method === RequestMethod.Post) {
                    // add a product to user's cart
                    console.log("In fake backend add product");
                    console.log("length is " + users.length);
                    console.log("users:" + users);
                    let params =  JSON.parse(connection.request.getBody());
                    let id = params.id;
                    let product = params.product;
                    let token = params.token;
                    if (id < users.length && token === 'fake-jwt-token') {
                        let user = users[id];
                        console.log("selected user:" + user);
                        let newOrder = {id: order_id, user: user, product: product, selected: true};
                        console.log("before update, cart is " + carts);
                        let filteredCart = carts.filter(cart => {
                            return cart.user === user;
                        });
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
                        } else {
                            let shop: ShopOrder = {shop: product.provider, orders: [newOrder]};
                            let cart:Cart = {shopOrders: [shop]};
                            carts.push({user: user, cart: cart});
                        }
                        filteredCart = carts.filter(cart => {
                            return cart.user === user;
                        });
                        order_id += 1;
                        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: filteredCart[0].cart })));
                        console.log("returned cart:" + filteredCart[0].cart);
                        localStorage.setItem("user_carts", JSON.stringify(carts));
                        localStorage.setItem('order_id', JSON.stringify(order_id));
                    } else {
                        connection.mockError(new Error("No such user. Please log in first."));
                    }
                }

                // get cart of an user
                let n = connection.request.url.match(/\/api\/cart\/(\d+)$/);
                if ( n && connection.request.method == RequestMethod.Get) {
                    console.log("In fake backend get cart");
                    let id = parseInt(n[1]);
                    console.log("id is " + id);
                    let filteredUsers = users.filter(user => {
                       return user.id === id;
                    });
                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        console.log("user is " + user.id + user.name);
                        for (let _cart of carts) {
                            showOrders(_cart);
                        }
                        let filteredCart = carts.filter(cart => {
                            return cart.user.id === user.id;
                        });
                        if (filteredCart.length)
                            connection.mockRespond(new Response(new ResponseOptions({status: 200, body: filteredCart[0].cart})));
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