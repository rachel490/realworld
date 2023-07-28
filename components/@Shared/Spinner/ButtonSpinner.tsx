import { ThreeDots } from "react-loader-spinner";

function ButtonSpinner() {
  return (
    <ThreeDots
      height="20"
      width="20"
      radius="3"
      color="#1f8774ee"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ padding: "5px  10px" }}
      visible
    />
  );
}

export default ButtonSpinner;
