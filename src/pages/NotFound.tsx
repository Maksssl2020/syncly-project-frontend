import Page from "../animation/Page";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Compass,
  Home,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page className={"min-h-screen flex items-center justify-center p-4"}>
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div
            className="text-9xl font-bold opacity-20 tracking-wider"
            style={{ color: "var(--color-teal-100)" }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-teal-100)" }}
              >
                <Search
                  className="w-12 h-12"
                  style={{ color: "var(--color-black-400)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white-100">
            Ups! Strona nie została znaleziona
          </h1>
          <p className="text-xl text-gray-300">
            Strona, której szukasz, mogła zostać przeniesiona, usunięta lub po
            prostu nie istnieje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full h-16 flex items-center gap-3 px-4 py-3 border rounded-lg transition-colors hover:bg-teal-500/10"
            style={{
              borderColor: "var(--color-teal-100)",
              color: "var(--color-teal-100)",
            }}
          >
            <Home className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">Wróć do Dashboard</div>
              <div className="text-sm opacity-70">Twoja główna strona</div>
            </div>
          </button>
          <Link to="/">
            <button
              className="w-full h-16 flex items-center gap-3 px-4 py-3 border rounded-lg transition-colors hover:bg-cyan-500/10"
              style={{
                borderColor: "var(--color-cyan-100)",
                color: "var(--color-cyan-100)",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Strona Główna</div>
                <div className="text-sm opacity-70">Powrót do początku</div>
              </div>
            </button>
          </Link>
        </div>

        <div className="bg-gray-500 border border-teal-100 rounded-lg shadow-sm">
          <div className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--color-white-100)" }}
            >
              Popularne miejsca
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button className="w-full text-gray-300 text-left px-4 py-2 text-sm rounded-md hover:bg-gray-700 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Tagi
              </button>
              <button
                className="w-full text-gray-300 text-left px-4 py-2 text-sm rounded-md hover:bg-gray-700 flex items-center gap-2"
                style={{ color: "var(--color-gray-300)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Mój Blog
              </button>
              <button
                className="w-full text-gray-300 text-left px-4 py-2 text-sm rounded-md hover:bg-gray-700 flex items-center gap-2"
                style={{ color: "var(--color-gray-300)" }}
              >
                <Users className="w-4 h-4" />
                Zapisane
              </button>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>
            Jeśli problem się powtarza, skontaktuj się z nami przez{" "}
            <button
              onClick={() => navigate("/settings")}
              className="underline hover:no-underline text-teal-100 cursor-pointer"
            >
              ustawienia
            </button>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
