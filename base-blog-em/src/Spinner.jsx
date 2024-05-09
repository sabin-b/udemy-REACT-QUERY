import { FadeLoader } from "react-spinners";

function Spinner({ loading }) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <FadeLoader
      color="#000"
      loading={loading}
      cssOverride={override}
      size={500}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Spinner;
