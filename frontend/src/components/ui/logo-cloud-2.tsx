import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div">;

const partners: Logo[] = [
  { src: "https://svgl.app/library/microsoft-azure.svg", alt: "Microsoft Azure" },
  { src: "https://svgl.app/library/aws.svg", alt: "AWS" },
  { src: "https://svgl.app/library/google-cloud.svg", alt: "Google Cloud" },
  { src: "https://svgl.app/library/red-hat.svg", alt: "Red Hat" },
  { src: "https://svgl.app/library/docker.svg", alt: "Docker" },
  { src: "https://svgl.app/library/kubernetes.svg", alt: "Kubernetes" },
  { src: "https://svgl.app/library/linux-foundation.svg", alt: "Linux Foundation" },
  { src: "https://svgl.app/library/ibm.svg", alt: "IBM" },
  { src: "https://svgl.app/library/salesforce.svg", alt: "Salesforce" },
  { src: "https://svgl.app/library/oracle.svg", alt: "Oracle" },
  { src: "https://svgl.app/library/sap.svg", alt: "SAP" },
  { src: "https://svgl.app/library/vmware.svg", alt: "VMware" },
  { src: "https://svgl.app/library/cisco.svg", alt: "Cisco" },
  { src: "https://svgl.app/library/intel.svg", alt: "Intel" },
  { src: "https://svgl.app/library/nvidia.svg", alt: "NVIDIA" },
];

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  const total = partners.length;
  const totalRows = Math.ceil(total / 4);

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
      {...props}
    >
      {/* Full-width top border line */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-screen border-t" />

      {partners.map((partner, index) => {
        const dCol = index % 4;
        const dRow = Math.floor(index / 4);

        return (
          <LogoCard
            key={partner.alt}
            className={cn(
              // Alternating checkerboard background (desktop: 4-col)
              (dRow + dCol) % 2 === 0 &&
                "bg-secondary dark:bg-secondary/30",
              // Right border (desktop: not in 4th column)
              dCol < 3 && "md:border-r",
              // Bottom border (desktop: not in last row)
              dRow < totalRows - 1 && "md:border-b",
              // Right border (mobile: first item in 2-col pair, not the last item alone)
              index % 2 === 0 && index < total - 1 && "border-r",
              // Bottom border (mobile: all except the very last item)
              index < total - 1 && "border-b"
            )}
            logo={partner}
          >
            {/* PlusIcon at col 0-1 boundary intersections (every 2 rows) */}
            {dCol === 0 && dRow % 2 === 0 && dRow < totalRows - 1 && (
              <PlusIcon
                className="absolute -bottom-[12.5px] -right-[12.5px] z-10 size-6 text-[#FF4800]"
                strokeWidth={1}
              />
            )}
            {/* PlusIcon at col 2-3 boundary intersections (every 2 rows) */}
            {dCol === 2 && dRow % 2 === 0 && dRow < totalRows - 1 && (
              <>
                <PlusIcon
                  className="absolute -bottom-[12.5px] -right-[12.5px] z-10 size-6 text-[#FF4800]"
                  strokeWidth={1}
                />
                <PlusIcon
                  className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 text-[#FF4800] md:block"
                  strokeWidth={1}
                />
              </>
            )}
          </LogoCard>
        );
      })}

      {/* Full-width bottom border line */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-screen border-b" />
    </div>
  );
}

export default LogoCloud;

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-center bg-background px-4 py-8 transition-all duration-300 md:p-8",
        "hover:bg-[rgba(255,72,0,0.03)] dark:hover:bg-white/[0.04]",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-5 select-none opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 dark:brightness-0 dark:invert sm:h-5 md:h-6"
        height={24}
        loading="lazy"
        src={logo.src}
        width={120}
      />
      {children}
    </div>
  );
}
