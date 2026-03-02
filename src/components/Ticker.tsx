const questions = [
  "איך מייצרים חיים פרו-אקטיביים?",
  "איך הופכים שאיפות לתוצאות?",
  "איך הופכים דיבורים, למעשים?",
];

export default function Ticker() {
  return (
    <section className="bg-secondary py-5 border-y border-white/5">
      <div className="flex justify-center gap-6 flex-wrap">
        {questions.map((q, i) => (
          <span
            key={i}
            className="flex items-center text-white/80 text-lg md:text-xl font-medium"
          >
            <span>{q}</span>
            {i < questions.length - 1 && (
              <span className="text-primary mr-6 text-2xl">&#x2022;</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
