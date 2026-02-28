import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold text-rose-500">404</h1>
      <div className="mb-6 text-center text-xl">
        Oops! The Page you are looking for does not exist
      </div>
      <Link
        to={ROUTES.DASHBOARD}
        className="rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-400"
      >
        Go Home
      </Link>
    </div>
  );
};
