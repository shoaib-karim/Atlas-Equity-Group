"use client";

import * as React from "react";

import { useMeasure } from "@uidotdev/usehooks";
import { VariantProps, cva } from "class-variance-authority";
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

// Stacks on mobile (number block above) so the copy gets the card's full
// width; becomes a side-by-side row from md up.
const processCardVariants = cva("flex flex-col md:flex-row border", {
  variants: {
    variant: {
      // Atlas palette. The original indigo gradient variant is replaced —
      // gradients are the template tell this brand explicitly avoids.
      ink: "border-[rgb(251_250_247/0.22)] bg-[rgb(20_39_59/0.82)] text-paper backdrop-blur-lg",
      paper: "border-plat-line bg-paper-raised text-ink shadow-card",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "ink",
    size: "md",
  },
});

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ProcessCardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number;
  index: number;
  /**
   * How much of each previous card stays visible once this one settles, in px.
   * The settled left edge of card `i` is exactly `i * peek`, so the whole deck
   * occupies `(itemsLength - 1) * peek + cardWidth`. Keep that under the
   * container width or the last cards fall off-screen — which is why this is
   * driven responsively by the caller rather than hard-coded at 64.
   */
  peek?: number;
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    );
  }
  return context;
}

/**
 * SSR-safe viewport width.
 *
 * The upstream component read `window.innerWidth` directly during render,
 * which throws during Next's server prerender of client components. It also
 * never updated on resize. This reads after mount and tracks resize.
 */
function useViewportWidth() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

/** Derived rather than imported so we don't depend on a named export. */
type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

export const ContainerScroll = ({
  children,
  className,
  offset,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement> & { offset?: ScrollOffset }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    // Default starts progress when the container's top meets the viewport top.
    // Callers that pin below a sticky header pass their own so progress begins
    // exactly at the pin instead of after a dead zone.
    offset: offset ?? ["start start", "end end"],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
));
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-8 p-6", className)}
    {...props}
  />
));
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  peek = 64,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const [ref, { width }] = useMeasure();
  const viewportWidth = useViewportWidth();

  /**
   * Card 0 never moves, so only `itemsLength - 1` cards animate. Splitting the
   * range across those movers means the first one starts at progress 0 — the
   * moment the section pins — instead of idling until 1/itemsLength.
   */
  const movers = Math.max(itemsLength - 1, 1);
  const start = index > 0 ? (index - 1) / movers : 0;
  const end = index > 0 ? index / movers : 1;

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [viewportWidth, -index * ((width ?? 0) - peek)]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
ProcessCard.displayName = "ProcessCard";
