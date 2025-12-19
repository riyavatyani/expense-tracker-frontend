import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Image / Placeholder */}
      <div className="relative w-24 h-24">
        {!previewUrl ? (
          <div
            onClick={() => inputRef.current.click()}
            className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-300 transition"
          >
            <LuUser size={36} className="text-slate-500" />
          </div>
        ) : (
          <img
            src={previewUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}

        {/* Remove Button */}
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full"
          >
            <LuTrash size={14} />
          </button>
        )}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
      >
        <LuUpload size={18} />
        Upload photo
      </button>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoSelector;
