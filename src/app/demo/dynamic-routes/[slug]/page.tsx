export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>
}

export function generateStaticParams() {
  return [
    { slug: '1' }
  ]
}