export function normalizeColor(value) {
  if (!value) return "#999999";
  return value.startsWith("#") ? value : `#${value}`;
}

export function getTextColor(hex) {
  if (!hex || hex.startsWith("var(")) {
    return "var(--primary-text-color)";
  }

  const clean = hex.replace("#", "");

  if (clean.length !== 6) {
    return "var(--primary-text-color)";
  }

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? "black" : "white";
}

export function getValueTextColor(config, color, percent) {
  const position = config.value_position || "center";

  if (!config.use_filament_color) {
    return "var(--primary-text-color)";
  }

  if (config.bar_direction === "horizontal") {
    if (position === "left" && percent >= 15) return getTextColor(color);
    if (position === "center" && percent >= 50) return getTextColor(color);
    if (position === "right" && percent >= 85) return getTextColor(color);

    return "var(--primary-text-color)";
  }

  if (config.bar_direction === "vertical") {
    if (position === "bottom" && percent >= 15) return getTextColor(color);
    if (position === "center" && percent >= 50) return getTextColor(color);
    if (position === "top" && percent >= 85) return getTextColor(color);

    return "var(--primary-text-color)";
  }

  return "var(--primary-text-color)";
}

export function getFillStyle(config, percent, color) {
  if (config.bar_direction === "horizontal") {
    return `width:${percent}%; background:${color};`;
  }

  return `height:${percent}%; background:${color};`;
}

export function getGroupValue(config, item) {
  const attr = item.state.attributes;

  if (config.group_by === "color") {
    return attr.filament_name || attr.filament_color_hex || "unknown";
  }

  if (config.group_by === "material") {
    return attr.filament_material || "unknown";
  }

  if (config.group_by === "vendor") {
    return attr.filament_vendor_name || "unknown";
  }

  return "all";
}

export function compareItems(config, a, b) {
  const attr = config.sort_by;
  const direction = config.sort_direction === "desc" ? -1 : 1;

  const av = a.state.attributes[attr] ?? a.state.state ?? "";
  const bv = b.state.attributes[attr] ?? b.state.state ?? "";

  const an = Number(av);
  const bn = Number(bv);

  if (!Number.isNaN(an) && !Number.isNaN(bn)) {
    return (an - bn) * direction;
  }

  return String(av).localeCompare(String(bv), undefined, { numeric: true }) * direction;
}

export function compareGroups(config, a, b, items) {
  const direction = config.group_sort_direction === "desc" ? -1 : 1;

  const aItems = items.filter(item => getGroupValue(config, item) === a);
  const bItems = items.filter(item => getGroupValue(config, item) === b);

  switch (config.group_sort_by) {
    case "total_remaining_weight": {
      const av = aItems.reduce((sum, item) => sum + Number(item.state.attributes.remaining_weight || 0), 0);
      const bv = bItems.reduce((sum, item) => sum + Number(item.state.attributes.remaining_weight || 0), 0);
      return (av - bv) * direction;
    }

    case "max_remaining_weight": {
      const av = Math.max(...aItems.map(item => Number(item.state.attributes.remaining_weight || 0)));
      const bv = Math.max(...bItems.map(item => Number(item.state.attributes.remaining_weight || 0)));
      return (av - bv) * direction;
    }

    case "spool_count":
      return (aItems.length - bItems.length) * direction;

    case "name":
    default:
      return String(a).localeCompare(String(b), undefined, { numeric: true }) * direction;
  }
}

export function sortGroups(config, groups, items) {
  if (config.group_order?.length) {
    const order = config.group_order.map(value => String(value));

    return groups.sort((a, b) => {
      const ai = order.indexOf(String(a));
      const bi = order.indexOf(String(b));

      const aKnown = ai !== -1;
      const bKnown = bi !== -1;

      if (aKnown && bKnown) return ai - bi;
      if (aKnown) return -1;
      if (bKnown) return 1;

      return String(a).localeCompare(String(b), undefined, { numeric: true });
    });
  }

  return groups.sort((a, b) => compareGroups(config, a, b, items));
}
