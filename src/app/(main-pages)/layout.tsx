import Menu from "@/components/Menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Menu />
      {children}
    </div>
  );
}
