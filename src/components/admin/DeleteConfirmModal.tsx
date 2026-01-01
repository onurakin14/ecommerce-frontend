import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteProduct, type Product } from "../../store/productSlice";

type DeleteModalProps = { product?: Product | null; onClose: () => void; }

function DeleteConfirmModal({ product, onClose }: DeleteModalProps) {

    const dispatch = useAppDispatch();

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(product?.id || 0)).then(res => {
            console.log(res.payload); onClose();
        }).catch(err => console.error(err));
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-center h-full">
                {/* Dialog Overlay */}
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"></div>
                {/* Dialog Modal */}
                <div aria-describedby="modal-description" aria-labelledby="modal-title" aria-modal="true" className="relative z-50 w-full max-w-[480px] scale-100 transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all border border-slate-200" role="alertdialog">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        {/* Warning Icon Circle */}
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <span aria-hidden="true" className="material-symbols-outlined icon-filled text-red-500 text-2xl">warning</span>
                        </div>
                        {/* Text Content */}
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                            <h3 className="text-xl font-bold leading-6 text-slate-900" id="modal-title">Delete Product</h3>
                            <div className="mt-2">
                                <p className="text-sm text-slate-500" id="modal-description">
                                    Are you sure you want to delete this product? This action cannot be undone and will remove the item from your inventory permanently.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        {/* Secondary Action (Cancel) */}
                        <button onClick={onClose} className="inline-flex w-full justify-center items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400" type="button">
                            Cancel
                        </button>
                        {/* Primary Action (Delete) */}
                        <button onClick={() => handleDeleteProduct()} className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:w-auto transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" type="button">
                            <span className="material-symbols-outlined text-[1.125rem]">delete</span>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DeleteConfirmModal;