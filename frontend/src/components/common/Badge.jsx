export function Badge({ children, variant = 'default', className = '' }) {
  const baseStyle = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
    success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
    warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    danger: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
    outline: "text-gray-950"
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
