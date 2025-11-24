"use client";

import React, { useState } from "react";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 p-3 shadow-lg">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-dark-900/60">
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-dark-900/80 backdrop-blur">
            <div className="flex flex-col items-center gap-3 text-light-200">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-light-200/60 border-t-transparent" />
              <p className="text-sm uppercase tracking-[0.2em] text-light-200/80"></p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-xl bg-red-900/40 px-6 text-center text-red-100 backdrop-blur">
            <p className="text-base font-semibold"></p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full border border-red-200/40 px-4 py-2 text-sm font-medium text-red-50 transition hover:border-red-200 hover:bg-red-200/10"
            ></button>
          </div>
        ) : (
          <video
            key={reloadKey}
            src={videoUrl}
            controls
            playsInline
            className="h-full w-full object-cover"
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default BookVideo;
