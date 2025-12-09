import React from "react";

function Checkout() {
    return (
        <React.Fragment>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-5">
                {/* Left Column: Forms */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Customer Information Card */}
                    <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-soft">
                        <div className="p-6 border-b border-border-light dark:border-border-dark">
                            <h2 className="text-lg font-bold">Customer Information</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="flex flex-col col-span-1">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">First Name</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="John" />
                            </label>
                            <label className="flex flex-col col-span-1">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Last Name</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="Doe" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Email Address</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="john.doe@example.com" type="email" />
                            </label>
                        </div>
                    </div>
                    {/* Shipping Address Card */}
                    <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-soft">
                        <div className="p-6 border-b border-border-light dark:border-border-dark">
                            <h2 className="text-lg font-bold">Shipping Address</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-6 gap-6">
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Country</p>
                                <select className="form-select flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 px-3">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </label>
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Street Address</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="123 Main St" />
                            </label>
                            <label className="flex flex-col sm:col-span-6">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Apartment, suite, etc. <span className="text-text-secondary-light dark:text-text-secondary-dark">(optional)</span></p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="Apt 4B" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">City</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="Anytown" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">State / Province</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="CA" />
                            </label>
                            <label className="flex flex-col sm:col-span-2">
                                <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">ZIP / Postal Code</p>
                                <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="12345" />
                            </label>
                        </div>
                    </div>
                </div>
                {/* Right Column: Order Summary & Payment */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-8">
                        {/* Order Summary Card */}
                        <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-soft">
                            <div className="p-6 border-b border-border-light dark:border-border-dark">
                                <h2 className="text-lg font-bold">Order Summary</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <img className="h-16 w-16 rounded-lg object-cover" data-alt="Red and black modern sneaker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfxrdcVoww2nSh7w5KJ8KzSdmfxWKOGpo_q1yKEPKJsAkj-4ut28tyAvSYFCL6Kumoj4HeYhhUloinM6Saf3UUsCDaLoSeApgXRVeow7UQI0162reezOCghJNGD1HemXdOUQF4AZxBYQ-t7O2Ezs-Ryzde7H5N614TnFFJo8BBsH6A1tVQwBqanAytsFZAOK5uBoLrZt7mB2xPwXxM6vl5fkapLEHtVr5YI121AGg_489PWaQTPPUMAsewuLbAzskzSQM3ksG7JZg" />
                                    <div className="flex-1">
                                        <p className="font-medium">Modern Runner Shoe</p>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: 1</p>
                                    </div>
                                    <p className="font-medium">$120.00</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img className="h-16 w-16 rounded-lg object-cover" data-alt="classNameic silver analog watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ir-3GY0lBp5TYC1DwSr2zSxrpRK002u-AE646RN7cv0jcjYFRrAlwSfcerTiBw6HDq3eWC675shKpKNGKHFEuRCQ9bmpebzFhhUsN-f1S1SHPrAhaR5Fd6cA_j8I4zWUUiCXBnsdRp62UTm6QAB3xehZVk3l3TLIiiwpls1uwfoA9ZMg114B6WUWu2MaxG8CBBP-wH7VuI_NTd6VjmcvOyVMk5VmpCSLYFBG1xGOV4QGPol7gj--6oqDZZ7UC_57AC7wUrZo5no" />
                                    <div className="flex-1">
                                        <p className="font-medium">classNameic Wristwatch</p>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: 1</p>
                                    </div>
                                    <p className="font-medium">$85.50</p>
                                </div>
                            </div>
                            <div className="p-6 border-t border-border-light dark:border-border-dark space-y-3">
                                <div className="flex justify-between text-sm">
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Subtotal</p>
                                    <p>$205.50</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Shipping</p>
                                    <p>$5.00</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Taxes</p>
                                    <p>$16.44</p>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border-light dark:border-border-dark mt-3">
                                    <p>Total</p>
                                    <p>$226.94</p>
                                </div>
                            </div>
                        </div>
                        {/* Payment Card */}
                        <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-soft">
                            <div className="p-6 border-b border-border-light dark:border-border-dark">
                                <h2 className="text-lg font-bold">Payment</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center p-3 border border-primary dark:border-primary rounded-lg bg-primary/10">
                                        <input defaultChecked className="form-radio h-4 w-4 text-primary focus:ring-primary" id="credit-card" name="payment-method" type="radio" />
                                        <label className="ml-3 block text-sm font-medium" htmlFor="credit-card">Credit Card</label>
                                    </div>
                                    <div className="flex items-center p-3 border border-border-light dark:border-border-dark rounded-lg">
                                        <input className="form-radio h-4 w-4 text-primary focus:ring-primary" id="paypal" name="payment-method" type="radio" />
                                        <label className="ml-3 block text-sm font-medium" htmlFor="paypal">PayPal</label>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex flex-col">
                                        <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Card Number</p>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">credit_card</span>
                                            <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark pl-10 pr-3" placeholder="**** **** **** 1234" />
                                        </div>
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">Expiration Date</p>
                                            <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="MM / YY" />
                                        </label>
                                        <label className="flex flex-col">
                                            <p className="text-sm font-medium pb-2 text-text-primary-light dark:text-text-primary-dark">CVC</p>
                                            <input className="form-input flex w-full rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-transparent h-11 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-3" placeholder="123" />
                                        </label>
                                    </div>
                                </div>
                                <button className="w-full h-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white font-bold text-sm hover:bg-primary/90 transition-colors">Pay $226.94</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Checkout;