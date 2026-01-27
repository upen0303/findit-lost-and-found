import PostLost from "./PostLost";
import PostFound from "./PostFound";
import ViewItems from "./ViewItems";

export default function DashboardLogic({ page, setPage }) {
  return (
    <>
      {page === "home" && (
        <div className="space-y-12">
          {/* HERO SECTION */}
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-800">
              Track & Reclaim Your Lost Items!
            </h1>

            <p className="text-gray-500 mt-2 max-w-2xl">
              Easily search for lost and found items or report lost items with FindIt.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setPage("lost")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Post Lost Item
              </button>

              <button
                onClick={() => setPage("found")}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Post Found Item
              </button>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-xl font-semibold mb-6">How It Works</h2>

            <div className="grid grid-cols-4 gap-6">
              <HowCard
                title="Report Items"
                text="Post your lost or found items."
              />
              <HowCard
                title="Smart Matching"
                text="Get matched with similar reports."
              />
              <HowCard
                title="Admin Verified"
                text="Admin reviews for authenticity."
              />
              <HowCard
                title="Messages"
                text="Chat directly to resolve claims."
              />
            </div>
          </div>
        </div>
      )}

      {page === "lost" && <PostLost />}
      {page === "found" && <PostFound />}
      {page === "view" && <ViewItems />}
    </>
  );
}

function HowCard({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{text}</p>
    </div>
  );
}
