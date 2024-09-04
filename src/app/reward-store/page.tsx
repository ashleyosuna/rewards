import Reward from "@/components/Reward";

export default function Page() {
  const rewards = [
    { title: "Coffee", price: 5 },
    { title: "Book", price: 20 },
    { title: "Watch a movie", price: 10 },
    { title: "Bake a fall treat", price: 15 },
    { title: "Brunch with friends", price: 30 },
  ];
  return (
    <>
      <Reward />
    </>
  );
}
