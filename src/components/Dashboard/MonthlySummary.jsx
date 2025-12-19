const MonthlySummary = ({ summary, onGenerate }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-medium">Monthly Summary</h5>
        <button onClick={onGenerate} className="card-btn">
          Generate
        </button>
      </div>

      {summary && (
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {summary}
        </p>
      )}
    </div>
  );
};

export default MonthlySummary;
