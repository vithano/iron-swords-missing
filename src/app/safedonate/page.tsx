export default function Page() {
  return (
    <div>
      <div
        className="bg-yellow-400 text-black text-center text-xl font-bold p-4 "
        dir="rtl"
      >
        שימו לב ❤️
        <br />
        פרויקט זה לא מתוחזק על ידי צוות האתר
      </div>
      <iframe
        className="h-screen w-screen"
        src="https://naboo.ai/safedonate"
        style={{ border: "none" }}
      ></iframe>
      ;
    </div>
  );
}
