export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="layout-demo">{children}</section>;
}
