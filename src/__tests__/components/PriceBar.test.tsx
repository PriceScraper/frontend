import { render, screen } from "@testing-library/react";
import PriceBar from "../../components/layout/PriceBar";

test("renders PriceBar", () => {
  const price = 1.79;
  render(
    <PriceBar logoUrl={""} price={price} percentageFilled={20} color={"#000"} />
  );
  expect(screen.getByText("€" + price)).toBeInTheDocument();
});
