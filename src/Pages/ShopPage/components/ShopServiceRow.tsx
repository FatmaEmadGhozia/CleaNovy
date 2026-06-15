import type { ShopService } from "../shopApi";
import { H } from "../shopHelpers";

interface Props {
  service: ShopService;
  qty: number;
  isFast: boolean;
  onInc: () => void;
  onDec: () => void;
  onFastToggle: (val: boolean) => void;
}

export default function ShopServiceRow({ service, qty, isFast, onInc, onDec, onFastToggle }: Props) {
  const icon = service.image ? (
    <img
      src={service.image}
      alt={service.name}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  ) : (
    H.iconFor(service.name)
  );

  return (
    <tr id={`row-${service._id}`}>
      <td>
        <div className="nv-svc-cell">
          <div className="nv-svc-icon">{icon}</div>
          <div>
            <div className="nv-svc-name">{service.name}</div>
            <div className="nv-svc-unit">{H.unitLabel(service.unit)}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="nv-price-val">{H.fmtPrice(service.price)}</div>
        {service.fast_service && (
          <div className="nv-price-fast">سريع: {H.fmtPrice(service.price * (service.fast_multiplier || 1))}</div>
        )}
      </td>
      <td>
        <div className="nv-qty-cell">
          <button className={`nv-qty-btn${qty > 0 ? " has-qty" : ""}`} onClick={onInc}>+</button>
          <span className="nv-qty-val">{H.fmtQty(qty)}</span>
          <button className={`nv-qty-btn${qty > 0 ? " has-qty" : ""}`} onClick={onDec}>−</button>
        </div>
      </td>
      <td className="nv-switch-cell">
        <label className="nv-switch">
          <input
            type="checkbox"
            checked={isFast}
            disabled={!service.fast_service}
            onChange={(e) => onFastToggle(e.target.checked)}
          />
          <span className="nv-slider" />
        </label>
      </td>
    </tr>
  );
}
