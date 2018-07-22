import * as React from "react";

import * as styles from "./styles.styl";

interface Props {
  error: {} | string | false;
  label: string;
  name: string;
  onBlur: (e: any) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onFocus?: (e: React.FocusEvent<any>) => void;
  size?: number;
  type: "email" | "text" | "textarea";
  value: string;
}

class ReactComponent extends React.PureComponent<Props> {
  public static displayName = "Input";
  public static defaultProps = {
    type: "text",
    value: ""
  };

  public render() {
    const {
      error,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      size,
      type,
      value
    } = this.props;
    const hasError = error && error !== "";
    const hasValue = value && value !== "";
    return (
      <div className={styles.inputContainer}>
        {type === "textarea" ? (
          <textarea
            className={[styles.textArea, hasValue ? styles.hasValue : ""].join(
              " "
            )}
            id={name}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            rows={size}
            value={value}
          />
        ) : (
          <input
            className={[styles.input, hasValue ? styles.hasValue : ""].join(
              " "
            )}
            id={name}
            maxLength={size}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            value={value}
          />
        )}
        <div className={styles.border} />
        <label
          htmlFor={name}
          className={[styles.label, hasError ? styles.error : ""].join(" ")}
        >
          {hasError ? error : label}
        </label>
      </div>
    );
  }
}

export default ReactComponent;
