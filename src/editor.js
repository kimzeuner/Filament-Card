import { LitElement, html, css } from "lit";
import { DEFAULT_CONFIG, EDITOR_TYPE } from "./const.js";

class SpoolmanFilamentCardEditor extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static styles = css`
    .form {
      display: grid;
      gap: 16px;
    }

    .section {
      font-weight: 600;
      font-size: 14px;
      color: var(--secondary-text-color);
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .section:first-child {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }

    ha-textfield,
    ha-select,
    textarea {
      width: 100%;
    }

    textarea {
      min-height: 90px;
      box-sizing: border-box;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
      resize: vertical;
    }

    .hint {
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-top: -8px;
    }

    ha-formfield {
      display: block;
    }
  `;

  setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  render() {
    if (!this.config) return html``;

    return html`
      <div class="form">
        <div class="section">General</div>

        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @input=${event => this._valueChanged("title", event.target.value)}
        ></ha-textfield>

        ${this._switch("hide_archived", "Hide archived spools")}

        <div class="section">Grouping</div>

        ${this._select("group_by", "Group by", [
          ["material", "Material"],
          ["color", "Color"],
          ["vendor", "Vendor"],
          ["none", "Don't group"],
        ])}

        ${this.config.group_by !== "none" ? html`
          <label>
            <div class="hint">Group order, one entry per line. Empty = automatic sorting.</div>
            <textarea
              .value=${this._groupOrderValue()}
              @change=${event => this._groupOrderChanged(event)}
            ></textarea>
          </label>

          ${this._select("group_sort_by", "Group sort by", [
            ["name", "Name"],
            ["total_remaining_weight", "Total remaining weight"],
            ["max_remaining_weight", "Max remaining weight"],
            ["spool_count", "Spool count"],
          ])}

          ${this._select("group_sort_direction", "Group sort direction", [
            ["asc", "Ascending"],
            ["desc", "Descending"],
          ])}

          <ha-textfield
            label="Group icon"
            .value=${this.config.group_icon ?? "mdi:printer-3d-nozzle"}
            @input=${event => this._valueChanged("group_icon", event.target.value)}
          ></ha-textfield>

          ${this._switch("show_group_title", "Show group title")}
        ` : ""}

        <div class="section">Sorting</div>

        ${this._select("sort_by", "Sort by", [
          ["remaining_weight", "Remaining weight"],
          ["filament_name", "Filament name"],
          ["filament_material", "Material"],
          ["filament_vendor_name", "Vendor"],
          ["filament_color_hex", "Color"],
        ])}

        ${this._select("sort_direction", "Sort direction", [
          ["asc", "Ascending"],
          ["desc", "Descending"],
        ])}

        <div class="section">Appearance</div>

        ${this._select("bar_direction", "Bar direction", [
          ["vertical", "Vertical"],
          ["horizontal", "Horizontal"],
        ])}

        ${this._select("name_position", "Name position", this._namePositionOptions())}

        ${this._select("value_position", "Value position", this._valuePositionOptions())}

        <ha-textfield
          label="Max weight fallback"
          type="number"
          .value=${String(this.config.max_weight ?? 1000)}
          @input=${event => this._valueChanged("max_weight", Number(event.target.value))}
        ></ha-textfield>

        ${this._switch("show_name", "Show name")}
        ${this._switch("use_filament_color", "Use filament color")}
      </div>
    `;
  }

  _select(key, label, options) {
    return html`
      <ha-select
        label=${label}
        .value=${this.config[key] ?? DEFAULT_CONFIG[key]}
        @selected=${event => this._valueChanged(key, event.target.value)}
        @closed=${event => event.stopPropagation()}
      >
        ${options.map(([value, text]) => html`
          <mwc-list-item .value=${value}>${text}</mwc-list-item>
        `)}
      </ha-select>
    `;
  }

  _switch(key, label) {
    return html`
      <ha-formfield label=${label}>
        <ha-switch
          .checked=${this.config[key] !== false}
          @change=${event => this._valueChanged(key, event.target.checked)}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  _namePositionOptions() {
    return this.config.bar_direction === "horizontal"
      ? [
          ["top", "Top"],
          ["bottom", "Bottom"],
          ["left", "Left"],
          ["right", "Right"],
        ]
      : [
          ["top", "Top"],
          ["bottom", "Bottom"],
        ];
  }

  _valuePositionOptions() {
    return this.config.bar_direction === "horizontal"
      ? [
          ["left", "Left"],
          ["center", "Center"],
          ["right", "Right"],
        ]
      : [
          ["top", "Top"],
          ["center", "Center"],
          ["bottom", "Bottom"],
        ];
  }

  _groupOrderValue() {
    return Array.isArray(this.config.group_order)
      ? this.config.group_order.join("\n")
      : "";
  }

  _groupOrderChanged(event) {
    const value = event.target.value
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    this._valueChanged("group_order", value);
  }

  _valueChanged(key, value) {
    const config = {
      ...this.config,
      [key]: value,
    };

    if (key === "bar_direction") {
      if (value === "vertical") {
        if (!["top", "bottom"].includes(config.name_position)) {
          config.name_position = "bottom";
        }
        if (!["top", "center", "bottom"].includes(config.value_position)) {
          config.value_position = "center";
        }
      }

      if (value === "horizontal") {
        if (!["top", "bottom", "left", "right"].includes(config.name_position)) {
          config.name_position = "bottom";
        }
        if (!["left", "center", "right"].includes(config.value_position)) {
          config.value_position = "center";
        }
      }
    }

    this.config = config;

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define(EDITOR_TYPE, SpoolmanFilamentCardEditor);
