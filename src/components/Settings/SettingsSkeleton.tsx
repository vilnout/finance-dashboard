const PreferencesSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton rounded-lg p-5"></div>
        <h3 className="skeleton px-30 py-3"></h3>
      </div>
      <div className="skeleton rounded-lg p-15"></div>
    </div>
  );
};

export const SettingsSkeleton = () => {
  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <div className="skeleton max-w-sm p-5"></div>
        <div className="skeleton mt-2 max-w-md p-4"></div>
      </div>
      <PreferencesSkeleton />
      <PreferencesSkeleton />
    </div>
  );
};
