import RoutesApp from "@/routes/RoutesApp";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="">
        <RoutesApp />
      </main>
      <Footer/>
    </div>
  );
}