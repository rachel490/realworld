"use client";

import { useParams } from "next/navigation";

interface IProps {
  params: {
    slug: string;
  };
  searchParams: {
    tag: string;
  };
}

function TestPage({ params, searchParams }: IProps) {
  const clientParams = useParams();

  return (
    <div>
      TestPage
      <p>SLUG SERVER: {params.slug}</p>
      <p>SLUG CLIENT: {JSON.stringify(clientParams)}</p>
    </div>
  );
}

export default TestPage;
