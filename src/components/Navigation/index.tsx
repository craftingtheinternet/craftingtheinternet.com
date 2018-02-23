import * as React from "react";
import { NavLink } from "redux-first-router-link";

import links from "manifests/links.json";

import styles from "./styles.styl";

const BAR_SIZE = 200;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export interface Props {
  color: string;
  orientation: "horizontal" | "vertical";
}

export interface State {
  hoveredListItemIsVisible: boolean;
  hoveredListItemOffset: number;
  hoveredListItemSize: number;
}

export interface ListItems {
  [key: string]: any;
}

class ReactComponent extends React.PureComponent<Props, State> {
  public static displayName = "Navigation";
  public static defaultProps = {
    color: "black",
    orientation: HORIZONTAL
  };
  private listItems: ListItems = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      hoveredListItemIsVisible: false,
      hoveredListItemOffset: null,
      hoveredListItemSize: null
    };
  }

  public onMouseEnter = (key: string) => () => {
    const { orientation } = this.props;
    const offsetDimension = orientation === HORIZONTAL ? "Left" : "Top";
    const sizeDimension = orientation === HORIZONTAL ? "Width" : "Height";
    if (this.listItems[key]) {
      this.setState(() => ({
        hoveredListItemIsVisible: true,
        hoveredListItemOffset: this.listItems[key][`offset${offsetDimension}`],
        hoveredListItemSize: this.listItems[key][`client${sizeDimension}`]
      }));
    }
  };

  public onMouseLeave = () => {
    this.setState(() => ({
      hoveredListItemIsVisible: false
    }));
  };

  public assignListItem = (key: string) => (el: HTMLElement) => {
    this.listItems[key] = el;
  };

  public render() {
    const { color, orientation } = this.props;
    const {
      hoveredListItemOffset,
      hoveredListItemSize,
      hoveredListItemIsVisible
    } = this.state;
    const dimension = orientation === HORIZONTAL ? "X" : "Y";
    const literalDimension = orientation === HORIZONTAL ? "width" : "height";
    return (
      <nav
        className={[styles.nav, styles[orientation]].join(" ")}
        onMouseLeave={this.onMouseLeave}
      >
        <ul className={styles.list}>
          {Object.keys(links).map(key => (
            <li
              key={key}
              className={styles.listItem}
              ref={this.assignListItem(key)}
              onMouseEnter={this.onMouseEnter(key)}
            >
              <NavLink
                to={links[key].to}
                exact={links[key].exact}
                className={styles.link}
                activeClassName={styles.active}
                style={{ color }}
              >
                {key}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className={styles.bar}
          style={{
            [literalDimension]: BAR_SIZE,
            backgroundColor: color,
            opacity: hoveredListItemIsVisible ? 1 : 0,
            transform: `translate${dimension}(${hoveredListItemOffset ||
              0}px) scale${dimension}(${hoveredListItemSize / BAR_SIZE})`
          }}
        />
      </nav>
    );
  }
}

export default ReactComponent;
