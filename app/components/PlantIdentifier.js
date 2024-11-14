// components/PlantIdentifier.js
'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Upload, Info, Leaf, Droplet } from 'lucide-react';

export default function PlantIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
        identifyPlant(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const captureImage = useCallback(() => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
      setImage(imageDataUrl);
      setShowCamera(false);
      
      // Stop all video streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      identifyPlant(imageDataUrl);
    }
  }, []);

  const identifyPlant = async (imageData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error identifying plant:', error);
      setResult({ error: 'Failed to identify plant. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Plant Identifier</h1>
      <p className="mb-6 text-center text-gray-600">
        Discover the beauty of nature! Upload or capture an image of a plant, and our AI will identify it for you,
        providing interesting facts and care instructions.
      </p>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload a plant image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        <div className="flex-1 flex items-end">
          <button
            onClick={startCamera}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <Camera className="mr-2" size={20} />
            Capture Image
          </button>
        </div>
      </div>

      {showCamera && (
        <div className="mb-6">
          <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm mx-auto" />
          <button
            onClick={captureImage}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mx-auto block"
          >
            Take Photo
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} width={300} height={300} />

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {image && (
          <div className="flex-1">
            <Image src={image} alt="Plant image" width={300} height={300} className="rounded-lg mx-auto" />
          </div>
        )}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-green-600">Identifying plant...</p>
          </div>
        )}
      </div>

      {/* Result section */}
      {result && (
        <div className="mt-6 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">{result.name || 'Identification Failed'}</h2>
          {result.description && <p className="text-gray-700 mb-4">{result.description}</p>}
          {result.error && <p className="text-red-500">{result.error}</p>}
          
          {result.name && !result.error && (
            <table className="w-full mt-4 border-collapse border border-green-200">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-green-200 p-2 text-left">Characteristic</th>
                  <th className="border border-green-200 p-2 text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Scientific Name', key: 'scientificName' },
                  { label: 'Family', key: 'family' },
                  { label: 'Native Region', key: 'nativeRegion' },
                  { label: 'Sunlight Needs', key: 'sunlightNeeds' },
                  { label: 'Watering Frequency', key: 'wateringFrequency' },
                ].map(({ label, key }) => (
                  <tr key={key}>
                    <td className="border border-green-200 p-2 font-medium">{label}</td>
                    <td className="border border-green-200 p-2">{result[key] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}