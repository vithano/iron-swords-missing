"use client";
import { Button } from "@/components/ui/button";

export function AddMissing() {
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      formTarget="_blank"
      onClick={() => open("https://forms.gle/AW74r2NLcbZcNYpi6")}
    >
      הוסף נעדר
    </Button>
  );
}
