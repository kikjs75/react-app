import "./Button.css";

/**
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'danger' | 'ghost'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 * @param {import('react').ReactNode} [props.children]
 * @param {import('react').ButtonHTMLAttributes<HTMLButtonElement>} rest
 */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
