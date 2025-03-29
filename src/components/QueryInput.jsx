import { useDispatch, useSelector } from "react-redux";
import { setQuery, addQueryToHistory, startProcessing, setResult, setError } from "../store/querySlice";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; 

const QueryInput = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetchAIQuerySuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Mock AI-generated query suggestions + predefined options
  const fetchAIQuerySuggestions = async (input) => {
    const aiGeneratedSuggestions = [
      `What are the latest ${input} trends?`,
      `Compare ${input} performance this year`,
      `How does ${input} impact revenue?`,
      `Show ${input} insights over time`
    ];
    setSuggestions([...["Sales", "Customer", "Revenue"], ...aiGeneratedSuggestions]);
  };

  const handleQuerySubmit = () => {
    if (!query.trim()) return;

    dispatch(addQueryToHistory(query));
    dispatch(startProcessing());

    setTimeout(() => {
      let mockResult = null;

      if (query.toLowerCase().includes("sales")) {
        mockResult = { title: "Sales Data", values: [120, 230, 310, 400] };
      } else if (query.toLowerCase().includes("customer")) {
        mockResult = { title: "Customer Growth", values: [180, 250, 320, 480] };
      } else if (query.toLowerCase().includes("revenue")) {
        mockResult = { title: "Revenue Trends", values: [150, 280, 390, 520] };
      } else {
        dispatch(setError("No relevant data found."));
        return;
      }

      dispatch(setResult(mockResult));
    }, 1500);
  };

  return (
    <div className="p-6 bg-white/80 shadow-lg rounded-xl backdrop-blur-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ask a Business Question</h2>

      <div className="relative">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="E.g., 'Show sales trends'"
        />
        <button 
          onClick={handleQuerySubmit} 
          className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:shadow-lg transition-transform transform hover:scale-[1.02]"
        >
          Submit Query
        </button>
      </div>

      {/* AI Suggestions + Predefined Options */}
      {suggestions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
          className="mt-4 bg-white/80 p-3 rounded-lg shadow-md border border-gray-200"
        >
          <p className="text-gray-600 font-medium">Suggestions:</p>
          <ul className="mt-2 space-y-1">
            {suggestions.map((suggestion, index) => (
              <motion.li 
                key={index} 
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 cursor-pointer hover:text-indigo-600 transition"
                onClick={() => dispatch(setQuery(suggestion))}
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default QueryInput;
