import { JSX, type RefObject } from "preact";
import { PureComponent } from "preact/compat";
import { FontAwesomeIcon } from "@pkg/renderer/components/fontAwesomeIcon";
import Tooltip, {
  Direction as TooltipDirection,
} from "@pkg/renderer/components/tooltip";
import { isUndefined } from "lodash-es";

interface NavbarButtonProps {
  tooltipContent?: string;
  tooltipDirection?: TooltipDirection;
  icon?: any;
  onClick?: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void;
  childRef?: RefObject<any>;
  disable?: boolean;
  children?: any;
}

export class NavbarButton extends PureComponent<NavbarButtonProps> {
  #handleButtonClicked = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (this.props.disable) {
      return;
    }
    this.props.onClick?.(e);
  };

  #handleContextMenu = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (this.props.disable) {
      return;
    }
    this.props.onContextMenu?.(e);
  };

  #renderContent() {
    let cls = "cuby-navbar-button cuby-hover-bg";
    if (this.props.disable) {
      cls += " disabled";
    }
    return (
      <div
        onClick={this.#handleButtonClicked}
        onContextMenu={this.#handleContextMenu}
        className={cls}
      >
        <FontAwesomeIcon
          style={{ width: "14px", height: "14px" }}
          icon={this.props.icon}
        />
      </div>
    );
  }

  render(props: NavbarButtonProps) {
    const { tooltipContent } = props;
    if (isUndefined(tooltipContent)) {
      return this.#renderContent();
    }
    return (
      <Tooltip
        content={tooltipContent}
        direction={props.tooltipDirection}
        childRef={props.childRef}
      >
        {this.#renderContent()}
      </Tooltip>
    );
  }
}
