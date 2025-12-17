import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../features/shopping-cart/CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 5.0;
  const taxes = parseFloat((subtotal * 0.083).toFixed(2));
  const orderTotal = parseFloat((subtotal + shipping + taxes).toFixed(2));

  if (items.length === 0) {
    return (
      <main className="w-full grow">
        <div className="container mx-auto px-4 py-8 md:py-16">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <p className="text-black text-3xl md:text-4xl font-black tracking-tight">
                Shopping Cart
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal">
                Your cart is empty
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <p className="text-gray-500 text-base sm:text-lg mb-6">
                Add some items to get started
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg h-10 sm:h-12 px-4 sm:px-6 bg-indigo-600 text-white font-bold text-sm sm:text-base hover:bg-indigo-700 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full grow">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-gray-900 text-3xl md:text-4xl font-black tracking-tight">
              Shopping Cart
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal">
              You have {items.length} item{items.length !== 1 ? "s" : ""} in
              your cart. Review and proceed to checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Cart Items List (Left Column) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 bg-background-light dark:bg-background-dark shadow-sm overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row gap-4 p-4 justify-between ${
                    index !== items.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    {/* Product Image */}
                    {item.image ? (
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-24 shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg size-24 shrink-0 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          No image
                        </span>
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-center gap-1 min-w-0">
                      <p className="text-gray-900 text-base font-medium truncate">
                        {item.name}
                      </p>

                      <p className="text-gray-900 text-base font-semibold sm:hidden">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-indigo-500 text-sm font-medium mt-1 w-fit"
                      >
                        <span className="material-symbols-outlined text-base text-indigo-500">
                          delete
                        </span>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0">
                    <p className="text-gray-900 text-lg font-semibold hidden sm:block">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 text-gray-900">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-400 cursor-pointer"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="text-base font-medium w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-base font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-400 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-background-light dark:bg-background-dark shadow-sm p-6 flex flex-col gap-6 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

              <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between text-gray-900  items-center">
                  <span>Subtotal</span>
                  <span className="font-medium  dark:text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-900  items-center">
                  <span>Shipping</span>
                  <span className="font-medium dark:text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-900  items-center">
                  <span>Taxes</span>
                  <span className="font-medium dark:text-gray-900">
                    ${taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900">Order Total</span>
                <span className="font-bold text-xl text-gray-900">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-indigo-600 text-white gap-2 text-base font-bold leading-normal tracking-wide hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="flex w-full cursor-pointer items-center justify-center gap-2 text-indigo-600 text-sm font-medium"
              >
                <span className="material-symbols-outlined text-base">
                  arrow_back
                </span>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
