"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  ListOrdered,
  Scale,
  MapPinned,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { site } from "@/lib/site";

/* Header chrome runs a step below body copy. The page's base is 18px, so
   inheriting text-base here made the bar feel cramped and shouty — chrome
   sits at 16px/20px with the bar itself given room to breathe. */
const HEADER_H = 80;

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

/** Real sections of this site — not placeholder product links. */
const howItWorksLinks: LinkItem[] = [
  {
    title: "Our Four-Step Process",
    href: "/#process",
    description: "Research, written offer, agreement, title company closing",
    icon: ListOrdered,
  },
  {
    title: "The Honest Math",
    href: "/#math",
    description: "What an agent costs you versus selling direct",
    icon: Scale,
  },
  {
    title: "What We Buy",
    href: "/#what-we-buy",
    description: "Inherited, landlocked, back taxes, all 50 states",
    icon: MapPinned,
  },
  {
    title: "Questions Owners Ask",
    href: "/#faq",
    description: "Is this legitimate, how you price, fees, timelines",
    icon: HelpCircle,
  },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(80);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Transparent over the dark video hero; solid + blurred once scrolled.
  const overlay = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        overlay
          ? "on-dark border-transparent bg-transparent"
          : // Fully opaque. Any translucency let the dark sections bleed
            // through and washed out the ink text as they scrolled past —
            // legibility beats the frosted-glass effect for this audience.
            "border-border bg-paper"
      )}
      style={{ height: HEADER_H }}
    >
      <nav className="container flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "font-caslon text-[1.111rem] font-bold leading-none tracking-[-0.01em] whitespace-nowrap",
              overlay ? "text-paper" : "text-ink"
            )}
          >
            Atlas Equity Group
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent",
                    overlay && "text-paper hover:text-accent-foreground"
                  )}
                >
                  How It Works
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="grid w-[34rem] grid-cols-2 gap-2 rounded-card bg-popover p-2">
                    {howItWorksLinks.map((item) => (
                      <li key={item.title}>
                        <ListItem
                          {...item}
                          inMenu
                          onNavigate={() => setOpen(false)}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="px-3 py-2">
                    <p className="text-sm text-muted-foreground">
                      Received a letter from us?{" "}
                      <Link
                        href="/get-offer"
                        className="font-medium text-foreground hover:underline"
                      >
                        Start here
                      </Link>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/get-offer"
                    className={cn(
                      "inline-flex h-10 items-center rounded-btn px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      overlay ? "text-paper" : "text-ink"
                    )}
                  >
                    Get Your Offer
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          {/* The phone never hides — primary channel for this demographic */}
          <a
            href={site.phoneHref}
            className="flex flex-col items-end gap-0.5 leading-none"
          >
            <span
              className={cn(
                "text-[0.722rem] tracking-[0.06em] uppercase",
                overlay ? "text-[rgb(251_250_247/0.7)]" : "text-ink-soft"
              )}
            >
              Speak to a person
            </span>
            <span
              className={cn(
                "record text-sm font-medium whitespace-nowrap",
                overlay ? "text-paper" : "text-ink"
              )}
            >
              {site.phone}
            </span>
          </a>

          <Button
            asChild
            size="sm"
            className="hidden text-sm md:inline-flex"
          >
            <Link href="/get-offer">Request My Cash Offer</Link>
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden",
              overlay && "border-[rgb(251_250_247/0.4)] text-paper"
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <MobileMenu open={open}>
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="section-index">
              <span>Menu</span>
            </p>
            {howItWorksLinks.map((link) => (
              <ListItem
                key={link.title}
                {...link}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="record block text-center text-lg text-ink underline underline-offset-4"
            >
              {site.phone}
            </a>
            <Button asChild className="w-full">
              <Link href="/get-offer" onClick={() => setOpen(false)}>
                Request My Cash Offer
              </Link>
            </Button>
          </div>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      style={{ top: HEADER_H }}
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-border bg-background lg:hidden"
    >
      <div className={cn("size-full p-6", className)} {...props}>
        {children}
      </div>
    </div>,
    document.body
  );
}

function ListItem({
  title,
  description,
  icon: Icon,
  href,
  className,
  onNavigate,
  inMenu = false,
}: LinkItem & {
  className?: string;
  onNavigate?: () => void;
  /**
   * Wrap in NavigationMenuLink. Only valid inside the desktop
   * <NavigationMenu> — that primitive reads menu context, and the mobile
   * drawer is portaled to document.body, outside the provider. Rendering it
   * there throws "`FocusGroupItem` must be used within `NavigationMenu`".
   */
  inMenu?: boolean;
}) {
  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex w-full flex-row gap-x-3 rounded-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none",
        className
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-card border border-border bg-background">
        <Icon className="size-5 text-field-green" strokeWidth={1.5} />
      </span>
      <span className="flex flex-col items-start justify-center">
        <span className="font-sans font-semibold text-ink">{title}</span>
        {description ? (
          <span className="text-sm text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </Link>
  );

  if (!inMenu) return link;

  return <NavigationMenuLink asChild>{link}</NavigationMenuLink>;
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}
