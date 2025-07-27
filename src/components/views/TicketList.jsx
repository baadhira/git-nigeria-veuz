import TicketCardSample from "./TicketCardSample";

const features = [
  { label: "Access to Connexions & Investor Lounge", active: true },
  { label: "Network Events", active: true },
  { label: "All Conference Tracks", active: true },
  { label: "All Masterclasses", active: true },
  { label: "3 Days Access to the Show", active: false },
  { label: "Access to Dubai Internet City Lounge", active: false },
];

export default function TicketList() {
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <TicketCardSample features={features} exclusive />
      <TicketCardSample features={features} />
      <TicketCardSample features={features} />
    </div>
  );
}
