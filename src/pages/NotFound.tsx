
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCcw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Change page title
    document.title = "Página não encontrada | Fexol";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-xl mx-auto">
        <div className="mb-8">
          <div className="text-primary-500 font-bold text-9xl">404</div>
          <div className="h-1 w-16 bg-primary-500 mx-auto my-4"></div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          A página "{location.pathname}" não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-primary-500 hover:bg-primary-600 button-transition"
            size="lg"
          >
            <Link to="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
          
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            className="button-transition"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Recarregar a página
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
