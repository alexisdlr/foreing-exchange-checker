"use client";
import Image from "next/image";
import { useState } from "react";

type CurrencyFlagProps = {
  iso_code: string;
};

const CurrencyFlag = ({ iso_code }: CurrencyFlagProps) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
      {!error && (
        <Image
          src={`/assets/images/flags/${iso_code.slice(0, 2).toLowerCase()}.webp`}
          alt={iso_code}
          width={18}
          height={18}
          onError={(e) => {
            setError(true);
          }}
        />
      )}
      {error && (
        <div className="w-4.5 h-4.5 rounded-full overflow-hidden bg-neutral-500 flex items-center justify-center">
          <span className="text-preset-4 text-neutral-50 uppercase">
            {iso_code.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default CurrencyFlag;
