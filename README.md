# Filament Card

A modern and highly configurable Home Assistant Lovelace card for visualizing **filament**, **consumables**, and other resource-based entities.

Originally built for **Spoolman**, the card now supports multiple presets, allowing it to visualize data from Spoolman, custom entities, or user-defined data sources while providing a consistent user experience.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Card-blue?style=for-the-badge&logo=home-assistant)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange?style=for-the-badge)](https://hacs.xyz/)
[![License](https://img.shields.io/github/license/kimzeuner/Filament-Card?style=for-the-badge)](https://github.com/kimzeuner/Filament-Card/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.me/KZeuner)

![Preview](images/preview.png)

---

# Features

## Spoolman

- 📦 Automatic discovery of all Spoolman filament entities
- 🎨 Group by Material, Color, Vendor or None
- 🌈 Use filament colors automatically
- 📊 Dynamic maximum weight using `filament_weight`
- 🗂 Hide archived spools
- 🔃 Flexible sorting and grouping

## Custom Presets

- 📑 Custom entities with attributes
- 🔗 Custom items composed from multiple entities
- 🏷 Planned Home Assistant Label support
- 🧩 Same appearance and configuration options as the Spoolman preset

## Appearance

- 📊 Vertical or horizontal bars
- 👀 Show or hide names
- 📑 Show or hide group titles
- 📍 Configurable value position
- 🏷 Configurable name position
- 🎨 Automatic text color calculation
- 🌙 Fully compatible with Home Assistant themes

## Editor

- Visual Home Assistant editor
- Entity picker support
- Dynamic configuration based on selected preset
- No YAML required for most configurations

---

# Requirements

- Home Assistant
- HACS (recommended)

**Spoolman preset additionally requires:**

- Spoolman Integration

---

# Installation

## HACS

1. Open **HACS**
2. Add this repository as a **Custom Repository**
3. Install **Filament Card**
4. Restart Home Assistant
5. Refresh your browser

---

# Presets

The card currently supports three presets.

## 1. Spoolman

The default preset.

Automatically discovers all Spoolman filament entities.

```yaml
type: custom:spoolman-filament-card

preset: spoolman
```

No additional configuration is required.

---

## 2. Custom Attributes

Displays entities that already contain all required display information in their attributes.

Example entity:

```yaml
state: 420

attributes:
  friendly_name: PLA Black
  group: PLA
  vendor: Prusament
  color: "#111111"
  max_value: 1000
  unit: g
```

Example configuration:

```yaml
type: custom:spoolman-filament-card

preset: custom_attributes

custom_attribute_entities:
  - sensor.pla_black
  - sensor.petg_white
```

### Supported attributes

| Attribute | Description |
|------------|-------------|
| `friendly_name` | Display name |
| `group` | Group name |
| `vendor` | Vendor |
| `color` | Bar color |
| `max_value` | Maximum value |
| `unit` | Display unit |
| `value` *(optional)* | Current value |
| `remaining_weight` *(optional)* | Alternative current value |

---

## 3. Custom Multiple Entities

Allows combining several Home Assistant entities into one displayed item.

Each item can use either fixed values or entity references.

Example:

```yaml
type: custom:spoolman-filament-card

preset: custom_entities

custom_items:

  - name: PLA Black

    value_entity: sensor.pla_black_remaining
    max_entity: sensor.pla_black_capacity

    color_entity: sensor.pla_black_color
    group_entity: sensor.pla_black_material
    vendor_entity: sensor.pla_black_vendor

    unit: g

  - name: PETG White

    value_entity: sensor.petg_remaining
    max: 750

    color: "#ffffff"
    group: PETG
    vendor: Generic
```

### Supported fields

| Field | Description |
|---------|-------------|
| `value_entity` | Current value entity |
| `max_entity` | Maximum value entity |
| `max` | Fixed maximum |
| `color_entity` | Color entity |
| `color` | Fixed color |
| `group_entity` | Group entity |
| `group` | Fixed group |
| `vendor_entity` | Vendor entity |
| `vendor` | Fixed vendor |
| `name_entity` | Name entity |
| `name` | Fixed name |
| `unit` | Display unit |

---

## Planned: Home Assistant Labels

A future preset will automatically discover entities based on Home Assistant Labels.

```yaml
preset: custom_label
```

Instead of manually selecting entities, simply assign the same label to all relevant entities.

---

# Common Configuration

The following options are available for all presets unless stated otherwise.

| Option | Default | Description |
|---------|---------|-------------|
| `title` | Filament | Card title |
| `bar_direction` | vertical | Vertical or horizontal bars |
| `name_position` | bottom | Name position |
| `value_position` | center | Value position |
| `show_name` | true | Show item name |
| `show_group_title` | true | Show group heading |
| `group_icon` | mdi:printer-3d-nozzle | Group icon |
| `group_by` | material | Material / Group, Color, Vendor, None |
| `group_order` | [] | Custom group order |
| `group_sort_by` | name | Group sorting |
| `group_sort_direction` | asc | Group sorting direction |
| `sort_by` | remaining_weight | Item sorting |
| `sort_direction` | asc | Item sorting direction |
| `use_filament_color` | true | Use entity color |
| `max_weight` | 1000 | Fallback maximum weight (Spoolman) |

---

# Grouping

Supported grouping modes:

- Material / Group
- Color
- Vendor
- None

Custom group ordering is supported in every preset.

Unknown groups are automatically appended.

---

# Sorting

## Groups

- Name
- Total remaining value
- Maximum remaining value
- Item count

## Items

- Remaining value
- Name
- Material / Group
- Vendor
- Color

Ascending and descending sorting are supported.

---

# Appearance

- Vertical bars
- Horizontal bars
- Automatic value scaling
- Automatic text color
- Group icon
- Optional entity colors
- Configurable name position
- Configurable value position

---

# Editor

The visual editor adapts automatically to the selected preset.

## Spoolman

Displays all Spoolman-specific options.

## Custom Attributes

Supports selecting entities using the Home Assistant Entity Picker.

## Custom Multiple Entities

Supports creating multiple items.

Each item can be configured individually using Home Assistant Entity Pickers for:

- Value Entity
- Maximum Entity
- Color Entity
- Group Entity
- Vendor Entity
- Name Entity

---

# Examples

## Minimal

```yaml
type: custom:spoolman-filament-card
```

---

## Spoolman

```yaml
type: custom:spoolman-filament-card

preset: spoolman

group_by: material
bar_direction: vertical
show_group_title: true
use_filament_color: true
```

---

## Custom Attributes

```yaml
type: custom:spoolman-filament-card

preset: custom_attributes

custom_attribute_entities:
  - sensor.pla_black
  - sensor.pla_white

group_by: material
```

---

## Custom Multiple Entities

```yaml
type: custom:spoolman-filament-card

preset: custom_entities

custom_items:

  - name: PLA Black

    value_entity: sensor.pla_black_remaining
    max_entity: sensor.pla_black_capacity

    color: "#111111"
    group: PLA
```

---

# Roadmap

## Planned

- [ ] Home Assistant Label preset
- [ ] Label picker
- [ ] Attribute picker
- [ ] Per-item icons
- [ ] Click actions
- [ ] Localization
- [ ] Percentage display
- [ ] Additional display modes
- [ ] Statistics card

---

# Contributing

Contributions, feature requests and bug reports are always welcome.

Please use the GitHub issue tracker.

---

# License

MIT
