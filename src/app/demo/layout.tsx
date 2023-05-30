export default function DemoLayout(props: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return <section className="layout-demo">
    {props.children}
    {props.analytics}
    {props.team}
  </section>;
}
