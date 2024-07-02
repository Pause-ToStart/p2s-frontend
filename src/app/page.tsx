import React from "react";
import ViewSchedule from "./schedule/page";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-between p-24">
        <p>PAUSE TO START</p>
        <Link href="/schedule">View Schedule</Link>
      </div>
  );
}
