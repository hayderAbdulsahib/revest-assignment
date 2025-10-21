import { IoClose } from "react-icons/io5";
import "./style.css";

const Tag = ({
  children,
  onRemove,
  removable = true,
  variant = "default",
  size = "medium",
  className = "",
  ...props
}) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div
      className={`tag tag-${variant} tag-${size} ${className}`.trim()}
      {...props}
    >
      <span className="tag-content">{children}</span>
      {removable && onRemove && (
        <button
          type="button"
          className="tag-remove"
          onClick={handleRemove}
          title="Remove"
        >
          <IoClose />
        </button>
      )}
    </div>
  );
};

export default Tag;
