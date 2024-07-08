export default function ErrorPage({ handleError }) {
  return (
    <div className="text-center mt-16">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button
        className="rounded bg-blue-900 px-5 py-1 mt-5 hover:shadow hover:shadow-stone-300 hover:bg-blue-600 transition disabled:opacity-50"
        onClick={handleError}
      >
        Return
      </button>
    </div>
  );
}
