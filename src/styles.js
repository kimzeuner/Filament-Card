export const cardStyle = `
ha-card {
  padding: 16px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  margin: 18px 0 10px;
}

.heading:first-child {
  margin-top: 0;
}

.heading ha-icon {
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
}

.heading.clickable {
  cursor: pointer;
  user-select: none;
}

.heading.clickable:hover {
  opacity: 0.85;
}

.spools {
  display: flex;
  gap: 0;
  overflow-x: auto;
  align-items: flex-end;
  padding-bottom: 4px;
}

.spools.horizontal {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
}

.spool {
  width: 70px;
  min-width: 70px;
  text-align: center;
  cursor: pointer;
  padding: 8px 4px;
  box-sizing: border-box;
}

.spool.vertical {
  width: 70px;
  min-width: 70px;
}

.spool.vertical.name-top {
  display: flex;
  flex-direction: column;
}

.spool.vertical.name-top .name {
  order: -1;
  margin-top: 0;
  margin-bottom: 6px;
}

.spool.horizontal {
  width: 100%;
  min-width: 160px;
  display: grid;
  grid-template-columns: 1fr;
}

.spool.horizontal.name-left,
.spool.horizontal.name-right {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
}

.spool.horizontal.name-right {
  grid-template-columns: 1fr auto;
}

.spool.horizontal.name-left .name,
.spool.horizontal.name-right .name {
  margin-top: 0;
  white-space: nowrap;
}

.bar {
  height: 200px;
  border-radius: 10px;
  background: var(--divider-color);
  position: relative;
  overflow: hidden;
}

.spool.horizontal .bar {
  height: 28px;
}

.fill {
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--primary-color);
}

.spool.vertical .fill {
  width: 100%;
  height: 0;
  border-radius: 10px 10px 0 0;
}

.spool.horizontal .fill {
  top: 0;
  bottom: 0;
  height: 100%;
  width: 0;
  border-radius: 10px 0 0 10px;
}

.value {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 20px;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,.25);
}

.spool.vertical.value-top .value {
  top: 12px;
  bottom: auto;
}

.spool.vertical.value-center .value {
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}

.spool.vertical.value-bottom .value {
  bottom: 20px;
}

.spool.horizontal .value {
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}

.spool.horizontal.value-left .value {
  left: 10px;
  right: auto;
  text-align: left;
}

.spool.horizontal.value-center .value {
  left: 0;
  right: 0;
  text-align: center;
}

.spool.horizontal.value-right .value {
  left: auto;
  right: 10px;
  text-align: right;
}

.name {
  font-size: 12px;
  font-weight: bold;
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spool.horizontal .name {
  text-align: left;
  margin-top: 4px;
}

.empty {
  color: var(--secondary-text-color);
  padding: 8px 0;
}
`;
