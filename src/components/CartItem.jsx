export default function CartItem({ item, updateQty, removeItem, loading }) {
  return (
    <div
      className="
        flex
        gap-5
        pb-8
        border-b
        border-[#f1d4dc]
        group
        "
    >
      {/* IMAGE */}

      <div className="overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.name}
          className="
            w-[80px]
            h-[100px]
            object-contain
            transition
            duration-500
            group-hover:scale-110
            "
        />
      </div>

      <div className="flex-1">
        {/* NAME */}

        <h3
          className="
            text-[14px]
            font-medium
            text-[#2b1b1f]
            leading-snug
            group-hover:text-[#FF76B9]
            transition
            "
        >
          {item.name}
        </h3>

        {/* PRICE */}

        <p className="text-[13px] text-[#FF76B9] mt-1">₹{item.price}</p>

        {/* QUANTITY */}

        <div
          className="
            flex
            items-center
            mt-4
            border
            border-[#f1cfd6]
            rounded-full
            overflow-hidden
            w-fit
            "
        >
          <button
            disabled={loading}
            onClick={() => updateQty(item.id, "dec")}
            className="
            px-4
            py-1
            text-[16px]
            hover:bg-[#fde4ed]
            transition
            cursor-pointer
            "
          >
            −
          </button>

          {/* <span className="px-5 text-[13px]">{item.qty}</span> */}
          <span className="px-5 text-[13px] flex items-center justify-center min-w-[24px]">
            {loading ? (
              <span className="w-3 h-3 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              item.qty
            )}
          </span>

          <button
            disabled={loading}
            onClick={() => updateQty(item.id, "inc")}
            className="
            px-4
            py-1
            text-[16px]
            hover:bg-[#fde4ed]
            transition
            cursor-pointer
            "
          >
            +
          </button>
        </div>

        {/* REMOVE */}

        <button
          onClick={() => removeItem(item.id)}
          className="
            mt-3
            text-[12px]
            text-[#8b6a72]
            hover:text-red-500
            transition
            cursor-pointer
            "
        >
          Remove
        </button>
      </div>
    </div>
  );
}
