import React, { useState } from 'react';
import { Upload, Scan, AlertCircle, Camera } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import IngredientAnalysis from './IngredientAnalysis';

const Scanner = () => {
  const { 
    image, 
    analysis, 
    allergens,
    nutritionalInfo,
    loading, 
    error, 
    handleImageUpload 
  } = useImageUpload();

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="get-started" className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Scan Your Product
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a clear image of your product's ingredient list, and we'll help you understand what's inside.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8">
            {/* Upload Section */}
            <div className="mb-8">
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                  dragActive ? 'border-emerald-500' : 'border-gray-600'
                } border-dashed rounded-lg cursor-pointer hover:border-emerald-500 transition-colors relative`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {loading ? (
                    <Scan className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400 mb-4" />
                  )}
                  <p className="text-sm text-gray-400 text-center">
                    <span className="font-semibold">Click to upload</span> or drag and drop<br />
                    <span className="text-xs">Supported formats: JPG, PNG, GIF (max 10MB)</span>
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  disabled={loading}
                />
              </label>
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 justify-center mb-4 p-4 bg-red-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Results */}
            {(analysis.length > 0 || allergens.length > 0) && (
              <div className="mt-8 space-y-6">
                {/* Ingredients Analysis */}
                {analysis.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Ingredients Analysis:</h3>
                    <IngredientAnalysis results={analysis} />
                  </div>
                )}

                {/* Allergens */}
                {allergens.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Allergen Information:</h3>
                    <div className="bg-red-900/50 rounded-lg p-4">
                      <ul className="list-disc list-inside space-y-2">
                        {allergens.map((allergen, index) => (
                          <li key={index} className="text-red-200">{allergen}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Nutritional Information */}
                {nutritionalInfo.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Nutritional Information:</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <ul className="space-y-2">
                        {nutritionalInfo.map((info, index) => (
                          <li key={index} className="text-gray-200">{info}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scanner;