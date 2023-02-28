const Result = ({ paragraph, image }) => {
    return (
      <div className="flex flex-col items-center mt-4">
        <img src={image} alt="Generated image" className="max-w-full h-auto mb-4" />
        <p className="max-w-xl text-center">{paragraph}</p>
      </div>
    );
  };
  
  export default Result;
  