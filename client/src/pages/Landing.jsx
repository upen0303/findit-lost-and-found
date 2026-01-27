export default function Landing({ onLoginClick, onRegisterClick }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        FindIt
      </h1>

      <p className="text-gray-600 text-center max-w-xl mb-8">
        A smart lost & found system to help people recover their belongings easily.
      </p>

      <div className="flex gap-4">
        <button 
          onClick={onLoginClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <button 
          onClick={onRegisterClick}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
        >
          Register
        </button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
        <Feature title="Report Items" text="Post lost or found items with images." />
        <Feature title="Smart Matching" text="Find possible matches automatically." />
        <Feature title="Admin Verified" text="Reports are verified by admins." />
      </div>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
