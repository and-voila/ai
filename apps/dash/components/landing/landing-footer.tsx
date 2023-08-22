const LandingFooter = () => {
  return (
    <div className="absolute bottom-0 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-muted pt-12">
      <p className="text-sm text-foreground">
        © {new Date().getFullYear()} And Voila AI, Inc. All rights reserved.
      </p>
    </div>
  );
};

export default LandingFooter;
