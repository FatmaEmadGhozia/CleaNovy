export interface NavLink {
  label: string;
  active: boolean;
}

export interface ServiceMetaItem {
  label: string;
  icon: string;
}

export const NAV_LINKS: NavLink[];

/** Indexed by service key (laundry | iron | dry_cleaning | category | ...) */
export const SERVICE_META: Record<string, ServiceMetaItem>;

export const PRICE_OPTIONS: string[];
