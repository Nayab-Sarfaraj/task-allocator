import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Dashboard
        </h2>

        {/* Brief description of the dashboard */}
        <p className="text-lg text-gray-600 mb-6">
          Manage your agents, upload CSV files, and distribute lists
          efficiently.
        </p>

        {/* Navigation Links to Dashboard Features */}
        <div className="gap-5 flex flex-wrap items-center justify-center">
          {/* Link to Add Agent page */}
          <Link
            to="/add-agent"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Agent
          </Link>

          {/* Link to Upload CSV page */}
          <Link
            to="/upload-csv"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Upload CSV
          </Link>

          {/* Link to View Tasks page */}
          <Link
            to="/tasks"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
