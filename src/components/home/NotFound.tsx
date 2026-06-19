import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="tools-index">
      <section className="tools-index-hero neu-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>This page does not exist, or the link may have changed.</p>
        <Link className="hero-link" to="/">
          Back to homepage
        </Link>
      </section>
    </div>
  );
}
