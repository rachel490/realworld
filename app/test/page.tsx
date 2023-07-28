import Link from "next/link";
import React from "react";

const example = ["abs1", "dodo 124", "happy birthday !!#!", 'code ^""', "duo🩷🩷🩷"];

function TestMainPage() {
  return (
    <div>
      {example.map(item => (
        <Link key={item} href={`/test/${encodeURIComponent(item)}`}>
          {item}
        </Link>
      ))}
    </div>
  );
}

export default TestMainPage;
