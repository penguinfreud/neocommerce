/**
 * Created by 11206 on 2017/5/28.
 */
import { Order } from './order';

export class ShopOrder {
    shop: string;
    orders: Order[];
}

export class Cart {
    shopOrders: ShopOrder[];
}