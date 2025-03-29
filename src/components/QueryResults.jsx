import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const QueryResults = () => {
  const { result, loading, error } = useSelector((state) => state.query);

  if (loading) 
    return <div className="p-4 text-blue-500 animate-pulse">🔄 Fetching results...</div>;
  
  if (error) 
    return <div className="p-4 text-red-500">⚠️ {error}</div>;
  
  if (!result) 
    return <div className="p-4 text-gray-500">⏳ Submit a query to see results.</div>;

  
  const chartData = result.values.map((value, index) => ({
    name: `Point ${index + 1}`, 
    value
  }));

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">{result.title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QueryResults;
