// src/components/directory/RiskBadge.tsx
import React from "react";

interface RiskBadgeProps {
    risk: "High" | "Medium" | "Low";
}

export const RiskBadge = ({ risk }: RiskBadgeProps) => {
    const styles = {
        High: "bg-red-600 text-white",
        Medium: "bg-yellow-500 text-black",
        Low: "bg-green-600 text-white",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[risk]}`}>
            {risk} Risk
        </span>
    );
};