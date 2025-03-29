import QueryInput from "./components/QueryInput";
import QueryHistory from "./components/QueryHistory";
import QueryResults from "./components/QueryResults";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Gen AI Data Query Dashboard</h1>
      <div className="w-full max-w-2xl mt-4 space-y-4">
        <QueryInput />
        <QueryHistory />
        <QueryResults />
      </div>
    </div>
  );
}

export default App;

