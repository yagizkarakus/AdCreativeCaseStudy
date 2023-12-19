import { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Make sure to import Tailwind CSS

const ColorSensitiveGenerationComponent = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [hexColor, setHexColor] = useState('');
  const [resultImage, setResultImage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleHexColorChange = (event) => {
    setHexColor(event.target.value);
  };

  const handleGenerateClick = async () => {
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('prompt', prompt);
    formData.append('Hexcolor', hexColor);

    const response = await fetch('https://72d9-178-233-24-227.ngrok-free.app/ColorSensitiveGeneration/', {
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full  p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Color Sensitive Generation</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full py-2 px-3 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Prompt"
          value={prompt}
          onChange={handlePromptChange}
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
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generate
        </button>

        {resultImage && <img src={resultImage} alt="Generated Image" className="mt-4 w-full rounded" />}
      </div>
    </div>
  );
};

export default ColorSensitiveGenerationComponent;
