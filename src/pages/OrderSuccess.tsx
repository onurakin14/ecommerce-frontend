import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <React.Fragment>
            <div className="flex flex-1 items-center justify-center py-12 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
                        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
                                <span className="material-symbols-outlined text-4xl text-primary">task_alt</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thank you for your order!</h1>
                            <p className="mt-3 text-base text-gray-600">Your order has been placed successfully. A confirmation email with your order details has been sent to your inbox.</p>
                            <div className="my-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                <p className="text-sm text-gray-600">Your Order Code</p>
                                <p className="mt-1 text-2xl font-semibold tracking-wider text-gray-800">#123-456-789</p>
                            </div>
                            <button className="inline-flex h-12 w-full max-w-xs cursor-pointer items-center justify-center rounded-xl bg-indigo-500 px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                <Link to={"/products"}>Back to products</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OrderSuccess;