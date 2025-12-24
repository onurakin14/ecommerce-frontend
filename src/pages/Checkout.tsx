import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Checkout() {

    const [user, setUser] = useState<any>(null);
    const [userCart, setUserCart] = useState<any>(null);

    const location = useLocation();
    const items = location.state?.items;

    useEffect(() => {
        const userId = 142;
        axios.get(`https://dummyjson.com/users/${userId}`).then(res => setUser(res.data));
        axios.get(`https://dummyjson.com/users/${userId}/carts`).then(res => setUserCart(res.data.carts[0]));
    }, []);

    return (
        <React.Fragment>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-5 bg-gray-50" >
                {/* Left Column: Forms */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Customer Information Card */}
                    <div className="rounded-xl border border-gray-300 bg-white">
                        <div className="p-6 border-b border-gray-300">
                            <h2 className="text-lg font-bold">Customer Information</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="flex flex-col col-span-1">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">First Name</p>
                                <input defaultValue={user?.firstName} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light px-3" placeholder="John" />
                            </label>
                            <label className="flex flex-col col-span-1">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Last Name</p>
                                <input defaultValue={user?.lastName} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light px-3" placeholder="Doe" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Email Address</p>
                                <input defaultValue={user?.email} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light px-3" placeholder="john.doe@example.com" type="email" />
                            </label>
                        </div>
                    </div>
                    {/* Shipping Address Card */}
                    <div className="rounded-xl border border-gray-300 bg-white">
                        <div className="p-6 border-b border-gray-300">
                            <h2 className="text-lg font-bold">Shipping Address</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-6 gap-6">
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Country</p>
                                <select defaultValue={user?.address.country} className="form-select flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 px-3">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </label>
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Street Address</p>
                                <input defaultValue={user?.address.address} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="123 Main St" />
                            </label>
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Apartment, suite, etc. <span className="text-text-secondary-light dark:text-text-secondary-dark">(optional)</span></p>
                                <input defaultValue={user?.address.stateCode} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="Apt 4B" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">City</p>
                                <input defaultValue={user?.address.city} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="Anytown" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">State / Province</p>
                                <input defaultValue={user?.address.state} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="CA" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">ZIP / Postal Code</p>
                                <input defaultValue={user?.address.postalCode} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="12345" />
                            </label>
                        </div>
                    </div>
                </div>
                {/* Right Column: Order Summary & Payment */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-8">
                        {/* Order Summary Card */}
                        <div className="rounded-xl border border-gray-300 bg-white">
                            <div className="p-6 border-b border-gray-300">
                                <h2 className="text-lg font-bold">Order Summary</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* api cart data */}
                                {userCart?.products.map((item: any) => {
                                    return (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img className="h-16 w-16 rounded-lg object-cover" data-alt="Red and black modern sneaker" src={item.thumbnail} />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">${item.price}</p>
                                        </div>
                                    )
                                })}
                                {/* redux cart data */}
                                {items.map((item: any) => {
                                    return (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img className="h-16 w-16 rounded-lg object-cover" data-alt="Red and black modern sneaker" src={item.image} />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">${item.price}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="p-6 border-t border-gray-300 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Total Products</p>
                                    <p>{userCart?.totalProducts}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Total Quantity</p>
                                    <p>{userCart?.totalQuantity}</p>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300 mt-3">
                                    <p>Total</p>
                                    <p>${userCart?.total}</p>
                                </div>
                            </div>
                        </div>
                        {/* Payment Card */}
                        <div className="rounded-xl border border-gray-300 bg-white">
                            <div className="p-6 border-b border-gray-300">
                                <h2 className="text-lg font-bold">Payment</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                                        <input defaultChecked className="form-radio h-4 w-4 text-primary focus:ring-primary" id="credit-card" name="payment-method" type="radio" />
                                        <label className="ml-3 block text-sm font-medium" htmlFor="credit-card">Credit Card</label>
                                    </div>
                                    <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                                        <input className="form-radio h-4 w-4 text-primary focus:ring-primary" id="paypal" name="payment-method" type="radio" />
                                        <label className="ml-3 block text-sm font-medium" htmlFor="paypal">PayPal</label>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex flex-col">
                                        <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Card Number</p>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">credit_card</span>
                                            <input defaultValue={user?.bank.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark pl-10 pr-3" placeholder="**** **** **** 1234" />
                                        </div>
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Expiration Date</p>
                                            <input defaultValue={user?.bank.cardExpire} className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="MM / YY" />
                                        </label>
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">CVC</p>
                                            <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="479" />
                                        </label>
                                    </div>
                                </div>
                                <button className="w-full h-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white font-bold text-sm hover:bg-primary/90 transition-colors">
                                    <Link to={"/order-success"}>Pay $226.94</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Checkout;