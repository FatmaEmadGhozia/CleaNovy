import { useState, useRef, useEffect } from "react"
import { useProvider } from "../context/ProviderContext"
import type { Page } from "../types"
import { ORDER_STATUS_LABELS } from "../types"

const pageTitles: Record<Page, string> = {
  dashboard: "البحث عن أي شيء...",
  orders: "البحث عن رقم طلب أو اسم عميل...",
  services: "البحث عن خدمة أو سعر...",
  discounts: "بحث عن الفئات أو العروض...",
  profile: "البحث في الملف الشخصي...",
}

interface SearchResult {
  type: "order" | "service" | "category"
  label: string
  sub: string
  page: Page
}

interface Props {
  page: Page
  setPage: (p: Page) => void
}

export default function TopBar({ page, setPage }: Props) {
  const {
    profile,
    setNotificationsOpen,
    unreadCount,
    searchQuery,
    setSearchQuery,
    orders,
    services,
    categories,
    showToast,
  } = useProvider()

  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const getResults = (): SearchResult[] => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []

    const results: SearchResult[] = []

    orders.forEach((o) => {
      if (
        o.customerName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.items.toLowerCase().includes(q)
      ) {
        results.push({
          type: "order",
          label: `${o.customerName} — ${o.id}`,
          sub: `${ORDER_STATUS_LABELS[o.status]} • ${o.price} ر.س`,
          page: "orders",
        })
      }
    })

    services.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.price.includes(q)) {
        results.push({
          type: "service",
          label: s.name,
          sub: `${s.price} ر.س • ${s.duration}`,
          page: "services",
        })
      }
    })

    categories.forEach((c) => {
      if (c.label.toLowerCase().includes(q)) {
        results.push({
          type: "category",
          label: c.label,
          sub: `${c.count} خدمة`,
          page: "services",
        })
      }
    })

    return results.slice(0, 8)
  }

  const results = getResults()

  const handleSelect = (result: SearchResult) => {
    setPage(result.page)
    setShowResults(false)
    showToast(`تم العثور على: ${result.label}`, "info")
  }

  const typeIcons = {
    order: "local_laundry_service",
    service: "dry_cleaning",
    category: "category",
  }

  return (
    <header className="sticky top-0 z-40 flex w-full flex-row-reverse items-center justify-between bg-white/85 px-8 py-4 shadow-sm backdrop-blur-md">
      {/* Profile + Notifications */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative p-2 text-slate-500 transition-colors hover:text-[#006B5D]"
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setPage("profile")}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="text-right">
            <p className="text-sm font-bold text-[#0D1F3C]">{profile.name}</p>
            <p className="text-xs text-slate-500">{profile.role}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00C9B1] bg-[#006B5D]/20">
            <span
              className="material-symbols-outlined text-[#00C9B1]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="ml-8 max-w-lg flex-1" ref={searchRef}>
        <div className="relative">
          <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-xl text-slate-400">
            search
          </span>
          <input
            className="w-full rounded-full border-none bg-[#EFF4FA] py-2.5 pr-10 pl-10 text-sm transition-all outline-none focus:ring-2 focus:ring-[#006B5D]/20"
            placeholder={pageTitles[page]}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowResults(true)
            }}
            onFocus={() => setShowResults(true)}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("")
                setShowResults(false)
              }}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 hover:text-[#0D1F3C]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}

          {showResults && searchQuery.trim() && (
            <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[#E4E9EF] bg-white shadow-xl">
              {results.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-400">
                  لا توجد نتائج لـ "{searchQuery}"
                </div>
              ) : (
                <div className="divide-y divide-[#E4E9EF]">
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(r)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-right transition-colors hover:bg-[#EFF4FA]/50"
                    >
                      <span className="material-symbols-outlined text-lg text-[#006B5D]">
                        {typeIcons[r.type]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#0D1F3C]">
                          {r.label}
                        </p>
                        <p className="text-xs text-slate-400">{r.sub}</p>
                      </div>
                      <span className="material-symbols-outlined text-sm text-slate-300">
                        chevron_left
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
