import { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Make sure to import Tailwind CSS

const DynamicAdImageComponent = () => {
  const [imageFile, setImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [punchline, setPunchline] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [hexColor, setHexColor] = useState('');
  const [resultImage, setResultImage] = useState(null);

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleLogoFileChange = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const handlePunchlineChange = (event) => {
    setPunchline(event.target.value);
  };

  const handleCtaTextChange = (event) => {
    setCtaText(event.target.value);
  };

  const handleHexColorChange = (event) => {
    setHexColor(event.target.value);
  };

  const handleGenerateClick = async () => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('logo_file', logoFile);
    formData.append('Punchline', punchline);
    formData.append('ctaText', ctaText);
    formData.append('Hexcolor', hexColor);

    const response = await fetch('https://72d9-178-233-24-227.ngrok-free.app/DynamicAdImage/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      setResultImage(URL.createObjectURL(blob));
    } else {
      // Handle error response
      console.error('Error:', response.status, response.statusText);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full  p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Dynamic Ad Image Generation</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoFileChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Punchline"
          value={punchline}
          onChange={handlePunchlineChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="CTA Text"
          value={ctaText}
          onChange={handleCtaTextChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Hex Color"
          value={hexColor}
          onChange={handleHexColorChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <button
          onClick={handleGenerateClick}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate
        </button>

        {resultImage && <img src={resultImage} alt="Generated Image" className="mt-4 w-full rounded" />}
      </div>
    </div>
  );
};

export default DynamicAdImageComponent;
