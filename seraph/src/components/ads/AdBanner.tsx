import { useEffect } from "react";

const AdBanner = () => {
    useEffect(() => {
        try {
            // @ts-expect-error AdSense injects adsbygoogle globally – TypeScript doesn't know about it
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log("AdSense error:", error);
        }}, );

    return (
        <div>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXX"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdBanner;