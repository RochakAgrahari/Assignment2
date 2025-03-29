import { useSelector } from "react-redux";

const QueryHistory = () => {
  const history = useSelector((state) => state.query.history);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Query History</h2>
      <ul className="mt-2 max-h-40 overflow-y-auto border-t">
        {history.length === 0 ? (
          <li className="p-2 text-gray-500">No recent queries</li>
        ) : (
          history.map((query, index) => (
            <li key={index} className="p-2 border-b hover:bg-gray-100">
              {query}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default QueryHistory;
