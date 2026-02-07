import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AUDIUS_BASE =`${import.meta.env.VITE_AUDIUS_API}`;

const CreateNewReel = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎵 Music states
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const audioRef = useRef(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const navigate = useNavigate();

  /* ---------------- Cleanup Object URLs ---------------- */
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo));
    };
  }, [photos]);

  /* ---------------- Audius API ---------------- */
  const fetchTrendingSongs = async () => {
    const res = await fetch(`${AUDIUS_BASE}/tracks/trending?limit=25`);
    const data = await res.json();
    setSongs(data.data);
  };

  const searchSongs = async (query) => {
    const res = await fetch(
      `${AUDIUS_BASE}/tracks/search?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setSongs(data.data);
  };

  const getStreamUrl = (id) =>
    `${AUDIUS_BASE}/tracks/${id}/stream`;

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  /* ---------------- Music Preview ---------------- */
  const playPreview = (trackId) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(getStreamUrl(trackId));
    audioRef.current.play();
  };

  /* ---------------- Photo Upload ---------------- */
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  /* ---------------- Search Music ---------------- */
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      fetchTrendingSongs();
      return;
    }

    searchSongs(value);
  };

  /* ---------------- Generate Reel ---------------- */
  const handleGenerateReel = async () => {

    // Pause audio after 5 seconds
  if (audioRef.current) {
    audioRef.current.play(); // ensure it is playing
    setTimeout(() => {
      audioRef.current.pause();
    }, 4000); // 4000 ms = 4 seconds
  }

  if (photos.length === 0) {
    alert("Please upload at least one photo");
    return;
  }

  

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("timezone", timezone);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    if (selectedSong) {
      formData.append(
        "music",
        JSON.stringify({
          trackId: selectedSong.id,
          title: selectedSong.title,
          artist: selectedSong.artist,
          previewUrl: getStreamUrl(selectedSong.id),
          artwork: selectedSong.artwork || "",
        })
      );
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/reels/create`,
      formData
    );

    const newReelId = response.data.reel._id;
    navigate(`/reels/${newReelId}`);
  } catch (error) {
    console.error(error);
    alert(
      "Failed to create reel: " +
        (error.response?.data?.message || error.message)
    );
  } finally {
    setLoading(false);
  }
};


  /* ===================== JSX ===================== */
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Create New Reel 🎬</h1>

        {/* ---------------- Reel Title ---------------- */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-semibold mb-4">Reel Title</h2>
          <input
            type="text"
            placeholder="Enter reel title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </section>

        {/* ---------------- Upload Photos ---------------- */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-semibold mb-4">Upload Photos</h2>
          <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />

          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- Music Picker ---------------- */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 relative">
          <h2 className="font-semibold mb-4">Select Music</h2>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full max-w-md px-4 py-2 border rounded-lg text-left"
          >
            {selectedSong
              ? `${selectedSong.title} — ${selectedSong.artist}`
              : "Choose music 🎵"}
          </button>

          {showDropdown && (
            <div className="absolute z-30 mt-2 w-full max-w-md bg-white border rounded-lg shadow-lg">

              <input
                type="text"
                placeholder="Search lofi, chill, edm..."
                value={search}
                onChange={handleSearch}
                className="w-full px-3 py-2 border-b"
              />

              <div className="max-h-64 overflow-y-auto">
                {songs.map((track) => (
                  <div
                    key={track.id}
                    className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      playPreview(track.id);
                      setSelectedSong({
                          id: track.id,
                          title: track.title,
                          artist: track.user.name,
                          artwork: track.artwork?.["150x150"] || "",
                        });

                        
                     
                      setShowDropdown(false);
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium">{track.title}</p>
                      <p className="text-xs text-gray-500">
                        {track.user.name}
                      </p>
                    </div>
                    <span className="text-xs text-blue-600">▶ Preview</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ---------------- Generate ---------------- */}
        <section className="flex justify-end">
          <button
            onClick={handleGenerateReel}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Reel"}
          </button>
        </section>

      </div>
    </div>
  );
};

export default CreateNewReel;
