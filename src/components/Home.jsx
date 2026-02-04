import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/reels/my`,
      { withCredentials: true }
    );
    
    console.log("Reels API response:", res.data);

    // FIX: Access the 'data' property inside the response object
    // Check if res.data.data exists and is an array, otherwise default to empty array
    const fetchedReels = Array.isArray(res.data.data) ? res.data.data : [];
    setReels(fetchedReels);

  } catch (err) {
    console.error("Failed to fetch reels", err);
    setReels([]); // Set to empty array on error to prevent .slice crash
  } finally {
    setLoading(false);
  }
};

    fetchReels();
  }, []);

  const recentReels = reels.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Hero */}
          <section className="bg-white rounded-xl shadow-sm p-8 mb-10">
            <h2 className="text-3xl font-semibold mb-2">
              Create reels from your photos ✨
            </h2>
            <p className="text-gray-600 mb-6">
              Upload photos, choose a song, and download your reel instantly.
            </p>

            <button
              onClick={() => navigate("/create-reel")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create New Reel
            </button>
          </section>

          {/* Recent Reels */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Recent Reels</h3>

              {reels.length > 3 && (
                <button
                  onClick={() => navigate("/reels")}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View All →
                </button>
              )}
            </div>

            {loading ? (
              <p className="text-gray-500">Loading reels...</p>
            ) : recentReels.length === 0 ? (
              <p className="text-gray-500">No reels created yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {recentReels.map((reel) => (
                  <div
                    key={reel._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/reels/${reel._id}`)}
                  >
                    <video
                      src={reel.videoUrl}
                      className="h-64 w-full object-cover"
                      muted
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}
