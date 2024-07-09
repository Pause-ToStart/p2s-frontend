import React from "react";
import Link from "next/link";
import Form from "../components/Form/Form";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-between p-24">
        <p>PAUSE TO START</p>
        <Form/>
        <Link href="/schedule">View Schedule</Link>
      </div>
  );
}
