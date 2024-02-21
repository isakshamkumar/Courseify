const StudySpinner = () => (
    <div className="flex items-center justify-center animate-spin">
      <div className="h-8 w-8">
        {/* Book Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-full w-full text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16l8-8-8-8z" />
        </svg>
      </div>
    </div>
  );
  
  export default StudySpinner;
  