import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state for better UX

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reels/my`, {
        withCredentials: true,
      })
      .then((res) => {
        // 🛠️ FIX: Access the 'data' property inside the response object
        // Based on your controller, the array is inside res.data.data
        const fetchedReels = res.data?.data || [];
        setReels(fetchedReels);
      })
      .catch((err) => {
        console.error("Error fetching reels:", err);
        setReels([]); // Fallback to empty array on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">All Your Reels</h2>

          {loading ? (
            <p className="text-gray-500">Loading your collection...</p>
          ) : reels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">You haven't created any reels yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {reels.map((reel) => (
                <div key={reel._id} className="relative group">
                  <video
                    src={reel.videoUrl}
                    controls
                    className="rounded-xl shadow-sm w-full aspect-[9/16] object-cover bg-black"
                  />
                  {/* Optional: Add a title overlay */}
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{reel.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}