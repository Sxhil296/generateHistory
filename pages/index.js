import { useState } from 'react';
import Form from '../components/Form';
import Result from '../components/Result';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [paragraph, setParagraph] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async (inputValue) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate?input=${inputValue}`);
      const { paragraph, image } = await response.json();
      setParagraph(paragraph);
      setImage(image);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Generate a historical paragraph and image</h1>
      <Form onSubmit={handleSubmit} />
      {isLoading && <p>Loading...</p>}
      {paragraph && image && <Result paragraph={paragraph} image={image} />}
    </div>
  );
}
