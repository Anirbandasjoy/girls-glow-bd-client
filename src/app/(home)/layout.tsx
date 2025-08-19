import Footer from "@/components/layout/Home/shared/Footer";
import Navbar from "@/components/layout/Home/shared/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F5F5F5] text-[#1A1A1A]">
      <Navbar />
      <div className=" min-h-[50vh]">{children}</div>
      <Footer />
    </div>
  );
}
