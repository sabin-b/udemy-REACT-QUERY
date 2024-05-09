import { Posts } from "./Posts";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Spinner from "./Spinner";

function App() {
  const queryClient = new QueryClient();
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
