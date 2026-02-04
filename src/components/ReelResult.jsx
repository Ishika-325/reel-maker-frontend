import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const getReelById = (id) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/reels/${id}`, {
    withCredentials: true,
  });
};

const ReelResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reel, setReel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReel = useCallback(async () => {
    // 🛑 GUARD: Don't call the API if ID is missing or invalid
    if (!id || id === "undefined") return;

    try {
      const { data } = await getReelById(id);
      setReel(data.reel);
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load reel. It might still be processing.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReel();

    // 🔄 POLLING: If the reel is still processing, check again every 3 seconds
    let interval;
    if (reel && reel.status === "processing") {
      interval = setInterval(() => {
        fetchReel();
      }, 3000);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [id, reel?.status, fetchReel]);

  // 1. Initial Loading State
  if (loading && !reel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-black">
        <div className="text-center">
          <p className="animate-pulse">Generating magic ✨</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error && !reel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 bg-black p-4">
        <p>{error}</p>
        <button 
          onClick={() => navigate("/create-reel")}
          className="mt-4 text-blue-400 underline"
        >
          Try creating a new one
        </button>
      </div>
    );
  }

  // 3. Processing State (Shown when we have reel data but it's not ready)
  if (reel?.status === "processing") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Creating your reel 🎬</p>
        <p className="text-sm text-gray-400 mt-2">FFmpeg is working its magic. Please wait...</p>
      </div>
    );
  }

  // 4. Success State (status === "completed")
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-6 px-4">
      <h1 className="text-white text-xl font-semibold mb-4 text-center">
        {reel?.title}
      </h1>

      <div className="w-full max-w-md aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-gray-900">
        {reel?.videoUrl ? (
          <video
            src={reel.videoUrl}
            controls
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <p>Video is being finalized...</p>
          </div>
        )}
      </div>

      {reel?.music && (
        <div className="mt-4 text-sm text-gray-300 flex items-center gap-2">
          🎵 <span>{reel.music.title}</span>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/create-reel")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Another
        </button>
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ReelResult;