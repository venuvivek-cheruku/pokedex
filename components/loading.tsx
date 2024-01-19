import Image from "next/image";

interface LoadingIconProps {
  loading: boolean;
}

export default function LoadingIcon({ loading }: LoadingIconProps) {
  return (
    <>
      {loading && (
        <div className="loading-image w-32 relative h-32 mt-20">
          <Image
            src="/static/images/loading.gif"
            style={{ objectFit: "contain" }}
            fill={true}
            priority
            sizes="(max-width: 768px) 8rem 8rem"
            alt={`Loading gif`}
          />
        </div>
      )}
    </>
  );
}
