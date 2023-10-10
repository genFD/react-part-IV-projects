import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const className =
    "inline-block text-sm rounded-full bg-yellow-400 px-3 py-4 font-semibold uppercase tracking-wide text-stone-800 transition-colors  duration-300  hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors  duration-300  hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const styles = {
    primary: base + " md:px-6 md:py-4 px-3 py-4",
    small: base + " px-4 py-4 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block border-2 text-xs border-stone-300 rounded-full bg-stone-100 px-3 py-4 font-semibold uppercase tracking-wide text-stone-400 transition-colors  duration-300  hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4 px-4 py-2.5 md:px-5 md:py-3.5 text-xs",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button type={type} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
