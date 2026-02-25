"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface PasswordProtectedCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
  password: string;
  bgColor?: string;
}

export default function PasswordProtectedCard({
  href,
  imageSrc,
  imageAlt,
  title,
  meta,
  password,
  bgColor = "bg-surface",
}: PasswordProtectedCardProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showDialog && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showDialog]);

  function handleEnter() {
    if (input === password) {
      router.push(href);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  }

  return (
    <div className="group">
      <div
        className="relative cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <div
          className={`${bgColor} overflow-hidden transition-all duration-300 ${showDialog ? "" : "group-hover:shadow-lg"}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={888}
            height={609}
            className={`w-full h-auto object-cover transition-all duration-300 ${
              showDialog
                ? "opacity-30"
                : "group-hover:scale-[1.02]"
            }`}
            priority
          />
        </div>

        {showDialog && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white shadow-xl flex flex-col"
              style={{
                borderRadius: "clamp(16px, 1.35vw, 26px)",
                padding: "clamp(14px, 1.04vw, 20px)",
                width: "clamp(260px, 20.3vw, 390px)",
              }}
            >
              <div className="flex" style={{ gap: "clamp(4px, 0.31vw, 6px)" }}>
                <div
                  className="flex flex-col shrink-0"
                  style={{ gap: "clamp(4px, 0.31vw, 6px)" }}
                >
                  <p
                    className="font-medium text-black/50"
                    style={{ fontSize: "clamp(10px, 0.68vw, 13px)" }}
                  >
                    Password:
                  </p>
                </div>

                <div
                  className="flex-1 flex flex-col"
                  style={{ gap: "clamp(4px, 0.31vw, 6px)" }}
                >
                  <p
                    className="font-bold text-black/85"
                    style={{ fontSize: "clamp(10px, 0.68vw, 13px)" }}
                  >
                    This case study is password protected.
                  </p>
                  <p
                    className="font-normal text-black/85"
                    style={{ fontSize: "clamp(9px, 0.57vw, 11px)" }}
                  >
                    Type the password or contact me to learn more :)
                  </p>
                  <input
                    ref={inputRef}
                    type="password"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEnter();
                    }}
                    placeholder="Enter password"
                    className={`w-full border bg-white outline-none transition-colors ${
                      error
                        ? "border-red-400 ring-1 ring-red-300"
                        : "border-black/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                    }`}
                    style={{
                      borderRadius: "clamp(4px, 0.31vw, 6px)",
                      padding: "clamp(3px, 0.21vw, 4px) clamp(6px, 0.42vw, 8px)",
                      fontSize: "clamp(10px, 0.68vw, 13px)",
                      height: "clamp(18px, 1.25vw, 24px)",
                    }}
                  />
                </div>
              </div>

              <div
                className="flex items-center justify-between"
                style={{ marginTop: "clamp(10px, 0.83vw, 16px)" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDialog(false);
                    setInput("");
                    setError(false);
                  }}
                  className="font-medium cursor-pointer"
                  style={{
                    fontSize: "clamp(10px, 0.68vw, 13px)",
                    borderRadius: "clamp(4px, 0.31vw, 6px)",
                    padding: "clamp(3px, 0.21vw, 4px) clamp(10px, 0.83vw, 16px)",
                    backgroundColor: "rgba(255,56,60,0.15)",
                    color: "rgb(255,56,60)",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="font-medium text-white cursor-pointer"
                  style={{
                    fontSize: "clamp(10px, 0.68vw, 13px)",
                    borderRadius: "clamp(4px, 0.31vw, 6px)",
                    padding: "clamp(3px, 0.21vw, 4px) clamp(10px, 0.83vw, 16px)",
                    backgroundColor: "rgb(13,111,255)",
                  }}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className="flex items-baseline justify-between"
        style={{
          marginTop: "clamp(6px, 0.52vw, 10px)",
          gap: "clamp(8px, 1vw, 20px)",
        }}
      >
        <p
          className="font-normal text-black leading-snug"
          style={{ fontSize: "var(--text-card)" }}
        >
          {title}
        </p>
        <p
          className="font-normal text-black whitespace-nowrap"
          style={{ fontSize: "var(--text-card)" }}
        >
          {meta}
        </p>
      </div>
    </div>
  );
}
