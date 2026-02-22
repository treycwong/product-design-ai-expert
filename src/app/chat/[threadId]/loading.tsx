export default function Loading() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
      {/* 2 pairs of user/assistant skeleton messages */}
      {[1, 2].map((i) => (
        <div key={i} className="space-y-4">
          <div className="flex justify-end">
            <div className="h-10 w-2/3 rounded-lg bg-primary/20"></div>
          </div>
          <div className="flex justify-start">
            <div className="h-32 w-[85%] rounded-lg bg-muted"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
