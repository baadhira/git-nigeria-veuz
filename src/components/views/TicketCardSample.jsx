import { CheckCircle, XCircle } from "lucide-react"; // or use your own icons
import clsx from "clsx";

const TicketCardSample = ({
  title = "VISITOR 3 DAY ACCESS TICKET",
  price = "FREE",
  vat = "INCL. 19% VAT",
  features = [],
  exclusive = false,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-green-800 to-black text-white rounded-xl shadow-xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4 max-w-sm w-full">
      
      {/* Exclusive Ribbon */}
      {exclusive && (
        <div className="absolute top-0 left-0 bg-green-500 text-xs font-bold px-3 py-1 rounded-br-lg">
          EXCLUSIVE
        </div>
      )}

      {/* Title */}
      <div className="text-sm text-green-200 uppercase font-semibold">
        {title}
      </div>

      {/* View Details */}
      <div className="text-xs text-green-400 underline">
        VIEW DETAILS →
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2 text-sm">
        {features.map((item, idx) => (
          <li
            key={idx}
            className={clsx(
              "flex items-center gap-2",
              item.active ? "opacity-100" : "opacity-50 line-through"
            )}
          >
            {item.active ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto pt-2">
        <div className="text-sm">
          <div className="font-bold text-white">{price}</div>
          <div className="text-xs text-gray-300">{vat}</div>
        </div>
        <button className="bg-white text-black font-bold text-xs px-4 py-2 rounded shadow hover:bg-gray-200 transition">
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default TicketCardSample;
