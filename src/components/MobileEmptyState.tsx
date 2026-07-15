export default function MobileEmptyState({
  active,
  word,
}: {
  active: "home" | "fun" | "about" | "resume";
  word: string;
}) {
  return (
    <div className="reflective-mobile-page min-h-[calc(100vh-65px)] flex items-center justify-center">
      <p className="reflective-title-fill text-[32px] font-semibold">{word}</p>
    </div>
  );
}
