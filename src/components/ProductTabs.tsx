import { useState } from 'react';
import { Star } from 'lucide-react';

interface Props {
  description: string;
}

type TabType = 'description' | 'reviews' | 'specifications';

const ProductTabs = ({ description }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'specifications', label: 'Specifications' },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`py-4 px-2 font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-base">
              {description}
            </p>
            <div className="mt-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Experience unparalleled sophistication with our premium product. Tailored to perfection,
                this item is crafted from high-quality materials that offer both durability and a luxurious feel.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're looking for everyday elegance or special occasion style, this product provides
                timeless design and exceptional comfort that complements any wardrobe perfectly.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-200 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5 days ago</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Great Product!</h4>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely love this! The quality is exceptional and it fits perfectly.
                  Highly recommend to anyone looking for premium quality.
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Material</span>
                <span className="font-medium text-gray-900">Premium Quality</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Weight</span>
                <span className="font-medium text-gray-900">Standard</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Dimensions</span>
                <span className="font-medium text-gray-900">Standard Fit</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Care Instructions</span>
                <span className="font-medium text-gray-900">Machine Washable</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Origin</span>
                <span className="font-medium text-gray-900">Imported</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Warranty</span>
                <span className="font-medium text-gray-900">1 Year</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
