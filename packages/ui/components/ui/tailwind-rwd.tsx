export const TailwindRwd = () => {
  return (
    <div className="fixed bottom-2 right-2 z-50 w-20 rounded-lg bg-lime-500 py-2 text-center font-semibold text-slate-950">
      <span className="block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
};
