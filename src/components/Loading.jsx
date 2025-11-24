const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        {/* Text */}
        <p className="mt-3 text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
