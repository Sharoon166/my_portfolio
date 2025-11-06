export default function Loader() {
  return (
    <div className="min-h-screen flex gap-2 items-center justify-center">
      <div className="size-3 shrink-0 animate-[jump_1.75s_ease-in-out_infinite]">
        <div className="w-full h-full rounded-[25%] bg-destructive origin-bottom animate-[morph_1.75s_ease-in-out_infinite]" />
      </div>
      <div className="size-3 shrink-0 animate-[jump_1.75s_ease-in-out_infinite_-0.63s]">
        <div className="w-full h-full rounded-[25%] bg-destructive origin-bottom animate-[morph_1.75s_ease-in-out_infinite_-0.63s]" />
      </div>
      <div className="size-3 shrink-0 animate-[jump_1.75s_ease-in-out_infinite_-0.35s]">
        <div className="w-full h-full rounded-[25%] bg-destructive origin-bottom animate-[morph_1.75s_ease-in-out_infinite_-0.35s]" />
      </div>
    </div>
  );
}
