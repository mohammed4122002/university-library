"use client";

import { useState } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitUploadNetworkError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
} from "@imagekit/next";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  accept?: string;               // أنواع الملفات المسموحة
  folder?: string;               // مجلد التخزين في ImageKit
  onFileChange?: (url: string) => void; // تمرير رابط الملف بعد الرفع
};

export default function FileUpload({
  accept = "image/*",
  folder = "/uploads",
  onFileChange,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const abortController = new AbortController();

  // 🔐 استدعاء API السيرفر للحصول على بيانات التوثيق المؤقتة
  const getAuth = async () => {
    const res = await fetch("/api/imagekit");
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<{
      token: string;
      expire: number | string;
      signature: string;
      publicKey: string;
    }>;
  };

  // ⚡ زر واحد: يفتح نافذة اختيار ملف ثم يرفع مباشرة
  const handleClick = async () => {
    // إنشاء input خفي ديناميكيًا
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const { token, expire, signature, publicKey } = await getAuth();

        const response = await upload({
          file,
          fileName: file.name,
          token,
          expire,
          signature,
          publicKey,
          folder,
          useUniqueFileName: true,
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          abortSignal: abortController.signal,
        });

        setUrl(response.url);
        onFileChange?.(response.url);
      toast.success("Event has been created")
      } catch (err) {
      toast.error("Event has not been created" ,{ description: (err as Error).message })
      }
    };

    // تشغيل نافذة اختيار الملفات
    input.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleClick}
        className="upload-btn"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base">Upload a file</p>
      </button>

      {/* شريط تقدم */}
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-green-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* عرض الصورة بعد الرفع */}
      {url && (
        <div className="mt-3">
          <Image
            src={url}
            alt="Uploaded file"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
